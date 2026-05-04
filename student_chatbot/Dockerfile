# ─────────────────────────────────────────
# STAGE 1: Install dependencies
# ─────────────────────────────────────────
FROM node:20-alpine AS deps

# Install compatibility libraries for Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first (layer caching)
COPY package.json package-lock.json* ./

# Clean install — no devDependencies in prod
RUN npm ci


# ─────────────────────────────────────────
# STAGE 2: Build the Next.js app
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy entire project
COPY . .

# Dummy env values so Next.js build doesn't fail
# Real values will be injected at runtime
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the app
RUN npm run build


# ─────────────────────────────────────────
# STAGE 3: Production runtime (smallest image)
# ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what's needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["node", "server.js"]
