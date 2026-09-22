# ---------- Stage 1: Build the Vite app ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm i

# Copy source code
COPY . .
ARG VITE_API_URL
# Build the app for production
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.27-alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
