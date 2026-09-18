"use client";

import { useActionState, useRef } from "react";
import { ImageOff, Upload } from "lucide-react";
import { uploadAvatar } from "./actions";

const initialState = { status: "idle" };

export default function AvatarUploader({ initialUrl }) {
  const [state, formAction, pending] = useActionState(uploadAvatar, initialState);
  const formRef = useRef(null);
  const currentUrl = state.status === "success" ? state.url : initialUrl;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2">
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageOff className="text-muted" size={20} />
        )}
      </div>

      <div>
        <form ref={formRef} action={formAction}>
          <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent">
            <Upload size={14} />
            {pending ? "Uploading..." : "Change photo"}
            <input
              type="file"
              name="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              disabled={pending}
              onChange={() => formRef.current?.requestSubmit()}
            />
          </label>
        </form>
        {state.status === "error" && (
          <p className="mt-1.5 text-xs text-red-500">{state.error}</p>
        )}
        {state.status === "success" && (
          <p className="mt-1.5 text-xs text-live">Updated — live now.</p>
        )}
      </div>
    </div>
  );
}
