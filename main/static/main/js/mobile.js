document.addEventListener("DOMContentLoaded", function() {
    // Основные элементы
    const modeSelection = document.getElementById("mode-selection");
    const mainContent = document.getElementById("main-content");
    const guestBtn = document.getElementById("guest-btn");
    const astronautBtn = document.getElementById("astronaut-btn");
    const typingTextContainer = document.getElementById("typing-text-container");
    const typingText = document.getElementById("typing-text");
    const chatContent = document.getElementById("chat-content");
    const codeContainer = document.getElementById("code-container");
    const chatButtons = document.getElementById("chat-buttons");

    // Инициализация звездного неба
    function initStars() {
        const starsContainer = document.getElementById("stars-container");
        const shootingStarsContainer = document.getElementById("shooting-stars-container");

        starsContainer.innerHTML = '';
        shootingStarsContainer.innerHTML = '';

        // Статичные звезды
        for (let i = 0; i < 300; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 2 + 1}s`;
            star.style.opacity = '0';
            starsContainer.appendChild(star);

            setTimeout(() => {
                star.style.transition = 'opacity 1.5s ease';
                star.style.opacity = '1';
            }, Math.random() * 1000);
        }

        // Падающие звезды
        for (let i = 0; i < 30; i++) {
            const shootingStar = document.createElement("div");
            shootingStar.className = "shooting-star";
            shootingStar.style.top = `${Math.random() * 100}%`;
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.animationDelay = `${Math.random() * 10}s`;
            shootingStarsContainer.appendChild(shootingStar);
        }
    }

    // Инициализация частиц для блока выбора режима
    function initParticles() {
        const container = document.getElementById("mode-selection");

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";

            particle.style.width = `${Math.random() * 5 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = '0';
            particle.style.transition = `all ${Math.random() * 10 + 5}s linear`;

            container.appendChild(particle);

            setTimeout(() => {
                particle.style.opacity = '0.3';
                particle.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            }, 100);
        }
    }

    // Инициализация матрицы
    function initMatrix() {
        codeContainer.innerHTML = '';
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const columns = Math.floor(codeContainer.offsetWidth / 20);

        function createColumn(index) {
            const col = document.createElement("div");
            col.className = "matrix-column";
            col.style.left = `${index * 20}px`;
            col.style.animationDuration = `${Math.random() * 5 + 3}s`;
            col.style.opacity = '0';
            codeContainer.appendChild(col);

            setTimeout(() => {
                col.style.transition = 'opacity 1s ease';
                col.style.opacity = '1';
            }, index * 100);

            const length = Math.floor(Math.random() * 15) + 5;
            for (let i = 0; i < length; i++) {
                const char = document.createElement("span");
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.animationDelay = `${Math.random() * 2}s`;
                char.style.opacity = '0';

                setTimeout(() => {
                    char.style.transition = 'opacity 0.5s ease';
                    char.style.opacity = '0.8';
                }, i * 50 + index * 30);

                col.appendChild(char);
            }

            col.addEventListener("animationend", function() {
                this.remove();
                createColumn(index);
            });
        }

        for (let i = 0; i < columns; i++) {
            setTimeout(() => createColumn(i), i * 150);
        }
    }

    // Анимация печати заголовка
    function initTypingAnimation() {
        typingText.textContent = '';
        typingTextContainer.style.display = 'block';
        typingTextContainer.style.opacity = '0';
        typingTextContainer.style.transition = 'opacity 0.8s ease';

        setTimeout(() => {
            typingTextContainer.style.opacity = '1';
        }, 100);

        const textToType = "Welcome To Stellar";
        let charIndex = 0;

        function typeNextCharacter() {
            if (charIndex < textToType.length) {
                const charSpan = document.createElement('span');
                charSpan.textContent = textToType.charAt(charIndex);
                charSpan.style.opacity = '0';
                charSpan.style.transition = 'opacity 0.3s ease';
                typingText.appendChild(charSpan);

                setTimeout(() => {
                    charSpan.style.opacity = '1';
                }, 50);

                charIndex++;
                setTimeout(typeNextCharacter, 120);
            } else {
                typingText.classList.add('cursor');
                setTimeout(() => {
                    typingText.classList.remove('cursor');
                }, 1000);
            }
        }

        setTimeout(typeNextCharacter, 300);
    }

    // Показать заголовок сразу (для режима космонавта)
    function showTitleImmediately() {
        typingText.textContent = "Welcome To Stellar";
        typingTextContainer.style.display = 'block';
        typingTextContainer.style.opacity = '0';

        typingText.innerHTML = '';
        const text = "Welcome To Stellar";
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text.charAt(i);
            charSpan.style.opacity = '0';
            charSpan.style.transition = `opacity 0.3s ease ${i * 50}ms`;
            typingText.appendChild(charSpan);
        }

        setTimeout(() => {
            typingTextContainer.style.transition = 'opacity 0.8s ease';
            typingTextContainer.style.opacity = '1';

            const chars = typingText.querySelectorAll('span');
            chars.forEach((char, index) => {
                setTimeout(() => {
                    char.style.opacity = '1';
                }, index * 50);
            });
        }, 300);
    }

    // Анимация чата
    async function startChatAnimation() {
        chatContent.innerHTML = '';
        chatButtons.style.display = 'none';

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        chatContent.appendChild(messageElement);

        const senderElement = document.createElement('div');
        senderElement.className = 'sender';
        senderElement.textContent = "???";
        messageElement.appendChild(senderElement);

        const textElement = document.createElement('div');
        textElement.className = 'text';
        messageElement.appendChild(textElement);

        await typeText(textElement, "Приветствую, пользователь!", 50);
        await delay(3000);
        await eraseText(textElement, 20);
        await replaceSender(senderElement, "SeramonGreat", 50);
        await typeText(textElement, "Здравствуйте! Меня зовут SeramonGreat, и я — создатель сайта Stellar.", 50);
        await delay(3000);
        await eraseText(textElement, 20);
        await typeText(textElement, "Stellar — это новая операционная система для повышения производительности.", 50);
        await delay(3000);
        await eraseText(textElement, 20);
        await typeText(textElement, "Этот сайт создан, чтобы помочь вам познакомиться с нашим проектом!", 50);
        await delay(3000);

        // Очищаем чат перед показом кнопок
        chatContent.innerHTML = '';

        // Показываем кнопки плавно
        chatButtons.style.display = 'flex';
        chatButtons.style.opacity = '0';
        chatButtons.style.transition = 'opacity 0.8s ease';

        setTimeout(() => {
            chatButtons.style.opacity = '1';
        }, 200);
    }

    // Вспомогательные функции
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeText(element, text, speed) {
        return new Promise((resolve) => {
            let charIndex = 0;
            element.textContent = '';

            function typeNextCharacter() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextCharacter, speed);
                } else {
                    resolve();
                }
            }

            typeNextCharacter();
        });
    }

    async function eraseText(element, speed) {
        return new Promise((resolve) => {
            let text = element.textContent;
            let length = text.length;

            function eraseNextCharacter() {
                if (length > 0) {
                    element.textContent = text.substring(0, length - 1);
                    length--;
                    setTimeout(eraseNextCharacter, speed);
                } else {
                    resolve();
                }
            }

            eraseNextCharacter();
        });
    }

    async function replaceSender(element, newText, speed) {
        await eraseText(element, speed);
        await typeText(element, newText, speed);
    }

    // Обработчики кнопок режимов
    function startNormalMode() {
        modeSelection.style.opacity = '0';
        modeSelection.style.pointerEvents = 'none';
        modeSelection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        modeSelection.style.transform = 'scale(0.9)';

        setTimeout(() => {
            modeSelection.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = '0';

            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease';
                mainContent.style.opacity = '1';

                initStars();
                initMatrix();
                initTypingAnimation();
                startChatAnimation();
            }, 100);
        }, 800);
    }

    function startAstronautMode() {
        modeSelection.style.opacity = '0';
        modeSelection.style.pointerEvents = 'none';
        modeSelection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        modeSelection.style.transform = 'scale(0.9)';

        setTimeout(() => {
            modeSelection.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = '0';

            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease';
                mainContent.style.opacity = '1';

                initStars();
                initMatrix();
                showTitleImmediately();
                chatContent.innerHTML = '';
                chatButtons.style.display = 'flex';
                chatButtons.style.opacity = '0';
                chatButtons.style.transition = 'opacity 0.8s ease';

                setTimeout(() => {
                    chatButtons.style.opacity = '1';
                }, 200);
            }, 100);
        }, 800);
    }

    // Обработчики кликов
    guestBtn.addEventListener('click', startNormalMode);
    astronautBtn.addEventListener('click', startAstronautMode);

    // Обработчики кнопок чата
    document.querySelectorAll('.chat-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            this.style.backgroundColor = '#8b00ff';
            this.style.color = 'white';
            this.style.borderColor = '#8b00ff';
            this.style.boxShadow = '0 0 10px #8b00ff, 0 0 20px #8b00ff';

            setTimeout(() => {
                window.location.href = url;
            }, 1000);
        });
    });

    // Инициализация при загрузке
    initStars();
    initParticles();
});