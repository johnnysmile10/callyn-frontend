
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SidebarLogoutFooterProps {
  onLogout: () => void;
}

const SidebarLogoutFooter = ({ onLogout }: SidebarLogoutFooterProps) => {
  return (
    <SidebarFooter className="border-t border-gray-200 p-4">
      <Button 
        variant="ghost" 
        onClick={onLogout}
        className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </SidebarFooter>
  );
};

export default SidebarLogoutFooter;
