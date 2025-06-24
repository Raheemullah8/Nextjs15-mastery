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

import { Plus, Loader2 } from "lucide-react";
import { useState, useActionState } from "react";
import { createPost } from "@/actions/createpost";

interface SlugProps {
  slug: string; 
}

export function CreatePost({ slug }: SlugProps) {
  const [open, setOpen] = useState(false);
  const [formState, formAction, isPending] = useActionState(createPost.bind(null, slug), {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create a new discussion Post. Choose a unique title and provide a clear content.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              disabled={isPending}
              aria-describedby={formState.title ? "title-error" : undefined}
            />
            {formState.title && (
              <p id="title-error" className="text-sm text-destructive">
                {formState.title[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Describe what this post is about (at least 10 characters)"
              className="resize-none min-h-[100px]"
              disabled={isPending}
              aria-describedby={formState.content ? "content-error" : undefined}
            />
            {formState.content && (
              <p id="content-error" className="text-sm text-destructive">
                {formState.content[0]}
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
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}