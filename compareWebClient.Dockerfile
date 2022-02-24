# front end build environment
FROM node:lts as frontend-build

WORKDIR /

# copy packge info
COPY compare_web_client/package.json ./
COPY compare_web_client/package-lock.json ./

# install package dependencies
RUN npm install

# copy front end code
COPY compare_web_client/src ./src
COPY compare_web_client/public ./public

# create prodcution build of application
RUN npm run-script build

# production environment
FROM nginx:alpine
COPY --from=frontend-build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]