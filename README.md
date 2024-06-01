# Newslify App: A news aggregator app

A news aggregator platform, that takes data from [newsApi.org](https://www.thenewsapi.com/documentation), [newsApi.org](https://newsapi.org/docs), [The Guardian](https://open-platform.theguardian.com/documentation/) and [The Newyork times](https://developer.nytimes.com/docs/articlesearch-product/1/overview). With user preference selection, infinite loading and filters.

## Getting Started Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jaykapade/news-aggregator.git
   ```

2. **Install Dependencies**

   ```bash
   cd project-folder
   npm install
   ```

3. **Run Development Server**

   ```bash
    npm run dev
   ```

## Building for Production

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Serve the Production Build**

   ```bash
   cd project-folder
   npm install
   ```

   This will serve the production build locally for testing.

## Building the Docker Image

1. **Use the Docker image in root directory**

   ```Dockerfile
   # Use a slim Node.js image as the base
   FROM node:18-alpine

    # Set the working directory for the container
    WORKDIR /app

    # Copy package.json and package-lock.json for dependency installation
    COPY package\*.json ./

    # Install dependencies with npm
    RUN npm install

    # Copy the rest of the application code
    COPY . .

    # Expose the port configured in vite.config.js
    EXPOSE 3000

    # Start the development server
    CMD ["npm", "run", "dev"]
   ```

2. **Build the Image**

   ```bash
   docker build -t my-react-vite-image .
   ```

3. **Run the Container**

   ```bash
   docker run -d -p 3000:3000 --name react-vite-container react-vite-image
   ```
