"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, X, Plus, ImageOff, Upload } from "lucide-react";
import { uploadProjectImage } from "./actions";

function Thumb({ src }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-muted">
        <ImageOff size={16} />
      </div>
    );
  }

  return (
    // Paths can be local /public files or arbitrary external URLs, so a
    // plain <img> avoids next/image's remote-domain allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-14 w-20 shrink-0 rounded-md border border-border object-cover"
      onError={() => setBroken(true)}
    />
  );
}

export default function ImageListEditor({ name, initial }) {
  const [items, setItems] = useState(initial ?? []);
  const [draft, setDraft] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadProjectImage(null, formData);
    setIsUploading(false);

    if (result.status === "error") {
      setUploadError(result.error);
      return;
    }
    setItems((prev) => [...prev, result.url]);
  };

  const move = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const remove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setDraft("");
  };

  return (
    <div>
      <textarea name={name} value={items.join("\n")} readOnly hidden />

      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
          No screenshots yet — add one below.
        </p>
      )}

      <div className="space-y-2">
        {items.map((path, index) => (
          <div
            key={`${path}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-2"
          >
            <Thumb src={path} />
            <p className="min-w-0 flex-1 truncate font-mono text-xs text-muted" title={path}>
              {path}
              {index === 0 && (
                <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wide text-accent">
                  Cover
                </span>
              )}
            </p>
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronUp size={15} />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronDown size={15} />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remove image"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition hover:bg-red-500/10 hover:text-red-500"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <label
          className={`flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm transition ${
            isUploading
              ? "cursor-not-allowed text-muted opacity-60"
              : "cursor-pointer text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          <Upload size={15} />
          {isUploading ? "Uploading..." : "Upload image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={isUploading}
            onChange={handleFileChange}
          />
        </label>

        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="or paste an image path/URL"
          className="min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-4 py-2.5 font-mono text-xs outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="button"
          onClick={add}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3.5 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
        >
          <Plus size={15} />
          Add
        </button>
      </div>
      {uploadError && <p className="mt-1.5 text-xs text-red-500">{uploadError}</p>}
      <p className="mt-1.5 text-xs text-muted">
        First image is used as the cover. Drag isn&apos;t supported — use the
        arrows to reorder.
      </p>
    </div>
  );
}
