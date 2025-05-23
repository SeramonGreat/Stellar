{% load static %}
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stellar - Система Новых Возможностей!</title>
    <meta name="description" content="Stellar - это новая операционная система">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="{% static 'main/css/main.css' %}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.5.2/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css">
    <link rel="icon" href="{% static 'main/image/Logo.png' %}" type="image/png">

    <style>
        /* Стили для кастомного курсора */
        .custom-cursor {
            position: fixed;
            width: 24px;
            height: 24px;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%238B00FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="%238B00FF" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>') no-repeat center center;
            filter: drop-shadow(0 0 5px #8B00FF);
        }

        .cursor-trail {
            position: fixed;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 0, 255, 0.7) 0%, rgba(139, 0, 255, 0) 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }

        .cursor-click {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid #8B00FF;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            animation: clickEffect 0.6s ease-out;
        }

        @keyframes clickEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }

        /* Остальные ваши стили */
        aside ul li {
            position: relative;
        }

        aside ul li::after {
            content: attr(data-tooltip);
            position: absolute;
            top: 50%;
            left: calc(100% + 10px);
            transform: translateY(-50%);
            background-color: #8B00FF;
            color: #ffffff;
            padding: 5px 10px;
            border-radius: 5px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            white-space: nowrap;
            z-index: 1001;
        }

        aside ul li:hover::after {
            opacity: 1;
            visibility: visible;
        }

        @media (max-width: 768px) {
            aside {
                position: absolute;
                left: -100%;
                transition: left 0.3s ease;
            }

            aside.visible {
                left: 0;
            }

            main {
                width: 100%;
            }
        }

        .notification-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #8B00FF;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 16px;
            z-index: 1002;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            opacity: 0;
            visibility: hidden;
        }

        .notification-banner.visible {
            opacity: 1;
            visibility: visible;
        }

        .notification-banner p {
            margin: 5px 0;
        }

        .notification-banner .instruction {
            font-weight: bold;
            margin-top: 10px;
        }

        body {
            cursor: none;
        }
    </style>
</head>
<body>
    <!-- Кастомный курсор -->
    <div class="custom-cursor"></div>

    <!-- Основное содержимое -->
    <div id="content">
        <aside>
            <div style="text-align: center;">
                <img src="{% static 'main/image/LogoPower.png' %}" alt="Логотип" class="logo-animation" style="width: 200%; margin-left: -50%; margin-top: -10px;">
            </div>
            <ul>
                <a href="{% url 'Home' %}"><li data-tooltip="Главная"><i class="fa-solid fa-house fa-2x"></i></li></a>
                <!-- Остальные пункты меню -->
            </ul>
        </aside>
        <main>
            {% block content %}
            {% endblock %}
        </main>
    </div>

    <div id="notification-banner" class="notification-banner">
        <p id="notification-text">Если объекты не корректно отображаются...</p>
        <p class="instruction">Как изменить масштаб: Настройки -> Масштаб</p>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script>
        // Кастомный курсор
        const cursor = document.querySelector('.custom-cursor');
        const links = document.querySelectorAll('a, button, [data-tooltip]');
        
        // Создаем следы курсора
        const trails = [];
        const trailCount = 8;
        
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push({
                element: trail,
                x: 0,
                y: 0,
                delay: (i + 1) * 0.05
            });
        }
        
        let mouseX = 0, mouseY = 0;
        let posX = 0, posY = 0;
        const speed = 0.2;
        
        function updateCursor() {
            posX += (mouseX - posX) * speed;
            posY += (mouseY - posY) * speed;
            
            cursor.style.left = posX + 'px';
            cursor.style.top = posY + 'px';
            
            trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.x += (mouseX - trail.x) * speed;
                    trail.y += (mouseY - trail.y) * speed;
                    
                    trail.element.style.left = trail.x + 'px';
                    trail.element.style.top = trail.y + 'px';
                    trail.element.style.transform = `translate(-50%, -50%) scale(${1 - index/trailCount*0.7})`;
                    trail.element.style.opacity = 1 - index/trailCount*0.8;
                }, index * 20);
            });
            
            requestAnimationFrame(updateCursor);
        }
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Эффекты при наведении
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
        
        // Эффект при клике
        document.addEventListener('click', (e) => {
            const clickEffect = document.createElement('div');
            clickEffect.className = 'cursor-click';
            clickEffect.style.left = e.clientX + 'px';
            clickEffect.style.top = e.clientY + 'px';
            document.body.appendChild(clickEffect);
            
            setTimeout(() => {
                clickEffect.remove();
            }, 600);
        });
        
        // Остальной ваш JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Ваши существующие анимации
            updateCursor();
        });
    </script>
</body>
</html>