// const canvaBox = document.createElement();

// // var stage = new Konva.Stage({
// //     container: canvaBox,
// //     width: Math.min(769, Math.max(window.innerWidth)),
// //     height: window.innerHeight - 52,
// //     draggable: true,
// // });

const produtos = {
    'Principal': {
        url: 'Camiseta-Dobrada.png', 
        cores: [
            {nome: 'Branco', cor: '#fff'},
        ],
    },
    'Camiseta': {
        url: 'Camiseta.png', 
        cores: [
            {nome: 'Branco', cor: '#fff'},
            {nome: 'Preto', cor: '#343434'},
            {nome: 'Off-White', cor: '#FFFBEF'},
        ],
    },
    'Baby-Look': {
        url: 'Baby-Look.png',
        cores: [
            {nome: 'Branco', cor: '#fff'},
            {nome: 'Preto', cor: '#343434'},
        ],
    },
};

const stampColors = [
    {id:"Azul", c:"#4294C2"},
    {id:"Azul Escuro", c:"#3167A4"},
    {id:"Verde", c:"#48A594"},
    {id:"Verde Escuro", c:"#337050"},
    {id:"Laranja", c:"#FF4C42"},
    {id:"Rosa", c:"#FF7BC7"},
    {id:"Roxo", c:"#7352BF"},
]

var selected;

const buttonbox = document.createElement('div');
const input = document.createElement('input');
input.type = 'file';

const checkBoxWrap = document.createElement('div');
const checkBox = document.createElement('input');
checkBox.type = 'checkbox';
const checkBoxLabel = document.createElement('p');
checkBoxLabel.textContent = 'Não usar lista de cores';
checkBoxWrap.append(checkBox, checkBoxLabel);

document.body.append(buttonbox, checkBoxWrap, input);

Object.keys(produtos).forEach((name, i) => {
    var button = document.createElement('button');
    button.textContent = name;
    if (i == 0 ) {
        buttonbox.selected = button;
        button.classList.add('selected');
        selected = produtos[name];
        selected.name = name;
    }
    button.addEventListener('click', ()=> {
        if (buttonbox.selected === button) return
        buttonbox.selected.classList.remove('selected');
        buttonbox.selected = button;
        button.classList.add('selected');
        selected = produtos[name];
        selected.name = name;
    });
    buttonbox.append(button);
});

input.addEventListener('input', () => {
    const zip = new JSZip();
    var imgPr = new Image();
    imgPr.onload = () => {
        var canvasPr = document.createElement('canvas');
        var ctxPr = canvasPr.getContext('2d');
        canvasPr.width = imgPr.width;
        canvasPr.height = imgPr.height;

        var reader = new FileReader();
        reader.onload = () => {
            input.value = '';
            var estampa = new Image();
            estampa.onload = () => {
                var stampCanvas = document.createElement('canvas');
                var stampCtx = stampCanvas.getContext('2d');
                stampCanvas.width = estampa.width;
                stampCanvas.height = estampa.height;

                if (checkBox.checked) {
                    selected.cores.forEach((selectedColor, index) => {
                        ctxPr.save();
                        ctxPr.clearRect(0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.fillStyle = selectedColor.cor;
                        ctxPr.fillRect(0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.drawImage(estampa, 0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.globalCompositeOperation = 'destination-in';
                        ctxPr.drawImage(imgPr, 0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.globalCompositeOperation = 'destination-over';
                        ctxPr.fillStyle = '#ffffff';
                        ctxPr.fillRect(0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.filter = 'drop-shadow(0px 0px 10px rgb(0 0 0 / 50%))';
                        ctxPr.globalCompositeOperation = 'multiply';
                        ctxPr.drawImage(imgPr, 0, 0, canvasPr.width, canvasPr.height);
                        ctxPr.restore();
                        
                        const dataUrl = canvasPr.toDataURL();
                        zip.file(`${selectedColor.nome}.png`, dataUrl.split(',')[1], { base64: true });
                    });

                } else {
                    stampColors.forEach((colorGroup, index) => {
                        // if (selected.name == 'Principal' && !index == 0) {
                        //     return;
                        // };
                        const folder = zip.folder(`${colorGroup.id}`);
    
                        stampCtx.globalCompositeOperation = 'source-over';
                        stampCtx.clearRect(0, 0, stampCanvas.width, stampCanvas.height);
                        stampCtx.fillStyle = colorGroup.c;
                        stampCtx.fillRect(0, 0, stampCanvas.width, stampCanvas.height);
                        stampCtx.globalCompositeOperation = 'destination-in';
                        stampCtx.drawImage(estampa, 0, 0, stampCanvas.width, stampCanvas.height);
    
                        selected.cores.forEach(selectedColor=> {
                            ctxPr.save();
                            ctxPr.clearRect(0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.fillStyle = selectedColor.cor;
                            ctxPr.fillRect(0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.drawImage(stampCanvas, 0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.globalCompositeOperation = 'destination-in';
                            ctxPr.drawImage(imgPr, 0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.globalCompositeOperation = 'destination-over';
                            ctxPr.fillStyle = '#ffffff';
                            ctxPr.fillRect(0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.filter = 'drop-shadow(0px 0px 10px rgb(0 0 0 / 50%))';
                            ctxPr.globalCompositeOperation = 'multiply';
                            ctxPr.drawImage(imgPr, 0, 0, canvasPr.width, canvasPr.height);
                            ctxPr.restore();
    
                            const dataUrl = canvasPr.toDataURL();
                            folder.file(`${selectedColor.nome}.png`, dataUrl.split(',')[1], { base64: true });
                        });
                    });
                }

                zip.generateAsync({ type: 'blob' }).then((content) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(content);
                    a.download = `${selected.name}.zip`;
                    a.click();
                });
            };
            estampa.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    };
    imgPr.src = selected.url;
});
