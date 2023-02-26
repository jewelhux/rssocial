import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    lastname: string({ required_error: 'Last name is required' }),
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Min password length is 8 characters')
      .max(16, 'Max password length is 16 characters')
  })
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Invalid password')
      .max(16, 'Invalid password')
  })
});

export type RegisterInput = TypeOf<typeof registerUserSchema>['body'];
export type LoginInput = TypeOf<typeof loginUserSchema>['body'];
