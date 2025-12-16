# Mantine Mask Component

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-json-tree?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-json-tree)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-json-tree?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-json-tree)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-json-tree?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-json-tree)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-json-tree?style=for-the-badge)

</div>

## Overview

This package provides a spotlight `Mask` wrapper built with [Mantine](https://mantine.dev/). It applies a radial mask to any children, supports cursor-follow or static positions, customizable radius, and background.

[![Mantine Extensions](https://img.shields.io/badge/-Watch_the_Video-blue?style=for-the-badge&labelColor=black&logo=youtube
)](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4)
[![Demo and Documentation](https://img.shields.io/badge/-Demo_%26_Documentation-blue?style=for-the-badge&labelColor=black&logo=typescript
)](https://gfazioli.github.io/mantine-json-tree/)
[![Mantine Extensions HUB](https://img.shields.io/badge/-Mantine_Extensions_Hub-blue?style=for-the-badge&labelColor=blue
)](https://mantine-extensions.vercel.app/)


👉 You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.

## Installation

```sh
npm install @gfazioli/mantine-json-tree
```
or 

```sh
yarn add @gfazioli/mantine-json-tree
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-json-tree/styles.css';
```

## Usage

```tsx
import { Mask } from '@gfazioli/mantine-json-tree';
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

<div align="center">
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-json-tree&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-json-tree&Timeline)

https://github.com/user-attachments/assets/ce2b1ba2-51f7-43d5-8477-6d8fee103fa3
