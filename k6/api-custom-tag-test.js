import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const url = 'https://test-api.k6.io';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '1234',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      'my-custom-tag': 'auth-api',
    },
  };

  const res = http.post(`${url}/auth/basic/login/`, payload, params);

  check(res, {
    'res status should be 200': (res) => res.status == 200,
  });
}
