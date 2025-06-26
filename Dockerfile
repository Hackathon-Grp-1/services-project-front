FROM node:22 AS build
WORKDIR /app

COPY package*.json ./

RUN npm clean-install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Create custom nginx configuration
RUN echo 'server { \
    listen 3008; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3008
CMD ["nginx", "-g", "daemon off;"]
