import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDatabase } from '@utils/database';
import User from '@models/user';

type Profile = {
  email: string;
  name: string;
  picture: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }: { profile?: Profile }) {
      try {
        await connectToDatabase();
        const userExists = await User.findOne({
          email: profile?.email,
        });
        
        if (userExists) {
          return true;
        }

        await User.create({
          email: profile?.email,
          username: profile?.name?.replace(' ', '').toLowerCase(),
          image: profile?.picture,
        });
        return true;

      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };