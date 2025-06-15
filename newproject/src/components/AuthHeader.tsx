"use client";

import { useSession } from "next-auth/react";
import { signIn } from "@/app/actions/signIn";
import { signout } from "@/app/actions/signout";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";

const AuthHeader = () => {
  const { data: session } = useSession();
  if(!session?.user) return <h1><span className="text-white">Loading...</span></h1>;

  if (session?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="bg-gray-500 text-white flex items-center justify-center w-full h-full">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{session.user.name}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <form action={signout}>
            <Button variant="outline" className="text-black w-full">
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex gap-2">
      <form action={signIn}>
        <Button variant="outline" className="text-black">
          Sign in
        </Button>
      </form>
      <form action={signIn}>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default AuthHeader;
