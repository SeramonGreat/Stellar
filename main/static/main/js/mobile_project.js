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

    // Обработка нажатия на кнопку
    const actionButton = document.getElementById("action-button");
    actionButton.addEventListener("click", function () {
        // Анимация нажатия
        this.classList.add("active");

        // Задержка перед переходом по ссылке
        setTimeout(() => {
            // Переход по ссылке
            window.location.href = "https://github.com/SpaceSoftStellar/Stellar-OS-Code";
        }, 1000); // Задержка 1 секунда
    });
});