
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Lock, CheckCircle } from "lucide-react";
import { MenuItem } from "./menuItems";
import { checkUnlockConditions } from "./unlockConditions";
import { UserAgent, ProgressState } from "@/context/types/authTypes";

interface SidebarMenuSectionProps {
  title?: string;
  items: MenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userAgent?: UserAgent | null;
  progressState?: ProgressState;
}

const SidebarMenuSection = ({ 
  title, 
  items, 
  activeTab, 
  onTabChange, 
  userAgent,
  progressState = {
    hasLeads: false,
    hasVoiceIntegration: false,
    hasCampaigns: false,
    agentConfigurationLevel: 'none'
  }
}: SidebarMenuSectionProps) => {
  if (items.length === 0) return null;

  console.log("SidebarMenuSection render:", {
    title,
    userAgent: !!userAgent,
    agentId: userAgent?.id,
    progressState,
    itemCount: items.length
  });

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const unlockResult = checkUnlockConditions(
              item.unlockConditions || [],
              userAgent || null,
              progressState
            );

            const isUnlocked = unlockResult.isUnlocked;
            const tooltipText = isUnlocked 
              ? item.name 
              : `Unlock by: ${unlockResult.missingRequirements.join(', ')}`;
            
            console.log(`Sidebar item ${item.name}:`, {
              hasUnlockConditions: !!(item.unlockConditions && item.unlockConditions.length > 0),
              isUnlocked,
              missingRequirements: unlockResult.missingRequirements
            });
            
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  onClick={() => isUnlocked && onTabChange(item.id)}
                  isActive={activeTab === item.id}
                  tooltip={tooltipText}
                  className={!isUnlocked ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {!isUnlocked ? (
                    <Lock className="h-4 w-4" />
                  ) : isUnlocked && item.unlockConditions && item.unlockConditions.length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
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
