export default function KeyboardAssist({
  char,
  keyCodeMapping,
  fillColor = '#9eb3f7',
  color = '#9eb3f7',
  defaultFillColor = '#ffffff',
  defaultColor = '#5e5e5e',
}) {
  let xyc = [
    // number row
    {x: 0, y: 0, w: 1, c: ["`"]},
    {x: 1, y: 0, w: 1, c: ["1"]},
    {x: 2, y: 0, w: 1, c: ["2"]},
    {x: 3, y: 0, w: 1, c: ["3"]},
    {x: 4, y: 0, w: 1, c: ["4"]},
    {x: 5, y: 0, w: 1, c: ["5"]},
    {x: 6, y: 0, w: 1, c: ["6"]},
    {x: 7, y: 0, w: 1, c: ["7"]},
    {x: 8, y: 0, w: 1, c: ["8"]},
    {x: 9, y: 0, w: 1, c: ["9"]},
    {x: 10, y: 0, w: 1, c: ["0"]},
    {x: 11, y: 0, w: 1, c: ["-"]},
    {x: 12, y: 0, w: 1, c: ["="]},

    // top row
    {x: 1.5, y: 1, w: 1, c: ["Q"]},
    {x: 2.5, y: 1, w: 1, c: ["W"]},
    {x: 3.5, y: 1, w: 1, c: ["E"]},
    {x: 4.5, y: 1, w: 1, c: ["R"]},
    {x: 5.5, y: 1, w: 1, c: ["T"]},
    {x: 6.5, y: 1, w: 1, c: ["Y"]},
    {x: 7.5, y: 1, w: 1, c: ["U"]},
    {x: 8.5, y: 1, w: 1, c: ["I"]},
    {x: 9.5, y: 1, w: 1, c: ["O"]},
    {x: 10.5, y: 1, w: 1, c: ["P"]},
    {x: 11.5, y: 1, w: 1, c: ["["]},
    {x: 12.5, y: 1, w: 1, c: ["]"]},
    {x: 13.5, y: 1, w: 1, c: ["\\"]},

    // center row
    {x: 1.7, y: 2, w: 1, c: ["A", "", "ฤ", "ฟ", ""]},
    {x: 2.7, y: 2, w: 1, c: ["S", "", "ฆ", "ห", ""]},
    {x: 3.7, y: 2, w: 1, c: ["D", "", "ฏ", "ก", ""]},
    {x: 4.7, y: 2, w: 1, c: ["F", "", "โ", "ด", ""]},
    {x: 5.7, y: 2, w: 1, c: ["G", "", "ฌ", "เ", ""]},
    {x: 6.7, y: 2, w: 1, c: ["H", "", "็", "้", ""]},
    {x: 7.7, y: 2, w: 1, c: ["J", "", "๋", "่", ""]},
    {x: 8.7, y: 2, w: 1, c: ["K", "", "ษ", "า", ""]},
    {x: 9.7, y: 2, w: 1, c: ["L", "", "ศ", "ส", ""]},
    {x: 10.7, y: 2, w: 1, c: [";", "", "ซ", "ว", ""]},
    {x: 11.7, y: 2, w: 1, c: ["'", "", ".", "ง", ""]},

    // bottom row
    {x: 2.1, y: 3, w: 1, c: ["Z"]},
    {x: 3.1, y: 3, w: 1, c: ["X"]},
    {x: 4.1, y: 3, w: 1, c: ["C"]},
    {x: 5.1, y: 3, w: 1, c: ["V"]},
    {x: 6.1, y: 3, w: 1, c: ["B"]},
    {x: 7.1, y: 3, w: 1, c: ["N"]},
    {x: 8.1, y: 3, w: 1, c: ["M"]},
    {x: 9.1, y: 3, w: 1, c: [","]},
    {x: 10.1, y: 3, w: 1, c: ["."]},
    {x: 11.1, y: 3, w: 1, c: ["/"]},

    // special buttons
    {x: 0, y: 1, w: 1.5, c: [""]},
    {x: 0, y: 2, w: 1.7, c: [""]},
    {x: 0, y: 3, w: 2.1, c: ["shift"]},
    {x: 0, y: 4, w: 1, c: [""]},
    {x: 1, y: 4, w: 1, c: [""]},
    {x: 2, y: 4, w: 1, c: [""]},
    {x: 3, y: 4, w: 1, c: [""]},
    {x: 4, y: 4, w: 5.5, c: [" "]},
    {x: 9.1, y: 4, w: 1, c: [""]},
    {x: 10.1, y: 4, w: 1, c: [""]},
    {x: 13, y: 0, w: 1.6, c: [""]},
    {x: 12.7, y: 2, w: 1.9, c: [""]},
    {x: 12.1, y: 3, w: 2.5, c: ["shift"]},
  ];

  let deltax = [0, -30, 30, 30, -30];
  let deltay = [0, -30, -30, 30, 30];
  let size = ["1.5em", "1.25em", "1.25em", "1.25em", "1.25em"];

  return (
    <svg viewBox="0 0 1590 550" xmlns="http://www.w3.org/2000/svg">
      {
        xyc.map((element) => {
          return (
            <>
              <rect x={element.x*110} y={element.y*110} width={element.w*100} height="100" fill="#ffffff" fillOpacity="0" stroke="#000000" rx="15"/>
              {
                element.c.map((key, index) => {
                  return (<text x={element.x*110 + 40 + deltax[index]} y={element.y*110 + 60 + deltay[index]} font-size={size[index]}>{key}</text>);
                })
              }
            </>
          );
        })
      }
    </svg>
  );
}
