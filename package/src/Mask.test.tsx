import React from 'react';
import { render } from '@mantine-tests/core';
import { Mask } from './Mask';

describe('Mask', () => {
  it('renders children inside masked container', () => {
    const { container } = render(
      <Mask>
        <div>content</div>
      </Mask>
    );

    expect(container.querySelector('[data-with-cursor]')).toBeTruthy();
    expect(container.textContent).toContain('content');
  });

  it('applies static mask coordinates when cursor tracking is disabled', () => {
    const { container } = render(
      <Mask withCursorMask={false} maskX={10} maskY={25} maskRadius={320}>
        <div>content</div>
      </Mask>
    );

    const wrapper = container.querySelector('[data-with-cursor]') as HTMLElement;

    expect(wrapper.getAttribute('data-with-cursor')).toBe('false');
    expect(wrapper.style.getPropertyValue('--mask-x')).toBe('10%');
    expect(wrapper.style.getPropertyValue('--mask-y')).toBe('25%');
    expect(wrapper.style.getPropertyValue('--mask-radius')).toContain('20rem');
  });
});
