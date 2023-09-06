import { contacts } from './contacts.js';
import { coinflip } from './coinflip.js';
import {
  breakingWorkload,
  smokeWorkload,
  thresholdSettings,
} from './config.js';

const baseUrl = 'https://test.k6.io';

export default function () {
  contacts(baseUrl);
  coinflip(baseUrl);
}

export const options = {
  scenarios: {
    custom_scenario:
      __ENV.WORKLOAD === 'breaking' ? breakingWorkload : smokeWorkload,
  },
  thresholds: thresholdSettings,
};
