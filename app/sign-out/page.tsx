import { SignedOut } from "@clerk/nextjs";

interface IPage {}

const Page = ({}: IPage) => {
  return (
    <div className="flex h-screen justify-center">
      <div className="mt-20">
        <SignedOut />
      </div>
    </div>
  );
};

export default Page;
