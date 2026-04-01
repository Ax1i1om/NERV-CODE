import { c as _c } from "react/compiler-runtime";
import * as React from 'react';
import { Box, Text } from '../../ink.js';
export type ClawdPose = 'default' | 'arms-up' // both arms raised (used during jump)
| 'look-left' // both pupils shifted left
| 'look-right'; // both pupils shifted right

type Props = {
  pose?: ClawdPose;
};

// NERV emblem — block art version (~19 lines x 40 cols) for seamless terminals
const NERV_BLOCKS: readonly string[] = [
  '                   ▄▄▄',
  '                   ▄▄███████',
  '            ▄     ▄████████   ▄',
  '           ▀█▄    ████████▀▄███████',
  '             ▀█▄ ▄███████████████████▄',
  '               ▀███████████████████████',
  '                 ▀███████████████████▀',
  '        ███  ▀█ ███▀█████████████▀▀',
  '        █▀██▄ █ ███▄█▀█████████▄▄',
  '        █  ▀███ ███ ▀  ███████████▄',
  '       ▄█▄   ▀█ ███▄▄██ ▀██████████',
  '     █          ███▀██████▀█████████',
  '     ▀█         ███ ███ ▀██▄▀██████▄',
  '      ██        ██████▄   ▀███▀█████▄',
  '       ██       ███ ▀███    ▀█  ▀███',
  '        ▀█▄                       ██',
  '          ▀█▄                   ▄▄█▀',
  '            ▀▀█▄▄▄▄        ▄▄▄▀▀▀',
  '                 ▀▀▀▀▀▀▀▀▀▀',
];

const NERV_LOGO = NERV_BLOCKS;

// NERV emblem replaces the original Clawd mascot with the fig leaf logo.
export function Clawd(t0: Props | undefined) {
  const $ = _c(2);
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = <Box flexDirection="column">{NERV_LOGO.map((line, i) => <Text key={i} color="claude" wrap="truncate-end">{line}</Text>)}</Box>;
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  return t1;
}
