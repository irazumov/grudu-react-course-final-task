export default function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  if (typeof email !== 'string') {
    return false;
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  }
  return true;
}
