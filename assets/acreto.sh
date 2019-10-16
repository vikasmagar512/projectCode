#!/usr/bin/env bash
# Stop the execution of the script when an error is encountered
set -e -o pipefail

DEBUG=1
device_secret=this-is-not-a-real-secret
api_url=this-is-not-a-real-api

# Debug mode on
if [ "$DEBUG" -eq 1 ] ; then
  exec 5> acreto.log
  BASH_XTRACEFD="5"
  set -x
fi

# Function to check if the user running the script is root
function is_root () {
  if [ "$EUID" -ne 0 ]; then
    return 1
  fi
}

# Function to check the Operating System
function check_os () {
  if [[ -e /etc/debian_version ]]; then
    os="debian"
    source /etc/os-release

    if [[ "$ID" == "debian" ]]; then
      if [[ ! $VERSION_ID =~ (8|9) ]]; then
        echo "⚠️ Your version of Debian is not supported."
        exit 1
      fi
    elif [[ "$ID" == "ubuntu" ]];then
      os="ubuntu"
      if [[ ! $VERSION_ID =~ (16.04|18.04) ]]; then
        echo "⚠️ Your version of Ubuntu is not supported."
        exit 1
      fi
    fi
  elif [[ -e /etc/centos-release ]]; then
    if ! grep -qs "^CentOS Linux release 7" /etc/centos-release; then
      echo "Your version of Centos is not supported."
      echo "The script only support Centos 7."
      exit 1
    fi
    os=centos
  else
    echo "Looks like you aren't running this installer on a Debian, Ubuntu or Centos."
    exit 1
  fi
}

# Function to include all initial checks, prior to installation
function initial_check () {

# Read the arguments from command line
while (( "$#" )); do
  case "$1" in
    --device_secret)
      device_secret=$2
      shift 2
      ;;
    --api_url)
      api_url=$2
      shift 2
      ;;
    --) # end argument parsing
      shift
      break
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

  if !  is_root; then
    echo "Sorry, you need to run this as root."
    exit 1
  fi
    check_os
}

# Function to get the TLS VPN config for a particular device
function get_tls_config () {

  local response=$(curl -k --silent --request POST \
-H 'Accept: text/plain' ${api_url}/v2/tlsvpn/config?_token=${device_secret})

  if [[ ${response} = *"CERTIFICATE"* ]]; then
    echo "${response}"
  else
    echo "Error while retrieving TLS config."
  fi
}

# Function to update the client configuration
function update_client_configuration () {

  # Get tls config
  local config=$(get_tls_config)

  # Check retrieved tls config
  if [[ ${config} == *"Error"* ]]; then
    echo ""
    echo "An error ocurred while retrieving the TLS config for your device."
    echo "Please double check the Device Token: ${device_secret}."
    echo "If the error persists, please send the acreto.log file to Acreto support."
    exit 1
  fi

  # Write the configuration file
  echo "$config" > /etc/openvpn/acreto.conf

  # Enforce permissions
  chown root:root /etc/openvpn/acreto.conf
  chmod 0644 /etc/openvpn/acreto.conf

  echo ""
  echo "Acreto TLS Client updated!"
}

function install_client () {
  if [[ "$os" =~ (debian|ubuntu) ]]; then
    apt-get update
    apt-get -y install openvpn curl
  elif [[ "$os" = 'centos' ]]; then
    yum install -y epel-release
    yum install -y openvpn
  fi

  update_client_configuration

  if ! [[ -x /bin/systemctl ]]; then
    echo "Starting Acreto TLS Client without systemctl (one time run)"
    openvpn --config /etc/openvpn/acreto.conf --script-security 2 --daemon
  else
    systemctl daemon-reload
    systemctl restart openvpn@acreto
    systemctl enable openvpn@acreto
  fi

  echo ""
  echo "Acreto TLS Client started!"
}

function uninstall_client () {
  echo ""
  read -rp "Do you really want to remove Acreto TLS Client? [y/n]: " -e -i n remove
  if [[ "$remove" = 'y' ]]; then
    # Stop Acreto TLS Client
    if ! [[ -x systemctl ]]; then
      kill -9 $(pidof openvpn)
    else
      systemctl disable openvpn@acreto
      systemctl stop openvpn@acreto
    fi

    if [[ "$os" =~ (debian|ubuntu) ]]; then
      apt-get autoremove --purge -y openvpn
      if [[ -e /etc/apt/sources.list.d/openvpn.list ]]; then
        rm /etc/apt/sources.list.d/openvpn.list
        apt-get update
      fi
    elif [[ "$os" = 'centos' ]]; then
      yum remove -y openvpn
    fi

    # Cleanup
    rm -f /etc/openvpn/acreto.conf
    rm -rf /usr/share/doc/openvpn*
    rm -f /etc/sysctl.d/20-openvpn.conf
    rm -rf /var/log/openvpn

    echo ""
    echo "Acreto TLS Client removed!"
  else
    echo ""
    echo "Removal aborted!"
  fi
}

function manage_menu () {
  local menu_option
  menu_option=0

  clear
  echo "Welcome to Acreto TLS Client installer"
  echo ""
  echo "It looks like Acreto TLS Client is already installed."
  echo ""
  echo "What do you want to do?"
  echo "   1) Update client configuration"
  echo "   2) Remove Acreto TLS Client"
  echo "   3) Exit"

  until [[ "${menu_option}" =~ ^[1-3]$ ]]; do
    read -rp "Select an option [1-3]: " menu_option
  done

  case $menu_option in
      1)
          update_client_configuration
          ;;
      2)
          uninstall_client
          ;;
      3)
          exit 0
          ;;
  esac
}

# Function to define the usage of the script
function usage () {
  echo "Usage: $0 --device_secret <string> [--api_url <https://api-is-rock-solid.acreto.net>]" 1>&2;
  exit 1;
}

function main() {
  # Check for root and os type
  initial_check "$@"

  # Check if Acreto TLS Client is already installed
  if [[ -e /etc/openvpn/acreto.conf ]]; then
    manage_menu
  else
    install_client
  fi
}

# Read the arguments from command line
while (( "$#" )); do
  case "$1" in
    --device_secret)
      device_secret=$2
      shift 2
      ;;
    --api_url)
      api_url=$2
      shift 2
      ;;
    --) # end argument parsing
      shift
      break
      ;;
    -*|--*=) # unsupported flags
      usage
      ;;
    *) # preserve positional arguments
      PARAMS="${PARAMS} $1"
      shift
      ;;
  esac
done

# Check if the API URL and the device secret are correct
if [[ "${api_url}" =~ "http" ]] && [[ "${device_secret}" =~ "s." ]]; then
  # Run the script and append stdout and stderr to logfile
  main --device_secret ${device_secret} --api_url ${api_url} 2>&1 | tee -a acreto.log
else
# If not, show the usage of the script
  usage
fi
