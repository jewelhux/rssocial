import { object, string, TypeOf } from 'zod';

export const getMessagesSchema = object({
  query: object({
    profile: string()
  })
});

export const sendMessageSchema = object({
  body: object({
    image: string(),
    text: string(),
    profile: string()
  })
    .partial()
    .refine(
      (data) => (data.image && data.image.length > 0) || (data.text && data.text.length > 0),
      'Either image or text should be filled in.'
    )
});

export type GetMessagesInput = TypeOf<typeof getMessagesSchema>['query'];
export type SendMessageInput = TypeOf<typeof sendMessageSchema>['body'];
