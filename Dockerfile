
FROM node:14-alpine

WORKDIR /app-api

# Add package file
COPY package.json yarn.lock ./

# Install deps
RUN yarn install --pure-lockfile

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN yarn build

# Expose port 3000
EXPOSE 3000

CMD yarn start