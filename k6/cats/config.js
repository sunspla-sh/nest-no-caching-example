export const thresholdSettings = {
  http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
  http_req_duration: ['p(99)<1000'],
};

export const breakpointWorkload = {
  executor: 'ramping-arrival-rate', //assure load increase if the system slows
  preAllocatedVUs: 10000,
  maxVUs: 10000,
  stages: [{ duration: '3m', target: 10000 }],
};
