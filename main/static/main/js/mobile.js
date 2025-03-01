document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-container");
    const shootingStarsContainer = document.getElementById("shooting-stars-container");
    const typingText = document.getElementById('typing-text');
    const codeContainer = document.getElementById('code-container');
    const chatContent = document.getElementById('chat-content');
    const skipButton = document.getElementById('skip-button');

    let isSkipped = false; // Флаг для отслеживания нажатия кнопки "Пропустить"
    let buttonsCreated = false; // Флаг для отслеживания создания кнопок

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

    // Анимация печати текста в заголовке
    const textToType = "Welcome To Stellar";
    let charIndex = 0;

    function typeNextCharacter() {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeNextCharacter, 50);
        } else {
            typingText.classList.add('cursor');
            setTimeout(() => {
                typingText.classList.remove('cursor');
            }, 1000);
        }
    }

    typeNextCharacter();

    // Генерация матрицы на мониторе
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
    const columns = Math.floor(codeContainer.offsetWidth / 10);

    function createMatrixColumn(index) {
        const column = document.createElement("div");
        column.className = "matrix-column";
        column.style.left = `${index * 20}px`;
        column.style.animationDuration = `${Math.random() * 2 + 1}s`;
        codeContainer.appendChild(column);

        const symbolCount = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < symbolCount; i++) {
            const symbol = document.createElement("span");
            symbol.textContent = characters[Math.floor(Math.random() * characters.length)];
            symbol.style.animationDelay = `${Math.random() * 2}s`;
            column.appendChild(symbol);
        }

        column.addEventListener("animationend", () => {
            column.remove();
            createMatrixColumn(index);
        });
    }

    for (let i = 0; i < columns; i++) {
        createMatrixColumn(i);
    }

    // Функция для печати текста с анимацией
    function typeText(element, text, speed, onComplete) {
        let charIndex = 0;

        function typeNextCharacter() {
            if (charIndex < text.length && !isSkipped) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextCharacter, speed);
            } else {
                if (onComplete) onComplete();
            }
        }

        typeNextCharacter();
    }

    // Функция для стирания текста с анимацией
    function eraseText(element, speed, onComplete) {
        let text = element.textContent;
        let length = text.length;

        function eraseNextCharacter() {
            if (length > 0 && !isSkipped) {
                element.textContent = text.substring(0, length - 1);
                length--;
                setTimeout(eraseNextCharacter, speed);
            } else {
                if (onComplete) onComplete();
            }
        }

        eraseNextCharacter();
    }

    // Функция для плавного исчезновения текста
    function fadeOutText(element, speed, onComplete) {
        element.style.transition = `opacity ${speed}ms ease`;
        element.style.opacity = '0';
        setTimeout(() => {
            if (onComplete) onComplete();
        }, speed);
    }

    // Функция для анимации смены отправителя
    function replaceSender(senderElement, newSender, speed, onComplete) {
        let charIndex = 0;

        function typeNextCharacter() {
            if (charIndex < newSender.length && !isSkipped) {
                senderElement.textContent = newSender.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeNextCharacter, speed);
            } else {
                if (onComplete) onComplete();
            }
        }

        // Сначала стираем текущий текст
        eraseText(senderElement, speed, () => {
            // Затем печатаем новый текст
            typeNextCharacter();
        });
    }

    // Функция для создания кнопок
    function createButtons() {
        if (buttonsCreated) return; // Если кнопки уже созданы, выходим
        buttonsCreated = true; // Устанавливаем флаг, что кнопки созданы

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const links = [
            { href: "/mobile/contacts", text: "Контакты" },
            { href: "/mobile/project", text: "Проект" },
            { href: "/mobile/support", text: "Поддержка" }
        ];

        links.forEach(link => {
            const btnWrapper = document.createElement('a');
            btnWrapper.href = link.href;
            btnWrapper.className = 'btn-wrapper';

            const btn = document.createElement('span');
            btn.className = 'btn btn-warning';
            btn.textContent = link.text;

            btnWrapper.appendChild(btn);
            buttonContainer.appendChild(btnWrapper);
        });

        chatContent.appendChild(buttonContainer);
    }

    // Основная функция для анимации чата
    async function startChatAnimation() {
        // Создаем элементы для чата
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

        // Первый текст
        await new Promise((resolve) => {
            typeText(textElement, "Приветствую, пользователь!", 50, resolve);
        });

        // Ждем 3 секунды
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Стираем первый текст
        await new Promise((resolve) => {
            eraseText(textElement, 20, resolve); // Ускоренное стирание
        });

        // Меняем отправителя на "SeramonGreat" с анимацией
        await new Promise((resolve) => {
            replaceSender(senderElement, "SeramonGreat", 50, resolve);
        });

        // Второй текст
        await new Promise((resolve) => {
            typeText(textElement, "Здравствуйте! Меня зовут SeramonGreat, и я — создатель сайта Stellar. С радостью отвечу на ваш вопрос о том, что такое Stellar.", 50, resolve);
        });

        // Ждем 3 секунды
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Стираем второй текст
        await new Promise((resolve) => {
            eraseText(textElement, 20, resolve); // Ускоренное стирание
        });

        // Третий текст (описание)
        const description = `
Stellar — это новая операционная система, разработанная для повышения производительности и удобства пользователей. Она сочетает высокую производительность благодаря оптимизированному ядру ⚡.
Современный интуитивно понятный графический интерфейс 🎨 и поддержку многозадачности 🔄 для работы с несколькими приложениями одновременно.

Ядро Stellar Aurora System 🛠️ обеспечивает стабильность и безопасность на высшем уровне.
Операционная система создаётся отечественными разработчиками 🇷🇺 с учётом потребностей пользователей.
Среди особенностей — поддержка ввода текста на множестве языков 🌍.
Непрерывное совершенствование системы 🔧.
Прозрачность и открытость в работе 🔍, а также внедрение инновационных технологий для удобства пользователей 🚀. Безопасность и конфиденциальность данных всегда в приоритете 🔒.

Мы стремимся к тому, чтобы каждый пользователь чувствовал себя уверенно и комфортно в цифровом мире с надёжной и качественной операционной системой. Вперёд к новым горизонтам с Stellar! ✨
        `;

        // Показываем кнопку "Пропустить" при начале печати описания
        skipButton.style.display = 'block';

        await new Promise((resolve) => {
            typeText(textElement, description.trim(), 50, resolve);
        });

        // Скрываем кнопку "Пропустить" после завершения анимации
        skipButton.style.display = 'none';

        // Ждем 3 секунды перед исчезновением третьего текста
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Плавное исчезновение третьего текста
        await new Promise((resolve) => {
            fadeOutText(textElement, 500, resolve);
        });

        // Удаляем текст и отправителя
        textElement.textContent = '';
        senderElement.textContent = '';

        // Четвертый текст
        const fourthText = "Однако этот сайт создан, чтобы помочь тебе или познакомить с нашим проектом. Выбор за тобой! Удачи, первооткрыватель!";
        await new Promise((resolve) => {
            typeText(textElement, fourthText, 50, resolve);
        });

        // Ждем 3 секунды перед исчезновением четвертого текста
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Плавное исчезновение четвертого текста
        await new Promise((resolve) => {
            fadeOutText(textElement, 500, resolve);
        });

        // Удаляем текст
        textElement.textContent = '';

        // Создаем кнопки
        createButtons();
    }

    // Запуск анимации чата
    startChatAnimation();

    // Обработчик для кнопки "Пропустить"
    skipButton.addEventListener('click', () => {
        isSkipped = true; // Устанавливаем флаг пропуска

        // Пропускаем анимацию (плавно исчезает третий текст и появляется четвертый)
        const textElement = chatContent.querySelector('.text');

        // Плавное исчезновение третьего текста
        fadeOutText(textElement, 500, () => {
            textElement.textContent = ''; // Очищаем текст
            textElement.style.opacity = '1'; // Возвращаем прозрачность

            // Четвертый текст
            const fourthText = "Однако этот сайт создан, чтобы помочь тебе или познакомить с нашим проектом. Выбор за тобой! Удачи, первооткрыватель!";
            isSkipped = false; // Сбрасываем флаг пропуска, чтобы анимация четвертого текста работала
            typeText(textElement, fourthText, 50, () => {
                skipButton.style.display = 'none'; // Скрываем кнопку "Пропустить"

                // Ждем 3 секунды перед исчезновением четвертого текста
                setTimeout(() => {
                    // Плавное исчезновение четвертого текста
                    fadeOutText(textElement, 500, () => {
                        textElement.textContent = ''; // Очищаем текст
                        textElement.style.opacity = '1'; // Возвращаем прозрачность

                        // Создаем кнопки
                        createButtons();
                    });
                }, 3000);
            });
        });
    });
});