"use client";

import { Trash2 } from "lucide-react";
import { deleteProject } from "./actions";

export default function DeleteProjectButton({ id, title }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={`Delete ${title}`}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-danger"
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
