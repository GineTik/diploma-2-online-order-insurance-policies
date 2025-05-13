#!/bin/bash

# Build the Docker image
docker build -t ginetik/2-online-insurance-frontend:latest \
  --build-arg NEXT_PUBLIC_API_URL="https://2-online-insurance-backend-production.up.railway.app/" \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_Y2hhbXBpb24td29ybS00Ni5jbGVyay5hY2NvdW50cy5kZXYk" \
  --build-arg CLERK_SECRET_KEY="sk_test_N5stfagFQMm6gxJxg4nu7KvK6GZK1psZlXnetBIjjt" \
  ./

# Push the Docker image to Docker Hub
docker push ginetik/2-online-insurance-frontend:latest
