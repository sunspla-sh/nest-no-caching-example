import { thresholdSettings, breakpointWorkload } from './config.js';
import { catsGet } from './cats.get.js';

const baseUrl = 'http://localhost:3001';

export default function () {
  catsGet(baseUrl);
}

export const options = {
  scenarios: {
    breakpoint_scenario: breakpointWorkload,
  },
  thresholds: thresholdSettings,
};
