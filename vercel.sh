#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then
  echo "Master branch, used for production builds"
  npm run build:master
else
  echo "This is for devb branch builds"
  npm run build:dev
fi
