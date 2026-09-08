/**
 * Serviceable pincodes for the launch city. The reference data is Ludhiana
 * (Sharma Medicos, Model Town), so 1410xx. Change together with
 * docs/design-system.md §11 and docs/copy-deck.md if the city changes.
 */
const serviceable = /^1410\d{2}$/;

export function isValidPincode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

export function isServiceable(pincode: string): boolean {
  return serviceable.test(pincode.trim());
}
