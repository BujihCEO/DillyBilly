const stampColors = [
    {id:"Azul", c:"#4294C2"},
    {id:"Azul Escuro", c:"#3167A4"},
    {id:"Verde", c:"#48A594"},
    {id:"Verde Escuro", c:"#337050"},
    {id:"Laranja", c:"#FF4C42"},
    {id:"Rosa", c:"#FF7BC7"},
    {id:"Roxo", c:"#7352BF"},
]

function start(input) {
    var zip = new JSZip();
    var reader = new FileReader();
    reader.onload = () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = ()=> {
            canvas.height = img.height;
            canvas.width = img.width;
            stampColors.forEach(color => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.drawImage(img, 0, 0);
                ctx.globalCompositeOperation = 'source-in';
                ctx.fillStyle = color.c;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();

                var dataUrl = canvas.toDataURL();
                zip.file(`${color.id}.png`, dataUrl.split(',')[1], { base64: true });
            });
            zip.generateAsync({ type: 'blob' }).then((content) => {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = `Estampa.zip`;
                a.click();
            });
            input.value = '';
        };
        img.src = reader.result;
    }
    reader.readAsDataURL(input.files[0]);
}
