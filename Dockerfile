# Use official Bun Alpine image
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Copy only dependency files first for caching
COPY package.json bun.lockb ./

# Install dependencies with frozen lockfile
RUN bun install --frozen-lockfile

# Copy remaining source code
COPY . .

# Expose app port
EXPOSE 4000
