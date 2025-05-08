import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
  <div>
      <h1 className="mb-5 font-bold text-2xl">Home</h1>
      <div className="flex justify-evenly items-center ">
        <h1>Snippits</h1>
        <Link href={'/snippit/new'}><Button className="bg-gray-500 text-white">New</Button></Link>
      </div>

  </div>
  );
}

