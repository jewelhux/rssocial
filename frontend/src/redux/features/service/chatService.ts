import { apiSlice } from '../apiSlice';
import { Conversation, GenericResponse, Message } from './types';
import { socket } from './socket';

export const chatService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<{ conversations: Conversation[] }, number | void>({
      query(profile) {
        return {
          url: '/chat/conversations',
          params: { newchat: profile }
        };
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const handleAddConversation = (conversation: Conversation) => {
          updateCachedData((draft) => {
            draft.conversations.push(conversation);
          });
        };

        const handleNewMessage = (message: Message) => {
          updateCachedData((draft) => {
            const conv = draft.conversations.find((el) => el.id === message.conversationId);
            if (conv) {
              conv.lastMessage = message.text ? message.text : message.image ? 'Image' : '';
              conv.lastUpdate = message.date;
            }
          });
        };

        const handleUserStatus = (userStatus: { id: number; online: boolean }) => {
          updateCachedData((draft) => {
            const conv = draft.conversations.find((el) => el.id === userStatus.id);
            if (conv) conv.online = userStatus.online;
          });
        };

        try {
          await cacheDataLoaded;
          socket.on('addConversation', handleAddConversation);
          socket.on('userStatus', handleUserStatus);
          socket.on('newMessage', handleNewMessage);
          // eslint-disable-next-line prettier/prettier
        } catch {}

        await cacheEntryRemoved;
        socket.off('addConversation', handleAddConversation);
        socket.off('userStatus', handleUserStatus);
        socket.off('newMessage', handleNewMessage);
      }
    }),
    getMessages: builder.query<{ messages: Message[] }, number>({
      query(profile) {
        return {
          url: '/chat/messages',
          params: { profile }
        };
      },
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
    })
  })
});

export const { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } =
  chatService;
