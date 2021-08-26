import Redis from 'ioredis';

const redis = new Redis();
export const REDIS_PREFIX = process.env.REDIS_PREFIX;

export default redis;