const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url) => {
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                reject(xhr.readyState)
            }
            if (xhr.status !== 200) {
                reject(console.log(`Some error: ${xhr.status} - ${xhr.statusText}`));
            }
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
    })
}

class Products {
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData()
            .then(() => this._render());
    }

    calcSum() {
        return this.products.reduce((accum, item) => accum + item.price, 0);
    }

    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for (let product of data) {
                    this.products.push(new ProductItem(product));
                }
            });
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://picsum.photos/300/300?random=') {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `
        <div class="product-item">
            <img src="${this.img}${this.id}" alt="${this.id}">
            <div class="caption">
                <div>
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                </div>
                <button class="to-cart" data-id="${this.id}">Добавить в корзину</button>
            </div>
        </div>`
    }
}

class GeneralProduct {
    constructor(product) {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
    }
}

class Cart {
    // products = [ - массив с добавленными продуктами
    //     {CartItem}, - продукты
    //     ...
    // ]

    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
    }

    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for (let product of data) {
                    this.products.push(new GeneralProduct(product));
                }
            });
    }

    // render() {} - отрендерить верстку корзины и ее элементов

    addToCart(id) {
        this.products.push(new CartItem(id));
    }
    // show() - показать корзину
    // hide()
    // incrQuantity() - увеличивает количество продукта на 1 шт
    // decrQuantity() - уменьшает количество продукта на 1 шт
    // deleteSKU() - обнуляет количество продукта
    // get price() - считает цену всей корзины
}

class CartItem {
    title = '';
    price = 0;
    id = 0;
    rendered = false;

    constructor(id) {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
    }



    render() {
        this.rendered = true;
        return `
        <div class="cart__item">
            <div>
                <h4 class="title">${this.title}</h4>
                <p class="price">${this.price}</p>
            </div>
            <div>
                <p class="quantity">1</p>
                <button class="increase">+</button>
                <button class="decrease">-</button>
            </div>
        </div>`
    }
}

const list = new Products('.products');
const cart = new Cart('.cart');