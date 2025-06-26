
import { SidebarHeader } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface SidebarUserHeaderProps {
  user: any;
}

const SidebarUserHeader = ({ user }: SidebarUserHeaderProps) => {
  const initials = user?.email ? 
    user.email.split('@')[0].substring(0, 2).toUpperCase() : 
    'U';

  return (
    <SidebarHeader className="border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar} alt={user?.email || 'User'} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.email || 'User'}
          </p>
          <Badge variant="secondary" className="text-xs">
            Free Plan
          </Badge>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default SidebarUserHeader;
