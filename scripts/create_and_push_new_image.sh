
USERNAME=vsas

VERSION=$(cat version.txt)
docker manifest inspect $USERNAME/single-pin-pong:$VERSION > /dev/null
if [ $? -eq 0 ]; then
  echo "--- ${VERSION} version already exists. Update version in version.txt in project root"
  exit 0
fi

set -e


docker build -t single-pin-pong .

echo "--- Deploying latest version of single-pin-pong image"
docker image tag single-pin-pong $USERNAME/single-pin-pong:latest
docker image push $USERNAME/single-pin-pong:latest

echo "--- Deploying ${VERSION} version of single-pin-pong image"
docker image tag single-pin-pong $USERNAME/single-pin-pong:${VERSION}
docker image push $USERNAME/single-pin-pong:${VERSION}