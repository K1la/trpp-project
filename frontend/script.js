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

    audioFileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileInfo.textContent = this.files[0].name;
            fileInfo.style.color = "#6c5ce7";
        } else {
            fileInfo.textContent = "Файл не выбран";
            fileInfo.style.color = "#666";
        }
    });

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const file = audioFileInput.files[0];
        
        if (!file) {
            showAlert('Пожалуйста, выберите аудиофайл', 'error');
            return;
        }
        
        if (!file.type.match('audio.*')) {
            showAlert('Пожалуйста, выберите аудиофайл (MP3, WAV и т.д.)', 'error');
            return;
        }
        
        loadingIndicator.style.display = 'block';
        resultsSection.style.display = 'none';

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loadingIndicator.style.display = 'none';
            if (data.error) throw new Error(data.error);
            displayResults(data);
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            showAlert(`Ошибка: ${error.message}`, 'error');
        });
    });

    function displayResults(data) {
        bpmResult.textContent = '--';
        keyResult.textContent = '--';
        resultsSection.style.display = 'block';
        
        animateValue(bpmResult, 0, data.bpm, 1000);
        keyResult.textContent = data.key;
        
        downloadBpmBtn.onclick = () => {
            const blob = new Blob([`BPM: ${data.bpm}`], {type: 'text/plain'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `bpm_${data.bpm}.txt`;
            a.click();
        };
        
        downloadKeyBtn.onclick = () => {
            const blob = new Blob([`Ключ: ${data.key}`], {type: 'text/plain'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `key_${data.key}.txt`;
            a.click();
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