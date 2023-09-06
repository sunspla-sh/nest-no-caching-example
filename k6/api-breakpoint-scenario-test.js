import { check } from 'k6';
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], //http errors should be less than 1%, otherwise abort the testg
    http_req_duration: ['p(99)<1000'],
  },
  scenarios: {
    //define scenarios
    breaking: {
      //arbitrary name
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
        //... should break at somepoint before we reach 140
      ],
    },
  },
};

export default function () {
  const url = 'https://test-api.k6.io/auth/basic/login/';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '1234',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(url, payload, params);

  check(res, {
    'res status should be 200': (res) => res.status === 200,
  });
}
