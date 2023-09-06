import http from 'k6/http';
import { sleep } from 'k6';

export function catsGet(baseUrl) {
  http.get(`${baseUrl}/cats`);
  sleep(0.1);
}
