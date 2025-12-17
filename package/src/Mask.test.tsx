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

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-active]') as HTMLElement;

    expect(root.getAttribute('data-with-cursor')).toBe('false');

    expect(mask.style.getPropertyValue('--mask-x')).toBe('10%');
    expect(mask.style.getPropertyValue('--mask-y')).toBe('25%');
    expect(mask.style.getPropertyValue('--mask-radial-radius')).toContain('20rem');
  });

  it('supports elliptical radii with maskRadiusX and maskRadiusY', () => {
    const { container } = render(
      <Mask withCursorMask={false} maskRadiusX={100} maskRadiusY={200}>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-active]') as HTMLElement;
    expect(mask.style.getPropertyValue('--mask-radial-radius-x')).toContain('6.25rem');
    expect(mask.style.getPropertyValue('--mask-radial-radius-y')).toContain('12.5rem');
  });

  it('sets invert flag when invertMask is enabled', () => {
    const { container } = render(
      <Mask withCursorMask={false} invertMask>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-active]') as HTMLElement;
    expect(mask.getAttribute('data-invert')).toBe('true');
  });
});
