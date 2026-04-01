import { c as _c } from "react/compiler-runtime";
import React from 'react';
import { Box, Text, useTheme } from 'src/ink.js';
import { useTerminalSize } from '../../hooks/useTerminalSize.js';

// NERV emblem ASCII art — full-detail version (~31 lines, for terminals >= 80 cols)
// Fig leaf silhouette + integrated "NERV" lettering + circular motto arc
const NERV_EMBLEM_FULL_BLOCKS: readonly string[] = [
  '                                   ▄▄▄▄██████',
  '                                   ▄█████████████',
  '                                 ▄██████████████▀',
  '                     ▄▄         ▄███████████████     ▄▄',
  '                    ▀██▄         ██████████████▀ ▄▄██████▄███▄',
  '                      ▀█▄        ██████████████ ▄██████████████',
  '                        ▀█▄     ██████████████▄█████████████████▄▄',
  '                          ▀█▄▄▄████████████████████████████████████▄',
  '                            ▀████████████████████████████████████████',
  '                             ▀██████████████████████████████████████',
  '                               ▀██████████████████████████████████▀',
  '             ▀████▄    ▀███▀▀████▀████████████████████████████▀▀',
  '               █████▄    █   ████  ▀████████████████████▀▀▀▀▀',
  '               █▀█████   █   ████   █▀████████████████▀',
  '               █  ▀████▄ █   ████▄███  ▀███████████████████▄',
  '               █    ▀█████   ████   █    ████████████████████',
  '               █      ▀███   ████      ▄█ ▀███████████████████',
  '             ▄▄█▄       ▀█  ▄████▄▄▄▄▄██▀   ▀█████████████████',
  '        █▀█  ▀▀ ▀           ██▄▄▄████▄ ▀▄▄▄▄▄▄▀████████████████',
  '         ██▄                 ████   ████ ▀████  ▀███████████████',
  '         ███                 ████    ████  ████▄  ▀███████████',
  '          ▄▀                 ████▄▄▄███▀    ▀████▄  ███████████▄',
  '           ███               ████▀████▄       ▀██████ ███████████',
  '           ▀▀▄▄              ████  ▀████▄       ▀████  ▀█████████',
  '            ▀███             ████    ▀████▄       ▀██    ▀██████',
  '             ▀███▄▄         ▀▀▀▀▀▀▀    ▀▀▀▀▀        ▀      ▀████',
  '               ▀██▀▄                                         ▀██',
  '                 ▀████▄                                   ▄ ██▄▀▀',
  '                    ████                               ▄████▄▀',
  '                     ▀▀ ██▀ ▄▄                    ▄▄▄▀████▀',
  '                         ▀▀█▄█ ███▀▄▄▄▄▄▄▄▄▄▄▄▄▄▀▀███▄',
  '                              ▀▀█▀▄█▀▄██ ███▄█▀█ ▀▀▀',
];

// Compact version (~19 lines, for terminals 60-79 cols)
const NERV_EMBLEM_COMPACT_BLOCKS: readonly string[] = [
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

const NERV_EMBLEM_FULL = NERV_EMBLEM_FULL_BLOCKS;
const NERV_EMBLEM_COMPACT = NERV_EMBLEM_COMPACT_BLOCKS;

const MOTTO = "God's in his heaven. All's right with the world.";

export function WelcomeV2() {
  const $ = _c(4);
  const { columns } = useTerminalSize();

  // Select emblem variant based on terminal width
  const useFullEmblem = columns >= 80;
  const emblem = useFullEmblem ? NERV_EMBLEM_FULL : NERV_EMBLEM_COMPACT;
  const separatorWidth = Math.min(columns - 4, useFullEmblem ? 60 : 46);

  let t0;
  if ($[0] !== columns || $[1] !== useFullEmblem) {
    t0 = <Box flexDirection="column">
      {emblem.map((line, i) => <Text key={i} color="claude" wrap="truncate-end">{line}</Text>)}
      <Text>{' '}</Text>
      <Text dimColor={true}>{'     '}{MOTTO}</Text>
      <Text>{' '}</Text>
      <Text dimColor={true}>{'  '}{'━'.repeat(separatorWidth)}</Text>
      <Text>{' '}</Text>
      <Text><Text color="claude">{'  MAGI SYSTEM'}</Text><Text dimColor={true}>{` ver ${MACRO.VERSION}`}</Text><Text>{'          '}</Text><Text color="success">{'STATUS: ONLINE'}</Text></Text>
      <Text><Text dimColor={true}>{'  CASPER .... '}</Text><Text color="success">{'NOMINAL'}</Text></Text>
      <Text><Text dimColor={true}>{'  BALTHASAR . '}</Text><Text color="success">{'NOMINAL'}</Text></Text>
      <Text><Text dimColor={true}>{'  MELCHIOR .. '}</Text><Text color="success">{'NOMINAL'}</Text></Text>
    </Box>;
    $[0] = columns;
    $[1] = useFullEmblem;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  return t0;
}
