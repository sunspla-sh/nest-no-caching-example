# Performance Testing a NestJS API with K6, Prometheus, and Grafana

*Note: This repo requires a local K6 installation and a local Docker installation*

Usage instructions:

- run the command ```docker compose up -d```

- run the command ```./run-test.sh ./k6/cats/main.js```

- open ```http://localhost:3000``` in your web browser to see the grafana dashboards of your test results

- run any other k6 tests (either existing or custom ones that you've built yourself) with ```./run-test.sh $SOME_PATH_TO_YOUR_TEST_SCRIPT``` 

