import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function NewSnippit() {
    return(
        <div>
            <div className="flex justify-end ">
                <Link href='/'><Button className="bg-red-500 text-white">Home</Button></Link>
            </div> 
        <form>
            <div className="mb-5">
                <Label className="pb-2">Title</Label>
                <Input type="text" className="outline-none" name="title" id="title"/>
            </div>
            <div>
                <Label className="pb-2">Code</Label>
                <Textarea name="code" id="code"></Textarea>   
                </div>
                <Button className="mt-5 bg-blue-400 text-white">Submit</Button>
        </form>
        </div>
    )
}