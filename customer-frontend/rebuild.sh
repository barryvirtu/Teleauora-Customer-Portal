
#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/home/azureuser/teleauro-sales-app"
cd "$PROJECT_DIR"

echo "Stopping and removing old containers..."
docker compose down --remove-orphans || true

# If you kept external network, ensure it's present:
# docker network inspect teleauro-net >/dev/null 2>&1 || docker network create teleauro-net

echo "Rebuilding and starting fresh..."
docker compose up -d --build

echo "Containers:"
docker ps

echo "Health check: datamanagement endpoint from host..."
set +e
curl -sS -v http://localhost:8083/api/opportunities/all | head -c 300
RET=$?
set -e
if [ $RET -ne 0 ]; then
  echo "Host curl failed. Trying inside datamanagement container..."
  docker exec -it datamanagement sh -c "curl -sS -v http://localhost:9090/api/opportunities/all | head -c 300" || true
fi

echo "Done."
