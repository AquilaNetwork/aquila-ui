#!/bin/sh

# Aquila Blockchain Project - 2021

# Travis Script to install dependencies...

set -ev

# install every repository needed, install dependencies, clone git repos, do yarn linking and building, and build and run final UI

install_dependencies()
{
  echo -e '---INSTALLING DEPENDENCIES!---'
  echo -e '---INSTALLING ALL UI REPOSITORIES---'

  cd ../
  cd aquila-ui-core
  yarn install --pure-lockfile
  cd ../
  mkdir aquila-ui/aquila-ui-core
  rsync -a aquila-ui-core/ aquila-ui/aquila-ui-core --exclude .git
  cd aquila-ui/aquila-ui-core
  yarn link
  cd ../../

  cd aquila-ui-plugins
  yarn install --pure-lockfile
  cd ../
  mkdir aquila-ui/aquila-ui-plugins
  rsync -a aquila-ui-plugins/ aquila-ui/aquila-ui-plugins --exclude .git
  cd aquila-ui/aquila-ui-plugins
  yarn link
  cd ../../

  cd aquila-ui-crypto
  yarn install --pure-lockfile
  cd ../
  mkdir aquila-ui/aquila-ui-crypto
  rsync -a aquila-ui-crypto/ aquila-ui/aquila-ui-crypto --exclude .git
  cd aquila-ui/aquila-ui-crypto
  yarn link
  cd ../
 
  echo -e '---INSTALL ALL DEPENDENCIES---'
  yarn install --pure-lockfile

  echo -e '---LINKING UI FOLDERS ---'
  yarn link aquila-ui-core
  yarn link aquila-ui-crypto
  yarn link aquila-ui-plugins

  echo -e '---BUILDING UI DEPENDENCIES!---'
  yarn build

  echo -e '---UPDATE PACKAGE-JSON UI DEPENDENCIES!---'
  yarn update-package-json

  echo -e '---REMOVE MODULES AND UNUSED DEPENDENCIES!---'
  cd aquila-ui-core
  yarn install --production --ignore-scripts --prefer-offline
  cd ../
  cd aquila-ui-plugins
  rm -R node_modules
  cd ../
  cd aquila-ui-crypto
  rm -R node_modules
  cd ../
  rm -R aquila-ui-crypto
}

install_dependencies
