
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Lock } from "lucide-react";
import { MenuItem } from "./menuItems";

interface SidebarMenuSectionProps {
  title?: string;
  items: MenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userAgent?: any;
}

const SidebarMenuSection = ({ title, items, activeTab, onTabChange, userAgent }: SidebarMenuSectionProps) => {
  if (items.length === 0) return null;

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isDisabled = item.requiresAgent && !userAgent;
            
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  onClick={() => !isDisabled && onTabChange(item.id)}
                  isActive={activeTab === item.id}
                  tooltip={isDisabled ? "Complete agent setup first" : item.name}
                  className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {isDisabled ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <item.icon className="h-4 w-4" />
                  )}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuSection;
