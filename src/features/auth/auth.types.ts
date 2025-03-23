export type RegisterUserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};
