import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
    userInfo: UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
