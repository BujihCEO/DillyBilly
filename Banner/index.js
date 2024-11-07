const frStyle = document.createElement("link");
Object.assign(frStyle, {rel: "stylesheet", href: "index.css", type: "text/css"});
document.head.append(frStyle);

const frTarget = document.querySelector('.product-section');
const frButton = document.createElement('button');
frButton.className = 'frButton';
frButton.innerHTML = '<p><strong>&#128525 FRETE GRÁTIS &#128525</strong></P><p>clique para ver regras</p>';
const frPopup = document.createElement('div');
frPopup.className = 'frPopup hidden';
frPopup.show = false;
const closeFrPopup = document.createElement('button');
const frImgBox = document.createElement('div');
const frImg = new Image();
frImg.src = 'https://montink.s3.amazonaws.com/produto_imagens/258943/phpHhmsO3.png';
frImgBox.append(frImg, closeFrPopup);
frPopup.append(frImgBox);

frButton.onclick = ()=> {
    if (frPopup.show == true) {
        frPopup.classList.add('hidden');
        frPopup.show = false;
    } else {
        frPopup.classList.remove('hidden');
        frPopup.show = true;
    }
};

frPopup.onclick = ()=> {
    frPopup.classList.add('hidden');
    frPopup.show = false;
}

if (frTarget) {

} else {
    document.body.append(frButton);
}

document.body.append(frPopup);