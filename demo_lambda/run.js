const { handler } = require('./index.js');

const main = async () => {
  const res = await handler({});
  console.log(res);
};

main();