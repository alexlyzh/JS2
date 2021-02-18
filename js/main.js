const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 }
];

const renderProduct = (title = 'Заголовок', id = Math.random(), price = Math.random().toString()) => {
    return `
        <figure class="product-item">
            <img src="https://picsum.photos/250/250?random=${id}" alt="${id}">
            <figcaption>
                <div>
                    <h3>${title}</h3>
                    <p>${price}</p>
                </div>
                <button class="to-cart">Добавить в корзину</button>
            </figcaption>
        </figure>
    `;
};

const render = (products) => {
    // Как можно упростить запись функции?
    // Сначала получали с помощью .map массив из массива products и записывали его в переменную, потом присваивали эту переменную в innerHTML, но можно обойтись без записи массива в переменную:
    document.querySelector('.products').innerHTML = products.map(item => renderProduct(item.title, item.id, item.price)).join(''); // Почему после продуктов выводится запятая? Запятая - это разделитель между элементами массива. Нужно "склеить" элементы с помощью .join.
};

render(data);