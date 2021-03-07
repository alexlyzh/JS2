let txt = fetch('texttoreplace.txt')
    .then(response => response.text())
    .then(data => {
        let paragraph1 = document.createElement('p');
        paragraph1.innerText = `Исходный текст:\n\n${data}`;
        document.querySelector('body').insertAdjacentElement('beforeend', paragraph1);

        let regexp = /\B'/g
        let newTxt = data.replace(regexp,'"');
        let paragraph2 = document.createElement('p');
        paragraph2.innerText = `Обработанный текст:\n\n${newTxt}`;
        document.querySelector('body').insertAdjacentElement('beforeend', paragraph2);
    });