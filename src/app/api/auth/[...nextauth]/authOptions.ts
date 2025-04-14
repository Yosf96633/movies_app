import { NextAuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import { userModel } from "@/model/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "redentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        try {
          if (!credentials || !credentials?.email || !credentials?.password) {
            throw new Error(`Please enter credentials`);
          }
          const { email, password: Cpassword } = credentials;
          await connectDB();
          const user = await userModel.findOne({ email });
          if (!user) {
            throw new Error(`Invalid credentials`);
          }
          const { name, _id, password, image } = user;
          const isMatched = await bcrypt.compare(Cpassword, password);
          if (!isMatched) {
            throw new Error(`Invalid credentials`);
          }
          return {
            name,
            _id,
            image,
            email,
          };
        } catch (error) {
          console.log(`Error at authorize function ${error}`);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
        await connectDB();
      const dbUser = await userModel.findOne({ email: user.email });
      if (account?.provider === "google") {
        if (!dbUser) {
         const x = await userModel.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
          });
          user._id = x._id;
        }
      }
      return true;
    },
    async jwt({token , user}) {
        if(user){
            token._id = user._id,
            token.name = user.name , 
            token.email = user.email,
            token.image = user.image
        }
        return token;
    },
    async session({session , token}) {
        if(token){
            session.user._id = token._id,
            session.user.name = token.name,
            session.user.image = token.image,
            session.user.email = token.email
        }
        return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
