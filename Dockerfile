FROM node:20-alpine AS runner
WORKDIR /app

# Copiar los artefactos standalone generados localmente
COPY .next/standalone ./
COPY public ./public
COPY .next/static ./.next/static

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
