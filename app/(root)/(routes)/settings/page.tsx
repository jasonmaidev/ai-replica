import { ModeToggle } from "@/components/mode-toggle";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 md:px-8 md:py-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm flex flex-row items-center">
        <p>
          Adjust viewing mode here :
        </p>
        <ModeToggle />
      </div>
    </div>
  );
}

export default SettingsPage;
