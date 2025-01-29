# Stage 1: Build the application with dependencies
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (this stage will have all the dependencies including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Create the production image with minimal layers
FROM node:18-alpine

# Set working directory for production container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage (excluding dev dependencies)
COPY --from=build /usr/src/app ./

# Expose the app's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]