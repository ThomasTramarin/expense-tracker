# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma

# Dependencies + Prisma
FROM base AS deps
RUN npm ci
RUN npx prisma generate

# Build stage
FROM deps AS build
COPY . .
RUN npm run build

# Development stage
FROM node:20-alpine AS development
WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production
WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]