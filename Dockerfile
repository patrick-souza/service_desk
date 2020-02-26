FROM node:12-alpine as build-host
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
FROM nginx:1.17.8-alpine as prod
COPY --from=build-host /usr/src/app/build /usr/share/nginx/html
COPY --from=build-host /usr/src/app/Docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]