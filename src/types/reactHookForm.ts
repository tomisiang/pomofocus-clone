import { type UseFormRegisterReturn } from 'react-hook-form';

export type RegisterComponent<T> = {
  [K in keyof T]: UseFormRegisterReturn;
};
