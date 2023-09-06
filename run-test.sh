#!/bin/sh

set -e

if [ $# -ne 1]; then
  echo "Usage: ./test.sh <SCRIPT_NAME>"
  exit 1
fi

SCRIPT_NAME=$1
TAG_NAME="$(basename -s .js $SCRIPT_NAME)-$(date +%s)"

K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true K6_OUT=xk6-prometheus-rw k6 run -o experimental-prometheus-rw --tag testid=$TAG_NAME $SCRIPT_NAME