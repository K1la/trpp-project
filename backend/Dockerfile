FROM python:3.10-slim

# Установка системных зависимостей и обновление CA-сертификатов
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libsndfile1 \
    ffmpeg \
    libavcodec-extra \
    && rm -rf /var/lib/apt/lists/*
    # \
    #&& update-ca-certificates

WORKDIR /app

# Копирование requirements.txt и установка пакетов через зеркало
COPY requirements.txt .
RUN pip install --no-cache-dir \
    --trusted-host pypi.tuna.tsinghua.edu.cn \
    --index-url https://pypi.tuna.tsinghua.edu.cn/simple \
    -r requirements.txt

# Копирование исходного кода
COPY . .
RUN mkdir -p uploads

ENV FLASK_APP=server.py
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]