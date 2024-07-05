# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application code
COPY . /app

# Start the React application
CMD ["npm", "start"]
