import http from 'k6/http';
import { group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  scenarios: {
    breaking: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },
        { duration: '50s', target: 20 },
        { duration: '50s', target: 40 },
        { duration: '50s', target: 60 },
        { duration: '50s', target: 80 },
        { duration: '50s', target: 100 },
        { duration: '50s', target: 120 },
        { duration: '50s', target: 140 },
        //... continue ramping if necessary until threshold reached
      ],
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: ['p(99)<1000'],
  },
};

const baseUrl = 'https://test.k6.io';

const contactsLatency = new Trend('contacts_duration');
const coinflipLatency = new Trend('coinflip_duration');

export default function () {
  group('Contacts flow', function () {
    let res = http.get(`${baseUrl}/contacts.php`);
    contactsLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/`);
    contactsLatency.add(res.timings.duration);
    sleep(1);
  });

  group('Coinflip flow', function () {
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
