import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || 6379),
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000);
  }
};

export default new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
