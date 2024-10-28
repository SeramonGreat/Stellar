document.addEventListener('DOMContentLoaded', function() {
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');

    function handleResize() {
        if (window.innerWidth <= 768) {
            aside.classList.remove('visible');
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