import Link from "next/link";

export const runtime = "edge";

export default async function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <h1>404 page not found.</h1>
      <Link href="/">Go to Homepage</Link>
    </div>
  );
}
