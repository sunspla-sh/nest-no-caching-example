import http from 'k6/http';

export default function () {
  const url = 'http://localhost:3000/cats';

  http.get(url);
}
