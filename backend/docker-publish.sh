#!/bin/bash

docker build -t ginetik/2-online-insurance-backend:latest \
    --build-arg MONGO_CONNECTION="mongodb+srv://denisshevchukofficial:Sr9CxBKb7oyK2wI8@cluster-0.gwnlvic.mongodb.net/insurrance-policies?retryWrites=true&w=majority&appName=cluster-0&authSource=admin" \
    --build-arg CLERK_PUBLISHABLE_KEY=pk_test_Y2hhbXBpb24td29ybS00Ni5jbGVyay5hY2NvdW50cy5kZXYk \
    --build-arg CLERK_SECRET_KEY=sk_test_N5stfagFQMm6gxJxg4nu7KvK6GZK1psZlXnetBIjjt \
    ./

docker push ginetik/2-online-insurance-backend:latest