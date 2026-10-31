"use client";

import { useActionState, useRef, useState } from "react";
import { ImageOff, Upload } from "lucide-react";
import { uploadAvatar } from "./actions";

const initialState = { status: "idle" };

// The hero shows the photo at 280px wide, so 640px covers a 2x screen.
// Images are served as-is (no Vercel optimizer), so whatever is uploaded
// is exactly what every visitor downloads.
const MAX_SIDE = 640;

// Scales a photo down in the browser before it is uploaded. GIFs are left
// alone (redrawing one would drop its animation), as is anything already
// small enough; if the browser can't decode the file, the original goes
// up unchanged and the server's own checks still apply.
async function shrinkPhoto(file) {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = MAX_SIDE / Math.max(bitmap.width, bitmap.height);
    if (scale >= 1) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    // JPEG has no transparency: without a fill, see-through areas of a PNG
    // or WebP come out black.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function AvatarUploader({ initialUrl }) {
  const [state, formAction, pending] = useActionState(uploadAvatar, initialState);
  // Covers the gap between picking a file and the upload starting, while
  // the photo is being shrunk; `pending` only turns on once it is sent.
  // It blocks the label (so the picker can't reopen), never the input:
  // a disabled input is left out of the submitted form, and React would
  // not have re-enabled it yet by the time requestSubmit() runs.
  const [preparing, setPreparing] = useState(false);
  const formRef = useRef(null);
  const busy = pending || preparing;
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
          <label
            aria-disabled={busy || undefined}
            className={`flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Upload size={14} />
            {busy ? "Uploading..." : "Change photo"}
            <input
              type="file"
              name="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              disabled={pending}
              onChange={async (e) => {
                const input = e.currentTarget;
                const file = input.files?.[0];
                if (file) {
                  setPreparing(true);
                  try {
                    const small = await shrinkPhoto(file);
                    if (small !== file) {
                      const files = new DataTransfer();
                      files.items.add(small);
                      input.files = files.files;
                    }
                  } catch {
                    // A browser that can't swap the file (no DataTransfer)
                    // still uploads the original rather than nothing.
                  } finally {
                    setPreparing(false);
                  }
                }
                formRef.current?.requestSubmit();
              }}
            />
          </label>
        </form>
        {state.status === "error" && (
          <p className="mt-1.5 text-xs text-danger">{state.error}</p>
        )}
        {state.status === "success" && (
          <p className="mt-1.5 text-xs text-live">Updated — live now.</p>
        )}
      </div>
    </div>
  );
}
