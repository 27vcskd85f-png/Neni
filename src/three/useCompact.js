import { useThree } from '@react-three/fiber';

/**
 * True on narrow viewports.
 *
 * Below this width the DOM service chips are visible and carry the chapter
 * content, so the 3D panels and set pieces are suppressed: at phone width
 * they overlap the copy, are too small to read, and cost fill rate on the
 * weakest GPUs. The character and particle field stay.
 */
export const COMPACT_WIDTH = 900;

export function useCompact() {
  return useThree((state) => state.size.width < COMPACT_WIDTH);
}
