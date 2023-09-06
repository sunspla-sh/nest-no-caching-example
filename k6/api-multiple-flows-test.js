import { group, sleep } from 'k6';
import http from 'k6/http';

const baseUrl = 'https://test.k6.io';

export default function () {
  //visit some endpoints in one group
  group('Contacts flow', function () {
    http.get(`${baseUrl}/contacts.php`);
    sleep(1);
    //return to home page
    http.get(`${baseUrl}/`);
    sleep(1);
  });
  //coinflip players in game
  group('Coinflip game', function () {
    http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    sleep(1);
    http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    sleep(1);
  });
}
