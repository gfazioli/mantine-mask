import type { MaskFactory } from '@gfazioli/mantine-mask';
import type { StylesApiData } from '../components/styles-api.types';

export const MaskStylesApi: StylesApiData<MaskFactory> = {
  selectors: {
    root: 'Root element',
    mask: 'Masked content wrapper',
  },

  vars: {
    root: {
      '--mask-radius': 'Controls mask border radius',
      '--mask-background': 'Controls root background',
    },
    mask: {
      '--mask-transparency-start': 'Gradient start stop (percentage)',
      '--mask-transparency-end': 'Gradient end stop (percentage)',
      '--mask-opacity': 'Masked content opacity',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
