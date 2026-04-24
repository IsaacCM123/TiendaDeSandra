const items = document.querySelectorAll('.itemIMG');
    const radius = window.innerWidth < 600 ? 120 : 180; // responsive

    function positionItems() {
        items.forEach((item, i) => {
            const angle = (i / items.length) * (2 * Math.PI);

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            // retraso escalonado para animación suave
            setTimeout(() => {
                item.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`;
                item.style.opacity = 1;
            }, i * 120);
        });
    }

    // Espera a que cargue todo
    window.addEventListener('load', () => {
        setTimeout(positionItems, 500);
    });