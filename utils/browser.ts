export default function isBrowser(): boolean {
  return process.browser && typeof window !== 'undefined';
}
