
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { MenuItem } from "./menuItems";

interface SidebarMenuSectionProps {
  title?: string;
  items: MenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarMenuSection = ({ title, items, activeTab, onTabChange }: SidebarMenuSectionProps) => {
  if (items.length === 0) return null;

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                onClick={() => onTabChange(item.id)}
                isActive={activeTab === item.id}
                tooltip={item.name}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuSection;
