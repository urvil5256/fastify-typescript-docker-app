# Use an official Node.js LTS (Long Term Support) version as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install Node.js dependencies
RUN npm install

# Build TypeScript to JavaScript (assuming you have a build script in package.json)
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["npm", "start"]
