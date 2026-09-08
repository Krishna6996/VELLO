/** "Glimepiride + metformin" → "glimepiride-metformin" */
export function moleculeSlug(molecule: string): string {
  return molecule
    .toLowerCase()
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
