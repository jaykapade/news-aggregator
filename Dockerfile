# Use a slim Node.js image as the base
FROM node:18-alpine

# Set the working directory for the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies with npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses by default (can be changed in vite.config.js)
EXPOSE 300

# Start the development server
CMD ["npm", "run", "dev"]
