const DEVELOPMENT_IMAGES_URL = "/api/uploads";
const PRODUCTION_IMAGES_URL = "https://images.lionmotorsgroup.com";

export function getImageUrl(key: string): string {
  const normalizedKey = key.replace(/^\/+/, "");

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? DEVELOPMENT_IMAGES_URL
      : PRODUCTION_IMAGES_URL;

  return `${baseUrl}/${normalizedKey}`;
}
