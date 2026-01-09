export function capitalize(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function normalizeToSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9]+/g, "-") // reemplaza todo lo no alfanumérico por -
    .replace(/(^-|-$)+/g, ""); // quita guiones al inicio/fin
}
