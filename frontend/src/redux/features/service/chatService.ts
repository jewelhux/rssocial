import { apiSlice } from '../apiSlice';
import { Conversation, GenericResponse, Message } from './types';
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
      providesTags: ['Chat'],
      transformResponse(response: { conversations: Conversation[] }) {
        return {
          conversations: response.conversations.sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        };
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
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
                const audio = new Audio(notification);
                audio.volume = 0.5;
                // eslint-disable-next-line prettier/prettier
                audio.play().catch(() => {});
              }
              draft.conversations = [conv, ...draft.conversations.filter((el) => el !== conv)];
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
      providesTags: ['Chat'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const handleNewMessage = (message: Message) => {
          if (message.conversationId === arg) {
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
    sendMessage: builder.mutation<GenericResponse, FormData>({
      query(body) {
        return {
          url: '/chat/messages',
          method: 'POST',
          body
        };
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
