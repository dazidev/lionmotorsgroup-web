import { mkdir, rename, rm, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

function getUploadsRoot(): string {
  const uploadsDir = process.env.UPLOADS_DIR;

  if (!uploadsDir) {
    throw new Error("UPLOADS_DIR is not configured.");
  }

  return path.resolve(uploadsDir);
}

export function resolveStorageKey(key: string): string {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid storage key.");
  }

  const normalizedKey = key.replaceAll("\\", "/");

  if (
    normalizedKey.startsWith("/") ||
    normalizedKey.includes("../") ||
    normalizedKey === ".."
  ) {
    throw new Error("Invalid storage key.");
  }

  const root = getUploadsRoot();
  const resolvedPath = path.resolve(root, normalizedKey);

  if (resolvedPath !== root && !resolvedPath.startsWith(`${root}${path.sep}`)) {
    throw new Error("Storage key resolves outside uploads directory.");
  }

  return resolvedPath;
}

export async function saveFile(key: string, data: Uint8Array): Promise<void> {
  const filePath = resolveStorageKey(key);

  await mkdir(path.dirname(filePath), {
    recursive: true,
  });

  await writeFile(filePath, data);
}

export async function deleteFile(key: string): Promise<void> {
  const filePath = resolveStorageKey(key);

  try {
    await unlink(filePath);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

export async function deleteDirectory(key: string): Promise<void> {
  const directoryPath = resolveStorageKey(key);

  await rm(directoryPath, {
    recursive: true,
    force: true,
  });
}

export async function createDirectory(key: string): Promise<void> {
  const directoryPath = resolveStorageKey(key);

  await mkdir(directoryPath, {
    recursive: true,
  });
}

export async function moveDirectory(
  sourceKey: string,
  destinationKey: string,
): Promise<void> {
  const sourcePath = resolveStorageKey(sourceKey);
  const destinationPath = resolveStorageKey(destinationKey);

  await mkdir(path.dirname(destinationPath), {
    recursive: true,
  });

  await rename(sourcePath, destinationPath);
}
