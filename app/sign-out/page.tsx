import { SignedOut } from "@clerk/nextjs";

export const runtime = "edge";

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
