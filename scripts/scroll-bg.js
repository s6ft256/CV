// Lightweight scroll-driven background switcher
// Maps page scroll position to a sequence of background images and crossfades between them.

(function() {
    const images = [
        'images/Images (1).jpg',
        'images/Images (2).jpg',
        'images/Images (3).jpg',
        'images/Images (4).jpg'
    ];

    const container = document.getElementById('scroll-bg');
    if (!container) return;
    const layerA = container.querySelector('.layer-a');
    const layerB = container.querySelector('.layer-b');

    // Preload images
    const cache = images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    let active = 0; // index of currently visible image
    // initialize
    layerA.style.backgroundImage = `url('${images[0]}')`;
    layerA.classList.add('visible');
    layerB.classList.remove('visible');

    function setImage(index) {
        index = Math.max(0, Math.min(images.length - 1, index));
        if (index === active) return;
        const incoming = (active === 0 ? layerB : layerA);
        const outgoing = (active === 0 ? layerA : layerB);

        incoming.style.backgroundImage = `url('${images[index]}')`;
        incoming.classList.add('visible');
        outgoing.classList.remove('visible');

        active = index;
    }

    // throttle scroll handler
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const scroll = Math.max(0, Math.min(window.scrollY, docH));
            const frac = docH > 0 ? scroll / docH : 0;
            // map fraction to image index
            const idx = Math.floor(frac * (images.length - 1) + 0.5);
            setImage(idx);
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // initial
    onScroll();
})();
