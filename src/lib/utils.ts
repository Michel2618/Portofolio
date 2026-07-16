import { clsx, type ClassValue } from 'clsx';

/**
 * A simpler version of Shadcn's cn utility since we aren't using Tailwind.
 * We only need clsx to conditionally combine class names.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
