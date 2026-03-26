import { createContext, useContext } from 'react';

export interface MaskGroupContextValue {
  /** Shared cursor position from the group container (client coordinates) */
  clientX: number;
  clientY: number;
  /** Whether the pointer is currently inside the group */
  pointerInside: boolean;
}

export const MaskGroupContext = createContext<MaskGroupContextValue | null>(null);

export function useMaskGroupContext() {
  return useContext(MaskGroupContext);
}
