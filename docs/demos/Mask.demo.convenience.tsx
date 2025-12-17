import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Flex, Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: MaskProps) {
  return (
    <Flex>
      <Mask {...props}>
        <Image
          src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
    </Flex>
  );
}

const code = `
import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';

function Demo(props: MaskProps) {
  return (
    <Mask{{props}}>
      <Image
        src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const convenience: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    {
      type: 'number',
      prop: 'maskRadius',
      initialValue: 160,
      libraryValue: undefined,
      min: 0,
      max: 800,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskFeather',
      initialValue: 100,
      libraryValue: undefined,
      min: 0,
      max: 100,
      step: 1,
    },
  ],
};
