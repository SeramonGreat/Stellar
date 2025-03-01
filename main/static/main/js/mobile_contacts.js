document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-container");
    const shootingStarsContainer = document.getElementById("shooting-stars-container");

    // Создание звезд
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
    }

    // Создание падающих метеоритов
    for (let i = 0; i < 10; i++) {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.animationDelay = `${Math.random() * 10}s`;
        shootingStarsContainer.appendChild(shootingStar);
    }

    // Анимация появления элементов
    const header = document.querySelector('.header-text.neon');
    const contentBlocks = document.querySelectorAll('.content-block');

    // Анимация заголовка
    setTimeout(() => {
        header.style.animation = 'fadeInUp 1s ease-out forwards';
    }, 0);

    // Анимация блоков контента
    contentBlocks.forEach((block, index) => {
        setTimeout(() => {
            block.style.animation = 'fadeInUp 1s ease-out forwards';
        }, (index + 1) * 300);
    });
});