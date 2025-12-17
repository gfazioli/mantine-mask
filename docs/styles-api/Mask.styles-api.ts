import type { MaskFactory } from '@gfazioli/mantine-mask';
import type { StylesApiData } from '../components/styles-api.types';

export const MaskStylesApi: StylesApiData<MaskFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--mask-radius': 'Controls mask border radius',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
