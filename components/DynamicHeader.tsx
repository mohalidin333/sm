import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Link from "next/link";
import DynamicDropDownMenu from "./DynamicDropDownMenu";

export default function DynamicHeader({ src }: { src: string }) {
  return (
    <header className="bg-sidebar flex items-center justify-between p-[1rem] border-b gap-[1rem]">
      <div className="border-r border-gray-300 pr-[1rem]">
        <SidebarTrigger />
      </div>

      <DynamicDropDownMenu
        trigger={
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src={src} />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
        }
        label="My Account"
        items={[
          <Link href={"/profile"} className="gap-2 flex items-center">
            <User size={15} /> Profile
          </Link>,
          <Link href={"/login"} className="gap-2 flex items-center">
            <LogOut size={15} /> Log out
          </Link>,
        ]}
      />
    </header>
  );
}
