(() => {
    const target = document.querySelector('.product-section');
    if (target) {
        const img = new Image();
        img.onload = () => {
            const box = document.createElement('div');
            box.style = `width: 100%; padding: 10px; box-sizing: border-box; display: flex; justify-content: center;`;
            img.style = 'max-width: 100%;';
            box.append(img);
            target.parentNode.insertBefore(box, target);
        };
        img.src = 'https://montink.s3.amazonaws.com/produto_imagens/258943/phpsJbPpm.png';
    }
})();
