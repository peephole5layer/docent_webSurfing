const kue = require('kue');
const redis = require('redis');

try {

  const queue = kue.createQueue({
    redis: this.process.env.REDIS_URL,
  });

  kue.app.listen(3000);

  module.exports = queue;
} catch (err) {
  console.log('Error in Kue configuration:', err);
}
