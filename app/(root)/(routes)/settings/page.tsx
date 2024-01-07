import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const SettingsPage = async () => {

  return (
    <div className="h-full p-4 md:px-8 md:py-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm md:text-lg flex flex-row items-center px-4">
        <p>
          Adjust viewing mode here :
        </p>
        <ModeToggle />
      </div>
      <div className="text-muted-foreground text-sm md:text-lg flex flex-row items-center gap-4 px-4">
        <p>
          Manage account :
        </p>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default SettingsPage;
