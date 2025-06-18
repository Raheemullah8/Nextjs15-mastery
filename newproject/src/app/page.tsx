import { CreateTopicDialog } from "@/components/ui/CreateDiscus";



export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center p-5 mx-8 my-5 ">
      <div className="font-bold text-2xl">
        <h1>Home Page</h1>
      </div>
      <div>
       <CreateTopicDialog />
      </div>
      </div>
    </div>
  );
}
