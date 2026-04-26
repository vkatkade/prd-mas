#!/bin/bash

# Exit on any error
set -e

PROJECT_ID=$(gcloud config get-value project)
echo "Using Project ID: $PROJECT_ID"
REGION="us-east1"

echo "1. Creating Service Account..."
gcloud iam service-accounts create prd-mas-sa --display-name="PRD MAS Service Account" || true

SA_EMAIL="prd-mas-sa@${PROJECT_ID}.iam.gserviceaccount.com"

echo "2. Assigning IAM Roles to Service Account..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/datastore.user" > /dev/null

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/redis.editor" > /dev/null

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/secretmanager.secretAccessor" > /dev/null

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/aiplatform.user" > /dev/null

echo "3. Creating Firestore Database (Native Mode)..."
# Attempt to create a named database (requires Firebase enabled, or newer GCP project, standard creation may fail if default already exists, but let's try)
gcloud firestore databases create --database=prd-mas-db --location=$REGION --type=firestore-native || echo "Database creation skipped or already exists."

echo "4. Creating Placeholder Secret in Secret Manager..."
printf "TODO_ADD_GEMINI_API_KEY" | gcloud secrets create prd-mas-gemini-key --data-file=- || echo "Secret may already exist."
printf "TODO_ADD_GWS_OAUTH" | gcloud secrets create prd-mas-gws-oauth --data-file=- || echo "Secret may already exist."

echo "5. Initiating Memorystore Redis Creation (This will take ~10 minutes)..."
# We run this in the background so the script completes.
gcloud redis instances create prd-mas-redis --size=1 --region=$REGION --redis-version=redis_6_x --async

echo "GCP Provisioning Script Completed!"
echo "Note: The Redis instance is being created in the background. You can check its status using 'gcloud redis instances list --region=$REGION'"
