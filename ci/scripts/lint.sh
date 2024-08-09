#!/usr/bin/env bash

pushd app-source

yarn --immutable
yarn lint

echo "Finished pipeline!"
