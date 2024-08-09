#!/usr/bin/env bash

pushd app-source

yarn --immutable
yarn build

echo "Finished pipeline!"
