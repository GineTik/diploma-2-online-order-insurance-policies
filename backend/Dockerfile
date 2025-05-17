FROM node:20-alpine

WORKDIR /app

ARG MONGO_CONNECTION
ENV MONGO_CONNECTION=${MONGO_CONNECTION}

ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}

ARG CLERK_SECRET_KEY
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate --schema=./src/shared/prisma/schema.prisma
# RUN if [ -n "$MONGO_CONNECTION" ]; then npx prisma migrate deploy --schema=./src/shared/prisma/schema.prisma; fi

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
