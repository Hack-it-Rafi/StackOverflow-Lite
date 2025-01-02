# Use a base Node.js image with a lightweight Alpine variant
FROM node:alpine

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies in production mode
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the TypeScript code to JavaScript
RUN npm run build

# Expose port 5000 to make it accessible from outside the container
EXPOSE 5000

# Start the app using the build script's output in the dist directory
CMD ["node", "dist/server.js"]
