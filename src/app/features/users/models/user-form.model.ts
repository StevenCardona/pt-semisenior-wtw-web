export type UserFormValue = {
  name: string;
  mail: string;
};

export type UserFormField = keyof UserFormValue;

export const USER_FORM_REQUIRED_MESSAGES: Record<UserFormField, string> = {
  name: 'Cuéntanos el nombre.',
  mail: 'Necesitamos un correo para contactarlo.',
};

export const USER_FORM_EMAIL_MESSAGE =
  'Ese correo no se ve bien; revísalo un momento.';

export const USER_FORM_MAX_LENGTH_MESSAGES: Record<UserFormField, string> = {
  name: 'El nombre quedó un poco largo; acórtalo un poco.',
  mail: 'El correo es demasiado largo; prueba con uno más corto.',
};
