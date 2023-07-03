FROM nginx
MAINTAINER 胡丁文  admin@aiwanyun.cn
ADD dist /usr/share/nginx/html
RUN chown nginx:nginx -R /usr/share/nginx/html
EXPOSE 80
RUN echo 'build ui image successful!!'
