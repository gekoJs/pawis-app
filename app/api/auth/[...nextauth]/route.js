import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB, User } from "../../../../db/index";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        where: { email: session.user.email },
      });
      session.user.id = sessionUser.id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExist = await User.findOne({
          where: {
            email: profile.email,
          },
        });

        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
