"use client";

import { useEffect, useId, useMemo, useState, type ChangeEvent, type DragEvent } from "react";
import { cx } from "@/lib/cx";

interface RxUploadProps {
  files: readonly File[];
  onChange: (files: File[]) => void;
}

const accepted = new Set(["image/jpeg", "image/png", "application/pdf"]);
const MAX_BYTES = 10 * 1024 * 1024;

export const uploadFailedLine = "That file didn't upload. Use a JPG, PNG or PDF under 10 MB.";

function isAcceptable(file: File): boolean {
  return accepted.has(file.type) && file.size <= MAX_BYTES;
}

/**
 * A dropzone for prescriptions: images or PDF, more than one allowed. Rejected
 * files get one plain sentence, in Ink, never red.
 */
export function RxUpload({ files, onChange }: RxUploadProps) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  const previews = useMemo(
    () => files.map((file) => (file.type.startsWith("image/") ? URL.createObjectURL(file) : null)),
    [files],
  );
  useEffect(() => {
    return () => {
      for (const url of previews) if (url) URL.revokeObjectURL(url);
    };
  }, [previews]);

  function accept(incoming: FileList | null) {
    if (!incoming) return;
    const list = Array.from(incoming);
    const good = list.filter(isAcceptable);
    setError(good.length < list.length ? uploadFailedLine : null);
    if (good.length > 0) onChange([...files, ...good]);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    accept(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setOver(false);
    accept(event.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        className={cx(
          "flex min-h-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-card border border-dashed bg-surface p-6 text-center",
          over ? "border-primary" : "border-hairline hover:border-primary",
        )}
      >
        <span className="text-body font-medium text-primary">
          {files.length > 0 ? "Add another" : "Add a photo or PDF of your prescription"}
        </span>
        <span className="text-legal text-ink-muted">JPG, PNG or PDF, under 10 MB</span>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          multiple
          onChange={handleInput}
          className="sr-only"
        />
      </label>

      {error ? <p className="text-row text-ink-secondary">{error}</p> : null}

      {files.length > 0 ? (
        <ul className="flex flex-col divide-y divide-divider">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`} className="flex items-center gap-3 py-3">
              {previews[index] ? (
                // eslint-disable-next-line @next/next/no-img-element -- a local object URL, not an asset
                <img
                  src={previews[index] ?? undefined}
                  alt=""
                  className="size-11 shrink-0 rounded-well border border-hairline object-cover"
                />
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-well bg-sage text-legal font-semibold text-primary">
                  PDF
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-row text-ink">{file.name}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, i) => i !== index))}
                className="inline-flex min-h-11 items-center px-2 text-row font-medium text-primary hover:text-primary-pressed"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
