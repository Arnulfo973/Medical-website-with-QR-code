import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from './dbConnect';
import User from '@/models/User';

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async signIn({ user, account }: any) {
      await dbConnect();

      if (account.provider === 'google') {
        try {
          const googleAccessToken = account.access_token;
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const lastUser = await User.find({}).sort({ tag: -1 }).limit(1);
            let newCode = 1000;

            if (lastUser.length > 0 && lastUser[0].tag >= 1000) {
              newCode = lastUser[0].tag + 1;
            }
            existingUser = await User.create({
              fullname: user.name,
              email: user.email,
              token: googleAccessToken,
              tag: newCode
            });
          } else {
            existingUser.token = googleAccessToken;
            await existingUser.save();
          }
          const userInfo = {
            token: googleAccessToken,
            name: existingUser.fullname,
            tag: existingUser.tag
          };
          account.userInfo = userInfo;
          return true;
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }: any) {
      if (account?.userInfo) {
        token.userInfo = account.userInfo;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.userInfo = token.userInfo;
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  }
} satisfies NextAuthConfig;
export default authConfig;
