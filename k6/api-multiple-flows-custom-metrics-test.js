import http from 'k6/http';
import { group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

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

  group('Coinflip game', function () {
    let res = http.get(`${baseUrl}/flip_coin?bet=heads`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);
    res = http.get(`${baseUrl}/flip_coin?bet=tails`);
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}
