
FROM node:20-alpine

USER root

# Update package list and install some tools
RUN apk update && apk add jq

# Clean up cache after packages installation
RUN rm -rf /var/cache/apk/*
