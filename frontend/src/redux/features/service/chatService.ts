import { apiSlice } from '../apiSlice';
import { Conversation, Message, SendStatus } from './types';
import { socket } from './socket';
import notification from '../../../assets/notification.mp3';

export const chatService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<{ conversations: Conversation[] }, string | void>({
      query(profile) {
        return {
          url: '/chat/conversations',
          params: { newchat: profile }
        };
      },
      providesTags: (result, error, arg) => [
        { type: 'Conversations', id: arg ?? 'default' },
        'Conversations'
      ],
      transformResponse(response: { conversations: Conversation[] }) {
        return {
          conversations: response.conversations.sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const handleAddConversation = (conversation: Conversation) => {
          updateCachedData((draft) => {
            draft.conversations.unshift(conversation);
          });
        };

        const handleNewMessage = (message: Message) => {
          updateCachedData((draft) => {
            const conv = draft.conversations.find((el) => el.id === message.conversationId);
            if (conv) {
              conv.lastMessage = message.text ? message.text : message.image ? 'Image' : '';
              conv.updatedAt = message.createdAt;
              if (!message.own) {
                conv.unreadCount += 1;
                if (arg === undefined) {
                  const audio = new Audio(notification);
                  audio.volume = 0.5;
                  // eslint-disable-next-line prettier/prettier
                  audio.play().catch(() => {});
                }
              }
              draft.conversations = [conv, ...draft.conversations.filter((el) => el !== conv)];
            } else {
              dispatch(
                chatService.util.invalidateTags([{ type: 'Conversations', id: arg ?? 'default' }])
              );
            }
          });
        };

        const handleUserStatus = (userStatus: { id: string; online: boolean }) => {
          updateCachedData((draft) => {
            const conv = draft.conversations.find((el) => el.id === userStatus.id);
            if (conv) conv.online = userStatus.online;
          });
        };

        const handleUpdateRead = (conversationId: string) => {
          updateCachedData((draft) => {
            const conv = draft.conversations.find((el) => el.id === conversationId);
            if (conv) conv.unreadCount = 0;
          });
        };

        try {
          await cacheDataLoaded;
          socket.on('addConversation', handleAddConversation);
          socket.on('userStatus', handleUserStatus);
          socket.on('newMessage', handleNewMessage);
          socket.on('updateRead', handleUpdateRead);
          // eslint-disable-next-line prettier/prettier
        } catch {}

        await cacheEntryRemoved;
        socket.off('addConversation', handleAddConversation);
        socket.off('userStatus', handleUserStatus);
        socket.off('newMessage', handleNewMessage);
        socket.off('updateRead', handleUpdateRead);
      }
    }),
    getMessages: builder.query<{ messages: Message[] }, string>({
      query(profile) {
        return {
          url: '/chat/messages',
          params: { profile }
        };
      },
      providesTags: ['Messages'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const handleNewMessage = (message: Message) => {
          if (message.conversationId === arg && !message.own) {
            updateCachedData((draft) => {
              draft.messages.push(message);
            });
          }
        };

        try {
          await cacheDataLoaded;
          socket.on('newMessage', handleNewMessage);
          // eslint-disable-next-line prettier/prettier
        } catch {}

        await cacheEntryRemoved;
        socket.off('newMessage', handleNewMessage);
      }
    }),
    sendMessage: builder.mutation<{ message: Message }, FormData>({
      query(body) {
        return {
          url: '/chat/messages',
          method: 'POST',
          body
        };
      },
      //optimistic update
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        const profile = formData.get('profile') as string | null;
        const image =
          (formData.get('image') && URL.createObjectURL(formData.get('image') as File)) ?? '';
        const text = (formData.get('text') as string) ?? '';
        if (profile) {
          const patchResult = dispatch(
            chatService.util.updateQueryData('getMessages', profile, (draft) => {
              draft.messages.push({
                image,
                text,
                createdAt: new Date().toISOString(),
                user: '',
                status: SendStatus.pending
              });
            })
          );
          try {
            const actualResult = await queryFulfilled;
            dispatch(
              chatService.util.updateQueryData('getMessages', profile, (draft) => {
                const message = draft.messages[patchResult.patches[0].path[1] as number];
                if (message) {
                  message.image = actualResult.data.message.image;
                  message.status = SendStatus.success;
                }
              })
            );
          } catch {
            dispatch(
              chatService.util.updateQueryData('getMessages', profile, (draft) => {
                const message = draft.messages[patchResult.patches[0].path[1] as number];
                if (message) message.status = SendStatus.error;
              })
            );
          }
        }
      }
    }),
    reportRead: builder.mutation<null, string>({
      queryFn: (profile) => {
        socket.emit('reportRead', profile);
        return { data: null };
      }
    })
  })
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useReportReadMutation
} = chatService;
