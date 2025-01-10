import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SiNextdotjs } from "react-icons/si";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

type AppSidebarProps = {
  title: string;
  url: string;
  icon: React.ElementType;
};

export function AppSidebar({ items }: { items: AppSidebarProps[] }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* logo */}
            <div className="py-[2rem] border-b flex items-center justify-center gap-[1rem]">
              <SiNextdotjs size={30} />
              <h2 className="text-xl">NextKit</h2>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="absolute bottom-2 left-2">
          <ModeToggle />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
