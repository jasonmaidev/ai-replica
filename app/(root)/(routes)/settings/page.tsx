import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const SettingsPage = async () => {

  return (
    <div className="h-full p-4 md:px-8 md:py-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm md:text-md flex flex-row items-center gap-4">
        <p className="p-2 px-8 border border-slate-400/20 rounded-md">
          Switch viewing mode :
        </p>
        <ModeToggle />
      </div>
      <div className="text-muted-foreground text-sm md:text-md flex flex-row items-center gap-8">
        <p className="p-2 px-8 border border-slate-400/20 rounded-md">
          Manage account :
        </p>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default SettingsPage;
