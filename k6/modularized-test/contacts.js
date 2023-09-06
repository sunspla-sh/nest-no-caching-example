import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { group, sleep } from 'k6';

const contactsLatency = new Trend('contact_duration');

export function contacts(baseUrl) {
  group('Contacts flow', function () {
    let res = http.get(`${baseUrl}/contacts.php`);

    contactsLatency.add(res.timings.duration);
    sleep(1);

    res = http.get(`${baseUrl}/`);
    contactsLatency.add(res.timings.duration);
    sleep(1);
  });
}
