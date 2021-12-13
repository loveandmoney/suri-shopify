// todo: DRY
const context = require.context(`./`, true, /\.\/[^/]+\.js$/);

context.keys().forEach((filePath) => {
  const componentName = filePath.replace(/^.+\/([^/]+)\.js/, `$1`);

  module.exports[componentName] = context(filePath).default;
});
