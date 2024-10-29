# Dockerfile in user-list-backend
FROM node:20
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Generate Prisma client and run migration and seed
RUN npx prisma generate
RUN npx prisma migrate deploy
# RUN npx ts-node prisma/seed.ts  
# Run the seed script

EXPOSE 3303
CMD ["npm", "run", "start:dev"]
