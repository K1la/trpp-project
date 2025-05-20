# Используем легкий образ nginx на базе Alpine
FROM nginx:alpine

# Удаляем дефолтные файлы nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем файлы проекта в рабочую директорию nginx
COPY . /usr/share/nginx/html

# Открываем порт 80 для веб-доступа
EXPOSE 80

# Запускаем nginx в foreground режиме
CMD ["nginx", "-g", "daemon off;"]