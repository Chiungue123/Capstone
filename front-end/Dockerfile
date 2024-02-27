# Step 1: Use an official Node image to build the project
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project for Development
# RUN npm run build

# Build the project for production
RUN npm run build -- --configuration=production

# Step 2: Use an Nginx image to serve the project
FROM nginx:alpine

# Copy the built project from the previous stage
#COPY --from=build /app/dist/front-end/ /usr/share/nginx/html/
COPY --from=build /app/dist/front-end/browser/ /usr/share/nginx/html/

# This nginx configuration file was created to handle Angular's routing, previously all links were returning 404
# After setting up Nginx in your Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]