export const constLanguages = Object.freeze([
  'bash',
  'c',
  'css',
  'git',
  'js',
  'jsx',
  'php',
  'sql',
  'tsx',
]);

export const createPagination = () => {
  const pagination = [];
  for (let index = 0; index < 5; index++) {
    pagination.push({
      active: false,
      index: index
    });
  }
  return pagination;
}