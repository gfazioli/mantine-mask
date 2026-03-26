# Mantine Mask Component

<img alt="Mantine Mask" src="https://github.com/gfazioli/mantine-mask/blob/master/logo.jpeg" />

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-mask?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-mask)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-mask?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-mask)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-mask?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-mask)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-mask?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[Mantine Mask](https://gfazioli.github.io/mantine-mask/) wraps any React node and renders a radial or linear spotlight via CSS masking. You can drive the spotlight by the cursor (`withCursorMask`) or fix it at coordinates (`maskX`/`maskY`), tune its size (`maskRadius` or `maskRadiusX`/`maskRadiusY`), and control edge softness with `maskFeather` or the transparency start/end stops.

### Features

- **Two variants**: radial (elliptical spotlight) and linear (band/stripe effect)
- **Cursor-follow** or **static** spotlight positioning
- **Responsive `maskRadius`**: accepts Mantine breakpoint objects for viewport-adaptive sizing
- **`Mask.Group`**: compound component to synchronize spotlights across multiple Mask children
- **`maskSmoothing`**: eased multi-stop gradients that eliminate hard edge artifacts
- **`maskTransition`**: CSS transitions for smooth fade-in/fade-out on activation
- **`onPositionChange`**: callback to track spotlight position in real time
- **Activation modes**: always, hover, pointer, focus — with controlled/uncontrolled state
- **Animation**: lerp (smooth easing) or instant cursor following
- **Inversion**: `invertMask` creates hole effects (transparent center, visible outside)
- **Boundary clamping** with configurable padding
- **Content-agnostic**: works with images, cards, text, and any React content

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-mask/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-mask
```  
or 

```sh
yarn add @gfazioli/mantine-mask
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-mask/styles.css';
```

## Usage

```tsx
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask withCursorMask maskRadius={320}>
      <Box p="lg">
        <Text fw={700}>Spotlight content</Text>
        <Text c="dimmed">Move your cursor to focus this area.</Text>
      </Box>
    </Mask>
  );
}
```
## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
https://github.com/user-attachments/assets/95b5b9bf-73cb-4c5b-9010-df593b053bdf

---
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-mask&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-mask&Timeline)
