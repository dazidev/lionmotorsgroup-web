"use client";
import { useState, useEffect } from "react";

import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_MB = 2;
const MAX_BYTES = MAX_MB * 1024 * 1024;

interface Props {
  file: File | null;
  setFile: (f: File | null) => void;
  preview: string | null;
  setPreview: (f: string | null) => void;
  inputId?: string;
}

export const ImageInput = ({
  file,
  setFile,
  preview,
  setPreview,
  inputId = "1",
}: Props) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] ?? null;
    if (!image) return;
    if (image.size > MAX_BYTES)
      return setError("The image exceeds the maximum allowed size of 2 MB.");
    setFile(image);
    setError("");
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-sm">Image</span>
      <label
        htmlFor={inputId}
        className="flex w-full h-auto justify-center items-center rounded-xl border-2 border-dashed aspect-3/2"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-xl"
          />
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center pt-5 pb-6 cursor-pointer active:scale-98">
            <FaCloudUploadAlt size={40} color="gray-200" />
            <div className="flex flex-col w-full justify-center items-center">
              <span>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </span>
              <p className="text-xs text-gray-300">
                SVG, PNG, JPG o GIF (ASPECT 3:2)
              </p>
            </div>

            {error && <p className="text-xs text-red-700 mt-2">{error}</p>}
          </div>
        )}

        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};
