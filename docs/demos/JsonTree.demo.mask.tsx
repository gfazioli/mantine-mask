import { JsonTreeMask } from '@gfazioli/mantine-json-tree';
import { MantineDemo } from '@mantinex/demo';
import { data, dataCode } from './data';

function Demo() {
  return (
    <JsonTreeMask
      data={data}
      title="masked.json"
      withExpandAll
      defaultExpanded
      showIndentGuides
      withCopyToClipboard
      p="md"
      maskRadius={360}
    />
  );
}

const code = `
import { JsonTreeMask } from '@gfazioli/mantine-json-tree';
import { data } from './data';

function Demo() {
  return (
    <JsonTreeMask
      data={data}
      title="masked.json"
      withExpandAll
      defaultExpanded
      showIndentGuides
      withCopyToClipboard
      p="md"
      maskRadius={360}
    />
  );
}
`;

export const mask: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
