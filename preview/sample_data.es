export default {
  lorem: `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

  tooltip: 'Design is like a joke. If it needs explaining, it\'s probably bad.',

  listOptions: [
    { key: 'No selection', value: null },
    { key: 'One', value: 1 },
    { key: 'Two', value: 2 },
    { key: 'Three', value: 3 },
  ],

  optionValues: [
    { imageClass: 'preview-fancy_image', key: 'Eins', value: 1 },
    { imageClass: 'preview-fancy_image', key: 'Zwei', value: false },
    { imageClass: 'preview-fancy_image', key: 'Drei', value: 3 },
    { imageClass: 'preview-fancy_image', key: 'Vier', value: null },
    { imageClass: 'preview-fancy_image', key: 'Fünf', value: 5 },
    { imageClass: 'preview-fancy_image', key: 'Sechs', value: true },
  ],

  optionFancyValues: [
    { key: 'Eins', value: null, children: 'I is a random content 1' },
    { key: 'Zwei', value: 2, children: 'I is a random content 2' },
    { key: 'Drei', value: ['kek!'], children: 'I is a random content triangle' },
    { key: 'Vier', value: 4, children: 'I is a random content orange' },
    { key: 'Fünf', value: false, children: 'I is a random content moist' },
    { key: 'Sechs', value: 6, children: 'I is a random content 17/2' },
  ],
};
