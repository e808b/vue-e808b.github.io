export const ExampleBefore = [
  `<div><span class="text-amber-lighten-3">.example-a</span> {</div>`,
  `<div>&nbsp;&nbsp;<span class="text-blue-lighten-3">width</span>: <span class="text-red">1</span><span class="text-green-lighten-4">px</span>;</div>`,
  `<div>}</div>`,
  `<br />`,
  `<div><span class="text-amber-lighten-3">.example-b</span> {</div>`,
  `<div>&nbsp;&nbsp;<span class="text-blue-lighten-3">width</span>: <span class="text-red">2</span><span class="text-green-lighten-4">px</span>;</div>`,
  `<div>}</div>`,
].join('\n')

export const ExampleAfterSoft = [
  [
    `<span class="text-amber-lighten-3">.example-a</span> { `,
    `<span class="text-blue-lighten-3">width</span>:<span class="text-red">1</span><span class="text-green-lighten-4">px</span> `,
    `}`,
  ].join(''),
  '<br />',
  [
    `<span class="text-amber-lighten-3">.example-b</span> { `,
    `<span class="text-blue-lighten-3">width</span>:<span class="text-red">2</span><span class="text-green-lighten-4">px</span> `,
    `}`,
  ].join(''),
].join('\n')

export const ExampleAfterHard = [
  `<span class="text-amber-lighten-3">.example-a</span>{`,
  `<span class="text-blue-lighten-3">width</span>:<span class="text-red">1</span><span class="text-green-lighten-4">px</span>`,
  `}`,
  `<span class="text-amber-lighten-3">.example-b</span>{`,
  `<span class="text-blue-lighten-3">width</span>:<span class="text-red">2</span><span class="text-green-lighten-4">px</span>`,
  `}`,
].join('')
