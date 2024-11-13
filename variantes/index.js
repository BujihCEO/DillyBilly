/// REVISAR //
// const urlAtual = window.location.pathname.split('.')[0];
// let urlId = urlAtual.split('-').pop();
// const lastPath = urlAtual.split('/').pop();
// var ss = urlId.slice(0, (urlAtual.split('/').pop()).lastIndexOf('-'));
// console.log(lastPath);
const urlPr = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('-'));
const folderLocation = `https://bujihceo.github.io/dillyBilly/produtos${urlPr}`;

console.log(`${folderLocation}/exemplo.png`);
///////////////////

(()=> {
    import(`${folderLocation}/variantes.js`)
    .then(modulo => {
        // const style = document.createElement("style");
        // style.textContent = `
        // .modelsWrap {
        //     display: flex;
        //     flex-wrap: wrap;
        //     font-size: 1.1rem;
        //     margin: 0 0 1rem;
        //     background: #ededed;
        //     padding: 5px;
        //     border-radius: 10px;
        //     justify-content: center;
        // }
        // .modelsWrap > * {margin: 0;}
        // .modelsWrap > div {
        //     display: flex;
        //     width: 100%;
        //     overflow: auto;
        //     justify-content: space-around;
        // }
        // .modelsWrap > div > a { 
        //     display: flex;
        //     flex-direction: column;
        //     align-items: center;
        //     border: 2px solid black;
        //     border-radius: 1rem;
        //     padding: 0.5rem;
        //     margin: 0.5rem;
        //     color: black;
        //     white-space: nowrap;
        // }
        // .modelsWrap > div > a > div {
        //     display: flex;
        //     height: 3rem;
        //     min-width: 3rem;
        // }
        // .otherColorsBox { 
        //     overflow: auto; 
        //     margin: 1rem 0; 
        // }
        // .otherColorsBox > p { 
        //     font-size: 1.2rem; 
        //     text-align: center; 
        //     margin-bottom: 0.5rem; 
        // }
        // .otherColorsBox > div { 
        //     display: flex;
        //     height: 100px;
        //     width: 100%;
        //     overflow-x: auto;
        // }
        // .otherColorsBox > div > a { 
        //     height: 100%;
        //     aspect-ratio: 1 / 1;
        //     border-radius: 12px;
        //     border: 1px solid rgba(0, 0, 0, 0.125);
        //     background: #fffff0;
        //     margin: 0 0.5rem;
        //     box-sizing: border-box;
        // }
        // .otherColorsBox > div > a > div {
        //     width: 100%;
        //     height: 100%;
        // }`;
        // document.body.append(style);
        const v = Object.entries(modulo.variantes);
        let actualPr;
        for (const [name, vari] of v) {
            for (const vItem of vari) {
                if (vItem.id === urlId) {
                    actualPr = { name: name, ...vItem };
                    break;
                }
            }
            if (actualPr !== null) {
                break;
            }
        }
        
        if(v.length > 1) {
            const colorsBox = document.createElement('div');
            colorsBox.className = 'otherColorsBox';
            const colorsBoxtittle = document.createElement('p');
            colorsBoxtittle.textContent = 'Em outras cores';
            const colorSlider = document.createElement('div');
        
            const modelsBox = document.createElement('div');
            modelsBox.className = 'modelsWrap';
            const tittle = document.createElement('p');
            tittle.textContent = 'Outros modelos:'
            const slider = document.createElement('div');
        
            v.forEach(([name, vari]) => {
                if (name == actualPr.name) {
                    vari.forEach(v => {
                        if (v.c === actualPr.c) return;
                        var link = document.createElement('a');
                        link.href = urlAtual.replace(urlId, v.id);
                        var icon = document.createElement('div');
                        icon.style.mask = `url(${folderLocation}/exemplo.png) center / contain`;
                        icon.style.background = v.c;
                        link.append(icon);
                        colorSlider.append(link);
                    });
                } else {
                    var link = document.createElement('a');
                    vari.forEach(v => {
                        if (v.c === actualPr.c) {
                            link.href = urlAtual.replace(urlId, v.id);
                        }
                    });
                    
                    var icon = document.createElement('div');
                    icon.style.background = `url(https://bujihceo.github.io/DillyBilly/assets/icon-${name}.svg) center / contain no-repeat`;
                    
                    var variName = document.createElement('p');
                    variName.textContent = name;
        
                    link.append(icon, variName);
                    slider.append(link);
                }
            });
            colorsBox.append(colorsBoxtittle, colorSlider);
            modelsBox.append(tittle, slider);
            
            ////            ////        ////
            if (document.querySelector('.product-detail-img-col')) {
                var target = document.querySelector('.product-detail-img-col');
                target.append(colorsBox);
            } else {
                document.body.append(colorsBox);
            }
        
            if (document.querySelector('#product_form')) {
                var target = document.querySelector('#product_form');
                target.insertBefore(modelsBox, target.children[0]);
            } else {
                document.body.append(modelsBox);
            }
            ////            ///         ///
        }
    })
    .catch(error => {
        console.error('Sem varieantes');
    });
})();

// setTimeout(() => {
//     console.log('top boy');
// }, 2000);

//////////
