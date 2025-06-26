
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { MenuItem } from "./menuItems";
import { checkUnlockConditions, shouldHaveAccess, diagnoseUnlockIssues, recoverUserState } from "./unlockConditions";
import { UserAgent, ProgressState } from "@/context/types/authTypes";
import { useAuth } from "@/context";
import { toast } from "@/hooks/use-toast";

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
  const { updateProgressState } = useAuth();
  
  console.log("🎛️ Enhanced SidebarMenuSection render:", {
    title,
    itemCount: items.length,
    activeTab,
    hasUserAgent: !!userAgent,
    progressState,
    shouldHaveGlobalAccess: shouldHaveAccess(userAgent, progressState)
  });

  const handleMenuClick = (item: MenuItem) => {
    console.log("🖱️ Enhanced menu item clicked:", item.name, "ID:", item.id);
    
    // Always allow access to "your-agent" - it's the entry point
    if (item.id === 'your-agent') {
      console.log("✅ Your-agent always accessible");
      onTabChange(item.id);
      return;
    }

    // Check global access first
    const hasGlobalAccess = shouldHaveAccess(userAgent, progressState);
    if (hasGlobalAccess) {
      console.log("✅ Global access granted, allowing navigation");
      onTabChange(item.id);
      return;
    }
    
    // Check specific unlock conditions
    const { isUnlocked, missingRequirements } = checkUnlockConditions(
      item.unlockConditions || [], 
      userAgent, 
      progressState
    );

    if (isUnlocked) {
      console.log("✅ Item unlocked via conditions, changing tab to:", item.id);
      onTabChange(item.id);
    } else {
      console.log("🔒 Item locked, requirements:", missingRequirements);
      
      // Enhanced user feedback with recovery options
      const diagnostic = diagnoseUnlockIssues(userAgent, progressState);
      
      if (diagnostic.storedAgent && !diagnostic.hasAgent) {
        // Attempt automatic recovery
        console.log("🔄 Attempting automatic state recovery");
        const recovered = recoverUserState(updateProgressState);
        
        if (recovered) {
          toast({
            title: "State Recovered",
            description: "Your agent state has been restored. Please try again.",
          });
          return;
        }
      }
      
      // Show helpful message for locked items
      toast({
        title: "Feature Locked",
        description: missingRequirements[0] || "Complete agent setup to unlock this feature",
        action: item.id !== 'your-agent' ? (
          <button 
            onClick={() => onTabChange('your-agent')}
            className="text-sm underline"
          >
            Go to Agent Setup
          </button>
        ) : undefined
      });
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
            
            // Always allow access to "your-agent"
            if (item.id === 'your-agent') {
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => handleMenuClick(item)}
                    className={`
                      relative w-full justify-start gap-3 px-3 py-2
                      ${isActive ? 'bg-blue-100 text-blue-900 font-medium' : ''}
                      cursor-pointer hover:bg-gray-100
                      transition-all duration-200
                    `}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="flex-1 text-left">{item.name}</span>
                    {/* Entry point indicator */}
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Start Here
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            // Check global access for other items
            const hasGlobalAccess = shouldHaveAccess(userAgent, progressState);
            
            // Check unlock status for items with conditions
            const { isUnlocked, missingRequirements } = checkUnlockConditions(
              item.unlockConditions || [], 
              userAgent, 
              progressState
            );

            // Determine if item should be accessible
            const canAccess = hasGlobalAccess || isUnlocked || !item.unlockConditions || item.unlockConditions.length === 0;
            
            console.log(`🔍 Enhanced menu item "${item.name}":`, {
              id: item.id,
              isActive,
              hasGlobalAccess,
              isUnlocked,
              canAccess,
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
                    ${!canAccess ? 'opacity-60 cursor-pointer' : 'cursor-pointer hover:bg-gray-100'}
                    transition-all duration-200
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : canAccess ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className="flex-1 text-left">{item.name}</span>
                  
                  {/* Enhanced status indicators */}
                  {!canAccess && (
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-gray-400" />
                      <Info className="h-3 w-3 text-blue-500" />
                    </div>
                  )}
                  
                  {canAccess && hasGlobalAccess && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}

                  {/* Debug indicator in development */}
                  {process.env.NODE_ENV === 'development' && !canAccess && (
                    <AlertTriangle className="h-3 w-3 text-orange-400" />
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
