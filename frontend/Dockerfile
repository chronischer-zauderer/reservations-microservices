# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
# If a lockfile exists use `npm ci`, otherwise fall back to `npm install`
RUN if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
			npm ci; \
		else \
			npm install; \
		fi

COPY . .
# If project uses `src/pages` and a top-level `app/`, move `app` into `src/`
RUN if [ -d src/pages ] && [ -d app ]; then \
			mkdir -p src && mv app src/app; \
		fi
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
