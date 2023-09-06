export const thresholdSettings = {
  http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
  http_req_duration: ['p(99)<1000'],
};

export const breakingWorkload = {
  executor: 'ramping-vus',
  stages: [
    { duration: '10s', target: 20 },
    { duration: '50s', target: 20 },
    { duration: '50s', target: 60 },
    { duration: '50s', target: 100 },
    { duration: '50s', target: 140 },
    // ... increase until failure if necessary
  ],
};

export const smokeWorkload = {
  executor: 'shared-iterations',
  iterations: 5,
  vus: 1,
};
