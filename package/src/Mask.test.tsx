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
    const mask = container.querySelector('[data-variant]') as HTMLElement;

    expect(root.getAttribute('data-with-cursor')).toBe('false');

    expect(mask.style.getPropertyValue('--mask-x')).toBe('10%');
    expect(mask.style.getPropertyValue('--mask-y')).toBe('25%');

    // Radius is now set via InlineStyles (<style> tag)
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
  });

  it('supports elliptical radii with maskRadiusX and maskRadiusY', () => {
    const { container } = render(
      <Mask withCursorMask={false} maskRadiusX={100} maskRadiusY={200}>
        <div>content</div>
      </Mask>
    );

    // Radius values are set via InlineStyles (<style> tag)
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
  });

  it('sets invert flag when invertMask is enabled', () => {
    const { container } = render(
      <Mask withCursorMask={false} invertMask>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;
    expect(mask.getAttribute('data-invert')).toBe('true');
  });

  it('supports linear variant with angle and computed center', () => {
    const { container } = render(
      <Mask variant="linear" withCursorMask={false} maskX={25} maskY={50} maskAngle={30}>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;

    expect(mask.getAttribute('data-variant')).toBe('linear');
    expect(mask.style.getPropertyValue('--mask-angle')).toBe('30deg');
    expect(mask.style.getPropertyValue('--mask-linear-center')).toBeTruthy();
  });

  it('supports maskFeather as a convenience prop', () => {
    const { container } = render(
      <Mask maskFeather={20} maskOpacity={0.6}>
        content
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;

    expect(mask.style.getPropertyValue('--mask-opacity')).toBe('0.6');
    expect(mask.style.getPropertyValue('--mask-transparency-start')).toBe('80%');
    expect(mask.style.getPropertyValue('--mask-transparency-end')).toBe('100%');
  });

  it('calls onActiveChange when activation toggles active state', () => {
    const onActiveChange = jest.fn();
    const { container } = render(
      <Mask activation="pointer" onActiveChange={onActiveChange}>
        <div style={{ width: 200, height: 200 }} />
      </Mask>
    );

    // With activation="pointer", the root container should be present for event handling
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root).toBeTruthy();

    // Initially, mask should not be rendered (only root for events)
    expect(container.querySelector('[data-variant]')).toBeFalsy();

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
    const mask = container.querySelector('[data-variant]') as HTMLElement;

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
      <Mask
        withCursorMask
        trackPointerOnDocument
        animation="none"
        clampToBounds
        clampPadding={20}
        maskRadius={100}
      >
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-variant]') as HTMLElement;

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

  it('activates on focus and deactivates on blur when activation="focus"', () => {
    const onActiveChange = jest.fn();
    const { container } = render(
      <Mask activation="focus" onActiveChange={onActiveChange}>
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.getAttribute('tabindex')).toBe('0');

    expect(container.querySelector('[data-variant]')).toBeFalsy();

    fireEvent.focus(root);
    expect(onActiveChange).toHaveBeenCalledWith(true);

    fireEvent.blur(root);
    expect(onActiveChange).toHaveBeenCalledWith(false);
  });

  it('activates on hover when activation="hover"', () => {
    const onActiveChange = jest.fn();
    const { container } = render(
      <Mask activation="hover" onActiveChange={onActiveChange}>
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[class*="root"]') as HTMLElement;

    fireEvent.pointerEnter(root);
    expect(onActiveChange).toHaveBeenCalledWith(true);

    fireEvent.pointerLeave(root);
    expect(onActiveChange).toHaveBeenCalledWith(false);
  });

  it('respects controlled active prop over activation mode', () => {
    const { container, rerender } = render(
      <Mask activation="hover" active={false}>
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[class*="root"]') as HTMLElement;

    // Even after hover, mask should not appear because active is controlled to false
    fireEvent.pointerEnter(root);
    expect(container.querySelector('[data-variant]')).toBeFalsy();

    // When controlled active is true, mask should appear
    rerender(
      <Mask activation="hover" active>
        <div>content</div>
      </Mask>
    );
    expect(container.querySelector('[data-variant]')).toBeTruthy();
  });

  it('returns only children when active={false} and activation="always"', () => {
    const { container } = render(
      <Mask active={false}>
        <div data-testid="child">content</div>
      </Mask>
    );

    // No root box or mask wrapper, just children
    expect(container.querySelector('[data-with-cursor]')).toBeFalsy();
    expect(container.querySelector('[data-variant]')).toBeFalsy();
    expect(container.textContent).toContain('content');
  });

  it('applies maskFeather=0 as hard edge (start=end=100)', () => {
    const { container } = render(
      <Mask maskFeather={0}>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;
    expect(mask.style.getPropertyValue('--mask-transparency-start')).toBe('100%');
    expect(mask.style.getPropertyValue('--mask-transparency-end')).toBe('100%');
  });

  it('applies maskFeather=100 as full fade (start=0, end=100)', () => {
    const { container } = render(
      <Mask maskFeather={100}>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;
    expect(mask.style.getPropertyValue('--mask-transparency-start')).toBe('0%');
    expect(mask.style.getPropertyValue('--mask-transparency-end')).toBe('100%');
  });

  it('sets default radial variant when no variant is specified', () => {
    const { container } = render(
      <Mask>
        <div>content</div>
      </Mask>
    );

    const mask = container.querySelector('[data-variant]') as HTMLElement;
    expect(mask.getAttribute('data-variant')).toBe('radial');
  });

  it('applies cursor offset when tracking pointer', () => {
    const { container } = render(
      <Mask
        withCursorMask
        trackPointerOnDocument
        animation="none"
        cursorOffsetX={10}
        cursorOffsetY={20}
      >
        <div>content</div>
      </Mask>
    );

    const root = container.querySelector('[data-with-cursor]') as HTMLElement;
    const mask = container.querySelector('[data-variant]') as HTMLElement;

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

    fireEvent.mouseMove(document, { clientX: 50, clientY: 50 });

    expect(mask.style.getPropertyValue('--mask-x')).toBe('60px');
    expect(mask.style.getPropertyValue('--mask-y')).toBe('70px');
  });

  it('supports responsive maskRadius object', () => {
    const { container } = render(
      <Mask maskRadius={{ base: 100, md: 200 }}>
        <div>content</div>
      </Mask>
    );

    expect(container.querySelector('style')).toBeTruthy();
    expect(container.querySelector('[data-variant]')).toBeTruthy();
  });
});
