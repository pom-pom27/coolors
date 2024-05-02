import Logo from "@/assets/logo.svg";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface IHeader {}

const Header = ({}: IHeader) => {
  return (
    <div className="p-4 border-b-2 lg:absolute w-full h-[4.1rem] bg-white z-10 flex  justify-between">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt={"logo"} />
        </Link>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
