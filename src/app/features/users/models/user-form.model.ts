export type UserFormValue = {
  name: string;
  mail: string;
};

export type UserFormField = keyof UserFormValue;

export const USER_FORM_REQUIRED_MESSAGES: Record<UserFormField, string> = {
  name: 'El nombre es obligatorio.',
  mail: 'El correo es obligatorio.',
};

export const USER_FORM_MAX_LENGTH_MESSAGES: Record<UserFormField, string> = {
  name: 'El nombre no puede superar los 200 caracteres.',
  mail: 'El correo no puede superar los 256 caracteres.',
};
