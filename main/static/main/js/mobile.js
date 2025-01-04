document.addEventListener("DOMContentLoaded", function() {
    const starsContainer = document.getElementById("stars-container");
    const shootingStarsContainer = document.getElementById("shooting-stars-container");
    const overlay = document.querySelector('.overlay');
    const typingTextContainer = document.getElementById('typing-text-container');
    const typingText = document.getElementById('typing-text');
    const codeContainer = document.getElementById('code-container');
    const chatContent = document.getElementById('chat-content');

    // Генерация звезд и метеоров
    for (let i = 0; i < 300; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < 30; i++) {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.animationDelay = `${Math.random() * 10}s`;
        shootingStarsContainer.appendChild(shootingStar);
    }

    // Анимация печати текста
    const textToType = "Welcome to Stellar!";
    let charIndex = 0;

    function typeNextCharacter() {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeNextCharacter, 100); // Задержка между символами
        } else {
            // Удаляем последний символ
            typingText.textContent = textToType.slice(0, -1);
        }
    }

    // Запуск анимации
    typeNextCharacter();

    // Генерация матрицы на мониторе
    function generateBinaryLine() {
        let binaryLine = '';
        for (let i = 0; i < 35; i++) {
            binaryLine += Math.random() > 0.5 ? '1' : '0';
        }
        return binaryLine;
    }

    function addBinaryLines() {
        const binaryLine = document.createElement('div');
        binaryLine.textContent = generateBinaryLine();
        codeContainer.appendChild(binaryLine);
        codeContainer.scrollTop = codeContainer.scrollHeight;
    }

    setInterval(addBinaryLines, 100);

    // Добавление сообщения с анимацией печати
    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        chatContent.appendChild(messageElement);

        const senderElement = document.createElement('div');
        senderElement.className = 'sender';
        senderElement.textContent = sender;
        messageElement.appendChild(senderElement);

        const textElement = document.createElement('div');
        textElement.className = 'text';
        textElement.textContent = text;
        messageElement.appendChild(textElement);
    }

    // Пример вызова сообщения
    setTimeout(() => {
        addMessage(">>>", "Приветствую, пользователь!");
    }, 2000);
});