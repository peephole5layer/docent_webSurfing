const bull = require('bull');

const queue = new bull('findEmail', {
  redis: ''
});

async function testRedisConnection() {
  try {
    await queue.isReady(); // This checks if the queue is connected to Redis
    console.log('Redis connection successful');
  } catch (error) {
    console.error('Redis connection failed:', error);
  } finally {
    // Optionally, close the Redis connection
    await queue.close();
  }
}

testRedisConnection();
