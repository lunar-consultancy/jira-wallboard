# Jira Wallboard

Jira Wallboard is a wallboard, build with [AngularJS](https://angularjs.org), to show a fullscreen [Scrumboard](https://en.wikipedia.org/wiki/Scrum_\(software_development\)) on a monitor using a [Raspberry PI](https://www.raspberrypi.org).

## Features

* WIP
* Burndown

## Requirements

### For showing:
* Raspberry PI 2
* A recent version of Chromium

### For building:
* [Git](https://git-scm.com/)
* [Java SDK 8](http://www.oracle.com/technetwork/java/javase/overview/index.html)
* [Maven](https://maven.apache.org)
* Gems

## Setup a Raspberry PI 2

Get Raspbian Jessie [here](https://www.raspberrypi.org/downloads/raspbian)

### Setup system

Update and install Apache

```
apt-get update
apt-get dist-upgrade
apt-get install apache2
```

### Install browser

Download and install Chromium 47 [Raspberry PI Forum](https://www.raspberrypi.org/forums/viewtopic.php?t=121195)

```
wget http://ftp.us.debian.org/debian/pool/main/libg/libgcrypt11/libgcrypt11_1.5.0-5+deb7u3_armhf.deb
wget https://dl.dropboxusercontent.com/u/87113035/chromium-browser-l10n_47.0.2526.73-0ubuntu0.15.04.1.1190_all.deb
wget https://dl.dropboxusercontent.com/u/87113035/chromium-browser_47.0.2526.73-0ubuntu0.15.04.1.1190_armhf.deb
wget https://dl.dropboxusercontent.com/u/87113035/chromium-codecs-ffmpeg-extra_47.0.2526.73-0ubuntu0.15.04.1.1190_armhf.deb
sudo dpkg -i libgcrypt11_1.5.0-5+deb7u3_armhf.deb
sudo dpkg -i chromium-codecs-ffmpeg-extra_47.0.2526.73-0ubuntu0.15.04.1.1190_armhf.deb
sudo dpkg -i chromium-browser-l10n_47.0.2526.73-0ubuntu0.15.04.1.1190_all.deb chromium-browser_47.0.2526.73-0ubuntu0.15.04.1.1190_armhf.deb
```

### Auto-start

To automatically start Chromium with Wallboard add following to the end of ~/.config/lxsession/LXDE-pi/autostart

```
@xset -dpms
@xset s noblank
@xset s off
@chromium-browser --kiosk --disable-translate --incognito http://localhost
```

## Install

### Clone

```
git clone https://github.com/lunar-consultancy/jira-wallboard.git
```

### Configuration

* Review jira-wallboard/frontend/config.json and set at least USERNAME and PASSWORD of your (dedicated wallboard) Jira account.
* Review jira-wallboard/frontend/config-production.json and et the Jira URL and your board name.  

### Build

```
cd jira-wallboard
mvn clean package
```

### Install

```
scp frontend/target/jira-wallboard.tar.gz pi@<raspberrypi-ip>:~/
ssh pi@<raspberrypi-ip>
cd /var/www/html
tar xzf ~/jira-wallboard.tar.gz
```

### Restart

To see is everything is working

```
reboot
```