
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle } from "lucide-react";
import { MenuItem } from "./menuItems";
import { checkUnlockConditions } from "./unlockConditions";
import { UserAgent, ProgressState } from "@/context/types/authTypes";

interface SidebarMenuSectionProps {
  title?: string;
  items: MenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userAgent: UserAgent | null;
  progressState: ProgressState;
}

const SidebarMenuSection = ({ 
  title, 
  items, 
  activeTab, 
  onTabChange, 
  userAgent, 
  progressState 
}: SidebarMenuSectionProps) => {
  console.log("🎛️ SidebarMenuSection render:", {
    title,
    itemCount: items.length,
    activeTab,
    hasUserAgent: !!userAgent,
    progressState
  });

  const handleMenuClick = (item: MenuItem) => {
    console.log("🖱️ Menu item clicked:", item.name, "ID:", item.id);
    
    // Check if item is unlocked
    const { isUnlocked, missingRequirements } = checkUnlockConditions(
      item.unlockConditions || [], 
      userAgent, 
      progressState
    );

    if (isUnlocked) {
      console.log("✅ Item unlocked, changing tab to:", item.id);
      onTabChange(item.id);
    } else {
      console.log("🔒 Item locked, requirements:", missingRequirements);
      // For locked items, show a helpful message
      if (item.id !== 'your-agent') {
        // Only show toast for non-agent items (agent should always be accessible)
        console.log("ℹ️ Would show unlock requirements:", missingRequirements[0]);
      }
    }
  };

  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Check unlock status
            const { isUnlocked, missingRequirements } = checkUnlockConditions(
              item.unlockConditions || [], 
              userAgent, 
              progressState
            );

            // Always allow access to "your-agent" - it's the entry point
            const canClick = isUnlocked || item.id === 'your-agent';
            
            console.log(`🔍 Menu item "${item.name}":`, {
              id: item.id,
              isActive,
              isUnlocked,
              canClick,
              hasConditions: (item.unlockConditions || []).length > 0,
              missingRequirements
            });

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => handleMenuClick(item)}
                  className={`
                    relative w-full justify-start gap-3 px-3 py-2
                    ${isActive ? 'bg-blue-100 text-blue-900 font-medium' : ''}
                    ${!canClick ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-gray-100'}
                    transition-all duration-200
                  `}
                  disabled={!canClick}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="flex-1 text-left">{item.name}</span>
                  
                  {/* Status indicators */}
                  {!canClick && item.id !== 'your-agent' && (
                    <Lock className="h-3 w-3 text-gray-400" />
                  )}
                  
                  {canClick && item.id !== 'your-agent' && item.unlockConditions && item.unlockConditions.length > 0 && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
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
