import { useContext, useEffect, useState } from 'react';
import { InputContext, LanguageContext } from '../../context';

export default function KeyboardAssist({
  char,
  keyCodeMapping,
  fillColor = '#9eb3f7',
  color = '#9eb3f7',
  defaultFillColor = '#ffffff',
  defaultColor = '#5e5e5e',
}) {
  const { input, setInput } = useContext(InputContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [lastchar, setLastchar] = useState('');

  useEffect(() => {
    if (input.length > 0) {
      setLastchar(input[input.length - 1]);
    }
  }, [input]);

  let support = ['en', 'es', 'fr', 'th', 'zh']
  let keyToCode = require('./KeyboardMappings/en.js');
  if (support.includes(language))
    keyToCode = require('./KeyboardMappings/' + language + '.js');
  let codeToKey = {};
  Object.keys(keyToCode.KeyCodes).forEach((key) => {
    let codeArray = keyToCode.KeyCodes[key];
    if (codeArray.length === 1) {
      codeToKey[codeArray[0]] = key;
    }
  });
  let xyc = {
    // number row
    192: { x: 0, y: 0, w: 1, c: ['`'] },
    49: { x: 1, y: 0, w: 1, c: ['1'] },
    50: { x: 2, y: 0, w: 1, c: ['2'] },
    51: { x: 3, y: 0, w: 1, c: ['3'] },
    52: { x: 4, y: 0, w: 1, c: ['4'] },
    53: { x: 5, y: 0, w: 1, c: ['5'] },
    54: { x: 6, y: 0, w: 1, c: ['6'] },
    55: { x: 7, y: 0, w: 1, c: ['7'] },
    56: { x: 8, y: 0, w: 1, c: ['8'] },
    57: { x: 9, y: 0, w: 1, c: ['9'] },
    48: { x: 10, y: 0, w: 1, c: ['0'] },
    189: { x: 11, y: 0, w: 1, c: ['-'] },
    187: { x: 12, y: 0, w: 1, c: ['='] },

    // top row
    81: { x: 1.5, y: 1, w: 1, c: ['Q'] },
    87: { x: 2.5, y: 1, w: 1, c: ['W'] },
    69: { x: 3.5, y: 1, w: 1, c: ['E'] },
    82: { x: 4.5, y: 1, w: 1, c: ['R'] },
    84: { x: 5.5, y: 1, w: 1, c: ['T'] },
    89: { x: 6.5, y: 1, w: 1, c: ['Y'] },
    85: { x: 7.5, y: 1, w: 1, c: ['U'] },
    73: { x: 8.5, y: 1, w: 1, c: ['I'] },
    79: { x: 9.5, y: 1, w: 1, c: ['O'] },
    80: { x: 10.5, y: 1, w: 1, c: ['P'] },
    219: { x: 11.5, y: 1, w: 1, c: ['['] },
    221: { x: 12.5, y: 1, w: 1, c: [']'] },
    220: { x: 13.5, y: 1, w: 1, c: ['\\'] },

    // center row
    65: { x: 1.7, y: 2, w: 1, c: ['A', '', 'ฤ', 'ฟ', ''] },
    83: { x: 2.7, y: 2, w: 1, c: ['S', '', 'ฆ', 'ห', ''] },
    68: { x: 3.7, y: 2, w: 1, c: ['D', '', 'ฏ', 'ก', ''] },
    70: { x: 4.7, y: 2, w: 1, c: ['F', '', 'โ', 'ด', ''] },
    71: { x: 5.7, y: 2, w: 1, c: ['G', '', 'ฌ', 'เ', ''] },
    72: { x: 6.7, y: 2, w: 1, c: ['H', '', '็', '้', ''] },
    74: { x: 7.7, y: 2, w: 1, c: ['J', '', '๋', '่', ''] },
    75: { x: 8.7, y: 2, w: 1, c: ['K', '', 'ษ', 'า', ''] },
    76: { x: 9.7, y: 2, w: 1, c: ['L', '', 'ศ', 'ส', ''] },
    186: { x: 10.7, y: 2, w: 1, c: [';', '', 'ซ', 'ว', ''] },
    222: { x: 11.7, y: 2, w: 1, c: ["'", '', '.', 'ง', ''] },

    // bottom row
    90: { x: 2.1, y: 3, w: 1, c: ['Z'] },
    88: { x: 3.1, y: 3, w: 1, c: ['X'] },
    67: { x: 4.1, y: 3, w: 1, c: ['C'] },
    86: { x: 5.1, y: 3, w: 1, c: ['V'] },
    66: { x: 6.1, y: 3, w: 1, c: ['B'] },
    78: { x: 7.1, y: 3, w: 1, c: ['N'] },
    77: { x: 8.1, y: 3, w: 1, c: ['M'] },
    188: { x: 9.1, y: 3, w: 1, c: [','] },
    190: { x: 10.1, y: 3, w: 1, c: ['.'] },
    191: { x: 11.1, y: 3, w: 1, c: ['/'] },

    // special buttons
    tab: { x: 0, y: 1, w: 1.5, c: [''] },
    'caps lock': { x: 0, y: 2, w: 1.7, c: [''] },
    '16L': { x: 0, y: 3, w: 2.1, c: ['shift'] },
    lctrl: { x: 0, y: 4, w: 1, c: [''] },
    fn: { x: 1, y: 4, w: 1, c: [''] },
    lwin: { x: 2, y: 4, w: 1, c: [''] },
    lalt: { x: 3, y: 4, w: 1, c: [''] },
    32: { x: 4, y: 4, w: 5.5, c: [' '] },
    ralt: { x: 9.1, y: 4, w: 1, c: [''] },
    rctrl: { x: 10.1, y: 4, w: 1, c: [''] },
    backspace: { x: 13, y: 0, w: 1.6, c: [''] },
    enter: { x: 12.7, y: 2, w: 1.9, c: [''] },
    '16R': { x: 12.1, y: 3, w: 2.5, c: ['shift'] },
  };

  let deltax = [0, -30, 30, 30, -30];
  let deltay = [0, -30, -30, 30, 30];
  let size = ['1.5em', '1.25em', '1.25em', '1.25em', '1.25em'];

  return (
    <svg viewBox="0 0 1590 550" xmlns="http://www.w3.org/2000/svg">
      {Object.keys(xyc).map((code) => {
        let element = xyc[code];
        let index = 0;
        let keyFill = defaultFillColor,
          keyStroke = defaultColor;
        if (
          keyToCode.KeyCodes[lastchar] !== undefined &&
          keyToCode.KeyCodes[lastchar].includes(code)
        ) {
          keyFill = fillColor;
          keyStroke = color;
        }
        return (
          <>
            <rect
              x={element.x * 110}
              y={element.y * 110}
              width={element.w * 100}
              height="100"
              fill={keyFill}
              stroke={keyStroke}
              rx="15"
            />
            <text
              x={element.x * 110 + 40 + deltax[index]}
              y={element.y * 110 + 60 + deltay[index]}
              font-size={size[index]}
            >
              {codeToKey[code]}
            </text>
          </>
        );
      })}
    </svg>
  );
}

// element.c.map((key, index) => {
//   return (<text x={element.x*110 + 40 + deltax[index]} y={element.y*110 + 60 + deltay[index]} font-size={size[index]}>{key}</text>);
// })
