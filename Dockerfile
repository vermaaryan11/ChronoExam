# ========================
# ChronoExam Backend Dockerfile
# ========================

# Use Node.js LTS Alpine for smaller image size
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker cache)
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the backend code
COPY app.js ./
COPY app.config.js ./
COPY server/ ./server/

# Expose backend port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000 || exit 1

# Start the backend server
CMD ["node", "app.js"]
