#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

PROJECT_ID=$(gcloud config get-value project)
REGION="us-east1"

echo "Deploying the PRD Authoring MAS to Cloud Run in Project: $PROJECT_ID ($REGION)"

# 1. Deploy the Backend Service
echo "Building and Deploying Backend Service..."
gcloud run deploy prd-mas-backend \
  --source ./backend \
  --region=$REGION \
  --project=$PROJECT_ID \
  --allow-unauthenticated \
  --service-account="prd-mas-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --concurrency=1 \
  --min-instances=1 \
  --timeout=3600 \
  --set-env-vars="REDIS_HOST=10.0.0.3" # Note: Update this with the actual Redis internal IP

# Get Backend URL
BACKEND_URL=$(gcloud run services describe prd-mas-backend --platform managed --region $REGION --format 'value(status.url)')
echo "Backend deployed to: $BACKEND_URL"

# 2. Deploy the Frontend Service
echo "Building and Deploying Frontend Service..."
# In a real scenario, you'd pass the BACKEND_URL as a build arg or substitute it in nginx
gcloud run deploy prd-mas-frontend \
  --source ./frontend \
  --region=$REGION \
  --project=$PROJECT_ID \
  --allow-unauthenticated

FRONTEND_URL=$(gcloud run services describe prd-mas-frontend --platform managed --region $REGION --format 'value(status.url)')
echo "========================================="
echo "Deployment Complete!"
echo "Backend URL:  $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo "========================================="
