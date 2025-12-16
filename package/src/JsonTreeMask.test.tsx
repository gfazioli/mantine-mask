import React from 'react';
import { render } from '@mantine-tests/core';
import { JsonTreeMask } from './JsonTreeMask';

describe('JsonTreeMask', () => {
  it('renders masked json tree without crashing', () => {
    const { container } = render(<JsonTreeMask data={{ user: 'Jane' }} />);

    expect(container.querySelector('[data-with-cursor]')).toBeTruthy();
    expect(container.querySelector('.mantine-JsonTree-root')).toBeInTheDocument();
  });

  it('applies static mask coordinates when cursor tracking is disabled', () => {
    const { container } = render(
      <JsonTreeMask data={{ user: 'Jane' }} withCursorMask={false} maskX={10} maskY={25} maskRadius={320} />
    );

    const wrapper = container.querySelector('[data-with-cursor]') as HTMLElement;

    expect(wrapper.getAttribute('data-with-cursor')).toBe('false');
    expect(wrapper.style.getPropertyValue('--json-tree-mask-x')).toBe('10%');
    expect(wrapper.style.getPropertyValue('--json-tree-mask-y')).toBe('25%');
    expect(wrapper.style.getPropertyValue('--json-tree-mask-radius')).toContain('20rem');
  });
});
