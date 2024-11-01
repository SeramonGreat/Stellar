document.addEventListener('DOMContentLoaded', function() {
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function handleResize() {
        if (isMobileDevice()) {
            aside.classList.remove('visible');
            alert("Сайт не предназначен для телефонов и тд, за это приносим свои извинения, если сайт покажется странным. Команда Stellar!");
        } else {
            aside.classList.add('visible');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    document.addEventListener('mousemove', function(event) {
        if (window.innerWidth <= 768 && event.clientX < 50) {
            aside.classList.add('visible');
        } else if (window.innerWidth <= 768) {
            aside.classList.remove('visible');
        }
    });
});