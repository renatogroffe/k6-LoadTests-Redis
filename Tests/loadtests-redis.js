import { Trend } from 'k6/metrics';
import redis from 'k6/x/redis';

const RedisLatencyMetric = new Trend('redis_latency', true);

export const options = {
  vus: 50,
  duration: '10s',
};

const client = new redis.Client({
  addr: 'localhost:6379',
  password: 'Redis2021!',
  db: 0,
});

export function setup() {
  client.set('ExemploRedis', 'Testes com Redis + k6', 0);
}

export default function () {
  const start = Date.now();
  client.get('ExemploRedis');
  const latency = Date.now() - start;
  RedisLatencyMetric.add(latency); 
}