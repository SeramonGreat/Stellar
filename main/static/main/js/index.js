document.addEventListener("DOMContentLoaded", function() {
    NProgress.configure({
        showSpinner: true,
        color: '#8B00FF'
    });

    NProgress.start();

    const starsContainer = document.getElementById("stars-container");
    const shootingStarsContainer = document.getElementById("shooting-stars-container");

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

    setTimeout(function() {
        NProgress.done();
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';

        document.querySelectorAll('.fade-in, .fade-in-astronaut, .btn-wrapper').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 3000);
});