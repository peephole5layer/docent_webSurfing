const kue = require('kue');
const redis = require('redis');

try {

  // import { createClient } from 'redis';

  // const client = redis.createClient({
  //   password: 'tFZ7gVUB3NI5Lz7fTU259asTnj9cuzWw',
  //   socket: {
  //     host: 'redis-11465.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  //     port: 11465
  //   }
  // });

  // const client = redis.createClient({
  //   url: process.env.REDIS_URL
  // });

  // client.on('error', (err) => console.log('Redis Client Error', err));

  const queue = kue.createQueue();

  // const queue = kue.createQueue();

  kue.app.listen(3000);

  module.exports = queue;
} catch (err) {
  console.log('Error in Kue configuration:', err);
}
