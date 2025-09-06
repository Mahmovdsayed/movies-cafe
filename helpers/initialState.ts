export const SignUpInitialState = {
  name: "",
  email: "",
  password: "",
  userName: "",
};

export const SignInInitialState = {
  email: "",
  password: "",
};

export const ForgotPasswordInitialState = {
  email: "",
};

export const ResetPasswordInitialState = {
  password: "",
  confirmPassword: "",
};

export const imageUploadInitialState = {
  avatar: null as File | null,
};

export const RepostInitialState = {
  content: "",
};

export const PostInitialState = {
  title: "",
  description: "",
  type: "",
};
