#!/bin/bash

# Set your storage account name and container name
STORAGE_ACCOUNT_NAME="avy1013"
CONTAINER_NAME="image"
FOLDER_PATH="images"

# Simple loop through images
for IMAGE in $FOLDER_PATH/*; do
    if [ -f "$IMAGE" ]; then
        # Get filename
        IMAGE_NAME=$(basename "$IMAGE")
        
        # Upload image
        echo "Uploading $IMAGE_NAME..."
        az storage blob upload \
            --account-name "$STORAGE_ACCOUNT_NAME" \
            --container-name "$CONTAINER_NAME" \
            --name "$IMAGE_NAME" \
            --file "$IMAGE" 

        # Get and show URL
        IMAGE_URL=$(az storage blob url \
            --account-name "$STORAGE_ACCOUNT_NAME" \
            --container-name "$CONTAINER_NAME" \
            --name "$IMAGE_NAME" )
    
        echo "URL: $IMAGE_URL"
    fi
done