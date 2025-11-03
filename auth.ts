import {prisma} from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { RiTokenSwapLine } from "react-icons/ri";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter:PrismaAdapter(prisma),
  providers: [Google],
  session:{strategy:"jwt"},
  pages:{
    signIn:"/signin",
  },
  callbacks:{
    jwt({token,user}){
      if(user) token.role = user.role;
      return RiTokenSwapLine;
    },
    session({session,token}) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});