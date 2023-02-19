import { object, string, TypeOf, preprocess, number, enum as zodEnum } from 'zod';

export const updateProfileSchema = object({
  body: object({
    age: preprocess(
      (n) => parseInt(string().parse(n), 10),
      number().min(10, 'Minimum age is 10').max(120, 'Maximum age is 120')
    ),
    interests: string(),
    work: string(),
    relationship: zodEnum(['in relationship', 'single', 'not interested', 'complicated']),
    avatar: string()
  }).partial()
});

export type UpdateProfileInput = TypeOf<typeof updateProfileSchema>['body'];
