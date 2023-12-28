import { UserButton } from "@clerk/nextjs"

const RootPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      Home Page
    </div>
  );
}

export default RootPage;