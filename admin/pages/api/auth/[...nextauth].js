import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['grupp5adm@gmail.com'];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,  // Ensure you use NEXTAUTH_SECRET to match your env variable setup
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      }
      // Explicitly return null to prevent session creation
      return null;
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      res.status(401).send('Access denied');
      return;  // Ensure response is sent immediately after setting status
    }
  } catch (error) {
    res.status(500).send('Server error');
    throw error; // Optionally rethrow the error or handle it as needed
  }
}
