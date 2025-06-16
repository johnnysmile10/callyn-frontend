
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarHeader } from "@/components/ui/sidebar";

interface SidebarUserHeaderProps {
  user: {
    name?: string;
    email?: string;
    photoURL?: string;
  } | null;
}

const SidebarUserHeader = ({ user }: SidebarUserHeaderProps) => {
  return (
    <SidebarHeader>
      <div className="flex items-center gap-2 px-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.photoURL || ""} alt={user?.name || "User"} />
          <AvatarFallback>
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium truncate">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {user?.email}
          </span>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default SidebarUserHeader;
