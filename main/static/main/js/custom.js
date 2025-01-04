document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-animation');
    const buttons = document.querySelectorAll('.button-animation');

    gsap.from(logo, {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power2.out"
    });

    buttons.forEach((button, index) => {
        gsap.from(button, {
            opacity: 0,
            x: -100,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.3
        });

        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    const notificationBanner = document.getElementById('notification-banner');
    const notificationText = document.getElementById('notification-text');
    const recommendedScale = document.getElementById('recommended-scale');

    function checkDisplayScale() {
        const scale = window.devicePixelRatio || 1;
        let recommendedScaleValue = '150%';
        let notificationMessage = '';

        if (scale === 1.25) {
            recommendedScaleValue = '125%';
            notificationMessage = 'Если объекты не корректно отображаются, зайдите в настройки браузера и измените масштаб с 100% на 125%. Приносим свои извинения! Команда Stellar!';
        } else if (scale === 1.75) {
            recommendedScaleValue = '80%';
            notificationMessage = 'Если объекты не корректно отображаются, зайдите в настройки браузера и измените масштаб с 100% на 80%. Приносим свои извинения! Команда Stellar!';
        } else if (scale === 1) {
            recommendedScaleValue = '100%';
            notificationMessage = 'Если объекты не корректно отображаются, зайдите в настройки браузера и измените масштаб с 100% на 150%. Приносим свои извинения! Команда Stellar!';
        }

        recommendedScale.textContent = recommendedScaleValue;
        notificationText.textContent = notificationMessage;

        if (scale === 1 || scale === 1.25 || scale === 1.75) {
            notificationBanner.classList.add('visible');
        } else {
            notificationBanner.classList.remove('visible');
        }
    }

    checkDisplayScale();
    window.addEventListener('resize', checkDisplayScale);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault();
    }
});

function setFavicon() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.querySelector('link[rel="icon"]');

    if (isDarkMode) {
        favicon.href = "{% static 'main/image/StellarLogo.png' %}";
    } else {
        favicon.href = "{% static 'main/image/StellarLogo2.png' %}";
    }
}

document.addEventListener('DOMContentLoaded', setFavicon);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

const aside = document.querySelector('aside');
const main = document.querySelector('main');

document.addEventListener('mousemove', function(event) {
    if (window.innerWidth <= 768 && event.clientX < 50) {
        aside.classList.add('visible');
    } else if (window.innerWidth <= 768) {
        aside.classList.remove('visible');
    }
});