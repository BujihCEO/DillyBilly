const input1 = document.querySelector('.input_1');
const input2 = document.querySelector('.input_2');
const createBtn = document.querySelector('.createBtn');



createBtn.addEventListener('click', () => {
    const produto = new Image();
    const arte = new Image();

    // Função para carregar imagem com Promise
    const loadImage = (inputFile, img) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Erro ao carregar a imagem'));
                img.src = reader.result;
            };
            reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
            reader.readAsDataURL(inputFile);
        });
    };

    // Garantir que ambos os arquivos estejam carregados
    if (input1.files[0] && input2.files[0]) {
        Promise.all([loadImage(input1.files[0], produto), loadImage(input2.files[0], arte)])
            .then(([imgProduto, imgArte]) => {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.height = imgProduto.height;
                canvas.width = imgProduto.width;
                canvas.style.width = "100%";
            
                ctx.drawImage(imgProduto, 0, 0);
                ctx.drawImage(imgArte, 0, 0);
                ctx.globalCompositeOperation = 'multiply';
                ctx.drawImage(imgProduto, 0, 0);
            
                var download = document.createElement('a');
                download.href = canvas.toDataURL('image/png'); 
                download.download = 'imagem.png'; 
                download.style.style = "display: block; max-width: 500px;";

                download.append(canvas);
                document.body.append(download);
            })
            .catch((error) => {
                console.error('Erro ao carregar as imagens:', error);
            });
    } else {
        alert('Por favor, selecione os arquivos antes de prosseguir.');
    }
});
