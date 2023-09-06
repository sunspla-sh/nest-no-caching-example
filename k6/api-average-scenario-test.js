import { check } from 'k6';
import http from 'k6/http';

export const options = {
  //define thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'], //less than 1% of http requests fail with error
    http_req_duration: ['p(99)<1000'], //less than 1% of http requests take longer than 1000ms
  },
  //define scenarios
  scenarios: {
    //arbitrary name of scenarios
    average_load: {
      executor: 'ramping-vus',
      stages: [
        //ramp up to avg load of 20 virtual users
        { duration: '10s', target: 20 },
        //maintain load
        { duration: '50s', target: 20 },
        //ramp down to zero
        { duration: '5s', target: 0 },
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
