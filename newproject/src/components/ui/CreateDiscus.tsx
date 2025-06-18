// components/CreateTopicDialog.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTopic } from "@/actions/createtopics";
import { useActionState, useState } from "react";
import { Plus, Loader2 } from "lucide-react"; // Assuming you have lucide-react

export function CreateTopicDialog() {
  const [formState, formAction, isPending] = useActionState(createTopic, {});
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Topic
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            Create a new discussion topic. Choose a unique name and provide a clear description.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Topic Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., javascript"
              disabled={isPending}
              aria-describedby={formState.name ? "name-error" : undefined}
            />
            {formState.name && (
              <p id="name-error" className="text-sm text-destructive">
                {formState.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what this topic is about (at least 10 characters)"
              className="resize-none min-h-[100px]"
              disabled={isPending}
              aria-describedby={formState.description ? "description-error" : undefined}
            />
            {formState.description && (
              <p id="description-error" className="text-sm text-destructive">
                {formState.description[0]}
              </p>
            )}
          </div>

          {formState.formError && (
            <div className="rounded-md bg-destructive/15 p-3">
              <p className="text-sm text-destructive">{formState.formError[0]}</p>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Topic"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}