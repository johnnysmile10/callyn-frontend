
import { LogOut } from "lucide-react";
import { 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

interface SidebarLogoutFooterProps {
  onLogout: () => void;
}

const SidebarLogoutFooter = ({ onLogout }: SidebarLogoutFooterProps) => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SidebarLogoutFooter;
