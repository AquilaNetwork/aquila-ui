#!/bin/bash

# Make necessary config and add Aquila Softwares apt repo

# SCript to run UI without sandbox
echo \'/opt/${productFilename}/aquila-ui\' --no-sandbox > '/opt/${productFilename}/run-ui'
chmod +x '/opt/${productFilename}/run-ui'

# Link to run-ui
ln -sf '/opt/${productFilename}/run-ui' '/usr/bin/${executable}'

# SUID chrome-sandbox for Electron 5+
sudo chown root '/opt/${productFilename}/chrome-sandbox' || true
sudo chmod 4755 '/opt/${productFilename}/chrome-sandbox' || true

update-mime-database /usr/share/mime || true
update-desktop-database /usr/share/applications || true

# Install curl if not installed on the system
if ! which curl; then sudo apt-get --yes install curl; fi

# Install apt repository source list if it does not exist
if ! grep ^ /etc/apt/sources.list /etc/apt/sources.list.d/* | grep aquila.list; then
  curl -sS https://update.aquila.online/aquila.gpg | sudo apt-key add -
  sudo rm -rf /usr/share/keyrings/aquila.gpg
  sudo apt-key export 856A3FF1 | sudo gpg --dearmour -o /usr/share/keyrings/aquila.gpg
  sudo rm -rf /etc/apt/sources.list.d/aquila.list
  echo 'deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/aquila.gpg] https://update.aquila.online/ ./ ' >  /etc/apt/sources.list.d/aquila.list
fi
