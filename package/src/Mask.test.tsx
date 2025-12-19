import React from 'react';
import { fireEvent } from '@testing-library/react';
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

  it('supports linear variant with angle and computed center', () => {
    const { container } = render(
      <Mask variant="linear" withCursorMask={false} maskX={25} maskY={50} maskAngle={30}>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-active]') as HTMLElement;

    expect(mask.getAttribute('data-variant')).toBe('linear');
    expect(mask.style.getPropertyValue('--mask-angle')).toBe('30deg');
    expect(mask.style.getPropertyValue('--mask-linear-center')).toBeTruthy();
  });

  it('supports maskFeather as a convenience prop', async () => {
    const { container } = await render(
      <Mask maskFeather={20} maskOpacity={0.6}>
        content
      </Mask>
    );

    const mask = container.querySelector('[data-active]') as HTMLElement;

    expect(mask.style.getPropertyValue('--mask-opacity')).toBe('0.6');
    expect(mask.style.getPropertyValue('--mask-transparency-start')).toBe('80%');
    expect(mask.style.getPropertyValue('--mask-transparency-end')).toBe('100%');
  });

  it('calls onActiveChange when activation toggles active state', async () => {
    const onActiveChange = jest.fn();
    const { container } = await render(
      <Mask activation="pointer" onActiveChange={onActiveChange}>
        <div style={{ width: 200, height: 200 }} />
      </Mask>
    );

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-active]') as HTMLElement;

    expect(mask.getAttribute('data-active')).toBe('false');

    fireEvent.pointerEnter(root);
    expect(onActiveChange).toHaveBeenCalledWith(true);

    fireEvent.pointerLeave(root);
    expect(onActiveChange).toHaveBeenCalledWith(false);
  });

  it('tracks mouse position on document when enabled', () => {
    const { container } = render(
      <Mask withCursorMask trackPointerOnDocument animation="none">
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-active]') as HTMLElement;

    root.getBoundingClientRect = jest.fn(
      () =>
        ({
          left: 100,
          top: 200,
          width: 300,
          height: 400,
          right: 400,
          bottom: 600,
        }) as unknown as DOMRect
    );

    fireEvent.mouseMove(document, { clientX: 150, clientY: 260 });

    expect(mask.style.getPropertyValue('--mask-x')).toBe('50px');
    expect(mask.style.getPropertyValue('--mask-y')).toBe('60px');
  });

  it('ignores clamping props when document tracking is enabled', () => {
    const { container } = render(
      <Mask withCursorMask trackPointerOnDocument animation="none" clampToBounds clampPadding={20} maskRadius={100}>
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-active]') as HTMLElement;

    root.getBoundingClientRect = jest.fn(
      () =>
        ({
          left: 0,
          top: 0,
          width: 300,
          height: 300,
          right: 300,
          bottom: 300,
        }) as unknown as DOMRect
    );

    // If clamping were applied, x=10 would become >= (radius + padding) = 120.
    fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });

    expect(mask.style.getPropertyValue('--mask-x')).toBe('10px');
    expect(mask.style.getPropertyValue('--mask-y')).toBe('10px');
  });
});
