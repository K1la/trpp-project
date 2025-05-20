# MusicLab - Анализатор аудиофайлов

Веб-приложение для определения темпа (BPM) и тональности аудиотреков. 
Проект включает фронтенд на HTML/CSS/JS и бэкенд на Python с использованием Flask и Librosa.

## Особенности
- Загрузка аудиофайлов (MP3, WAV)
- Анализ BPM с анимацией
- Определение тональности
- Скачивание результатов
- Адаптивный дизайн

## Технологии
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Backend**: 
  - Python 3.10
  - Flask 3.0.2
  - Librosa 0.10.1
  - SciPy 1.10.1
- **Инфраструктура**:
  - Docker

## Установка

### Требования
- Docker 20.10+
- Docker Compose 2.20+

### Запуск через Docker
1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/musiclab.git
cd musiclab
```
2. Соберите и запустите контейнеры:
```bash
docker-compose up --build
```

3. Приложение будет доступно:

Frontend: http://localhost:8080

Backend API: http://localhost:5000