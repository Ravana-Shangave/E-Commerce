import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { comparePassword } from '@/lib/utils';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials: any) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
