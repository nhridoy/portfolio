#!/bin/bash

PROJECT="online-streaming-service"

# Ensure Wrangler is authenticated
if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "You are not logged in. Running 'npx wrangler login'..."
  npx wrangler login || exit 1
fi

PROD_ID=""

while :; do
  echo "Fetching next batch of deployments..."
  JSON_DATA=$(npx wrangler pages deployment list --project-name "$PROJECT" --json 2>/dev/null)

  # Auto-detect Production ID from the first batch if not already cached
  if [ -z "$PROD_ID" ]; then
    PROD_ID=$(echo "$JSON_DATA" | grep -o '"{[^}]*"environment"[[:space:]]*:[[:space:]]*"production"[^}]*}' | grep -o '"Id"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4 | head -n 1)
    [ -n "$PROD_ID" ] && echo "Found Production Deployment ID: $PROD_ID (Will be preserved)"
  fi

  # Extract deployment IDs from current page batch
  ALL_IDS=$(echo "$JSON_DATA" | grep -o '"Id"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4 | sort -u)

  # Filter out the Production ID
  TO_DELETE=$(echo "$ALL_IDS" | grep -v -F -x "$PROD_ID" | grep .)

  # Exit loop when no preview deployments are left in the fetched list
  if [ -z "$TO_DELETE" ]; then
    echo "No more preview deployments found. Cleanup complete!"
    break
  fi

  COUNT=$(echo "$TO_DELETE" | wc -l | tr -d ' ')
  echo "Deleting batch of $COUNT deployment(s)..."

  # Delete current batch
  echo "$TO_DELETE" | while IFS= read -r id; do
    [ -z "$id" ] && continue
    echo "Deleting $id..."
    echo "y" | npx wrangler pages deployment delete "$id" --project-name "$PROJECT" --force >/dev/null 2>&1
  done
done