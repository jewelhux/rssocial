import { object, string, TypeOf } from 'zod';

export const addPostSchema = object({
  body: object({
    image: string(),
    text: string()
  })
    .strict()
    .refine(
      (data) => data.image.length > 0 || data.text.length > 0,
      'Either image or text should be filled in.'
    )
});

export const deletePostSchema = object({
  params: object({
    id: string()
  })
});

export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type DeletePostInput = TypeOf<typeof deletePostSchema>['params'];
