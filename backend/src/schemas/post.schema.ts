import { object, string, TypeOf } from 'zod';

export const addPostSchema = object({
  body: object({
    image: string(),
    text: string()
  })
    .partial()
    .refine(
      (data) => (data.image && data.image.length > 0) || (data.text && data.text.length > 0),
      'Either image or text should be filled in.'
    )
});

export const postByIdSchema = object({
  params: object({
    id: string()
  })
});

export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type PostByIdInput = TypeOf<typeof postByIdSchema>['params'];
