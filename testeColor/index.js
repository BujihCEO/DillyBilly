const picker = document.querySelector('.picker');
const input = document.querySelector('.input');
const canvaBox = document.querySelector('.canvaBox');

jscolor.presets.default = {
    width: 600, height:300, sliderSize: 15
};

input.addEventListener('input', ()=> {
    var reader = new FileReader();
    reader.onload = () => {
        var img = new Image();
        img.onload = ()=> {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.save();

            function create() {
                var color = picker.jscolor.toHEXString();
                ctx.fillStyle = color;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'multiply';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.restore();
                canvaBox.replaceChildren(canvas);
            }
            create();

            picker.oninput = ()=> {
                create();
            }

        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
});

window.addEventListener('resize', ()=> {
    picker.jscolor.width = Math.min(460, Math.max(window.innerWidth - 57));
});