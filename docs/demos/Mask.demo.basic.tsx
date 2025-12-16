import { Mask } from '@gfazioli/mantine-json-tree';
import { MantineDemo } from '@mantinex/demo';
import { JsonTree } from '@gfazioli/mantine-json-tree';
import { data, dataCode } from './data';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={360}>
      <JsonTree
        data={data}
        title="masked.json"
        withExpandAll
        defaultExpanded
        showIndentGuides
        withCopyToClipboard
      />
    </Mask>
  );
}

const code = `
import { JsonTree, Mask } from '@gfazioli/mantine-json-tree';
import { data } from './data';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={360}>
      <JsonTree
        data={data}
        title="masked.json"
        withExpandAll
        defaultExpanded
        showIndentGuides
        withCopyToClipboard
      />
    </Mask>
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
