"use client";
import React, { useState } from "react";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { CreateCommit } from "@/actions/createCommit";

const initialState = {
  error: {},
  success: false,
};

const CommitForm = () => {
  const [open, setOpen] = useState(true);
  const [formState, action] = useActionState(CreateCommit, initialState);

  return (
    <div className="p-4 border rounded-md bg-white shadow-md max-w-xl mx-auto">
      <Button onClick={() => setOpen(!open)} className="mb-4">
        {open ? "Close" : "Reply"}
      </Button>

      {open && (
        <form action={action}>
          <div className="mb-4">
            <textarea
              name="content"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Write your reply here..."
            />
            {formState?.error?.content && (
              <p className="text-red-500 text-sm mt-1">
                {formState.error.content[0]}
              </p>
            )}
          </div>

          {formState?.error?.formerror && (
            <p className="text-red-600 text-sm mb-2">
              {formState.error.formerror}
            </p>
          )}

          <div>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit Reply
            </Button>
          </div>

          {formState?.success && (
            <p className="text-green-600 text-sm mt-2">
              Reply submitted successfully!
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default CommitForm;
