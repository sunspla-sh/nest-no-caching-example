import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { group, sleep } from 'k6';

const coinflipLatency = new Trend('coinflip_duration');

export function coinflip(baseUrl) {
  group('Coinflip game', function () {
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/flip_coin?bet=tails`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
