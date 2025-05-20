document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const audioFileInput = document.getElementById('audioFile');
    const fileInfo = document.getElementById('fileInfo');
    const loadingIndicator = document.querySelector('.loading');
    const resultsSection = document.getElementById('resultsSection');
    const bpmResult = document.getElementById('bpmResult');
    const keyResult = document.getElementById('keyResult');
    const downloadBpmBtn = document.getElementById('downloadBpm');
    const downloadKeyBtn = document.getElementById('downloadKey');

    // Моковые данные для демонстрации
    const mockResponse = {
        bpm: 128,
        key: "C Major",
        bpmDataUrl: "#",
        keyDataUrl: "#"
    };

    // Отслеживание выбора файла
    audioFileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileInfo.textContent = this.files[0].name;
            fileInfo.style.color = "#6c5ce7";
        } else {
            fileInfo.textContent = "Файл не выбран";
            fileInfo.style.color = "#666";
        }
    });

    // Обработка отправки формы
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const file = audioFileInput.files[0];
        if (!file) {
            showAlert('Пожалуйста, выберите аудиофайл', 'error');
            return;
        }
        
        // Проверка типа файла
        if (!file.type.match('audio.*')) {
            showAlert('Пожалуйста, выберите аудиофайл (MP3, WAV и т.д.)', 'error');
            return;
        }
        
        // Показываем индикатор загрузки
        loadingIndicator.style.display = 'block';
        resultsSection.style.display = 'none';
        
        // Имитация анализа (в реальном приложении здесь будет запрос к бэкенду)
        setTimeout(() => {
            processFile(file);
        }, 2000);
    });

    function processFile(file) {
        // Здесь будет реальная обработка файла
        // Пока используем моковые данные
        
        // Скрываем индикатор загрузки
        loadingIndicator.style.display = 'none';
        
        // Показываем результаты
        displayResults(mockResponse);
    }

    function displayResults(data) {
        // Анимация появления результатов
        bpmResult.textContent = '--';
        keyResult.textContent = '--';
        
        resultsSection.style.display = 'block';
        
        // Анимация счёта для BPM
        animateValue(bpmResult, 0, data.bpm, 1000);
        keyResult.textContent = data.key;
        
        // Настройка кнопок скачивания
        downloadBpmBtn.onclick = () => {
            showAlert(`Данные BPM (${data.bpm}) готовы к скачиванию`, 'success');
            // window.location.href = data.bpmDataUrl;
        };
        
        downloadKeyBtn.onclick = () => {
            showAlert(`Данные тональности (${data.key}) готовы к скачиванию`, 'success');
            // window.location.href = data.keyDataUrl;
        };
    }

    // Вспомогательные функции
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    }
});