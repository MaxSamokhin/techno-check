#!/usr/bin/env bash
DC_TEST="docker-compose -p test"
${DC_TEST} run --no-deps backend flake8
${DC_TEST} down --remove-orphans