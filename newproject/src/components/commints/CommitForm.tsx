"use client";
import React, { useState } from "react";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { CreateCommit } from "@/actions/createCommit";

const initialState = {
  error: {},
  success: false,
};

interface CommitFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

const CommitForm: React.FC<CommitFormProps> = ({ postId, parentId, startOpen }) => {
  const [open, setOpen] = useState(startOpen || false);
  const [formState, action] = useActionState(
    (prevState: typeof initialState, formData: FormData) =>
      CreateCommit({ postId, parentId }, prevState, formData),
    initialState
  );

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      {!startOpen && (
        <Button
          onClick={() => setOpen(!open)}
          className="bg-gray-700 text-white hover:bg-gray-600"
          size="sm"
        >
          {open ? "Cancel" : "Reply"}
        </Button>
      )}

      {open && (
        <form action={action} className="mt-2">
          <textarea
            name="content"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Write your reply..."
          />
          {formState?.error?.content && (
            <p className="text-red-500 text-xs mt-1">
              {formState.error.content[0]}
            </p>
          )}

          {formState?.error?.formerror && (
            <p className="text-red-600 text-sm mb-2">
              {formState.error.formerror}
            </p>
          )}

          <div className="mt-2">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Submit
            </Button>
          </div>

          {formState?.success && (
            <p className="text-green-600 text-xs mt-2">
              Reply submitted successfully!
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default CommitForm;
