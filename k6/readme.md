make sure you have k6 and jq installed before you attempt to run any of these tests and filter the results

one of the k6 tests you can run:

k6 run api-multiple-flows-custom-metrics-test.js --out json=results.json --iterations 10

some jq queries that you can run on the outputted json data:

get avg of custom metric "coinflip_duration:

jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s 'add/length'

get min of custom metric "coinflip_duration:

jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s min

get max of custom metric "coinflip_duration:

jq '. | select(.type == "Point" and .metric == "coinflip_duration") | .data.value' results.json | jq -s max
