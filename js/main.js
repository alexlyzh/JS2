const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url) => {
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
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
            .then(() => this._render())
            .then(() => {
                document.querySelectorAll('.to-cart').forEach(button => {
                    button.addEventListener('click', event => {
                        let id = event.target.getAttribute('data-id');
                        let title = event.target.getAttribute('data-title');
                        let price = event.target.getAttribute('data-price');
                        cart.add(id, title, price);
                    });
                });
            });
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
                <button class="to-cart" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}">Добавить в корзину</button>
            </div>
        </div>`
    }
}

class Cart {
    products = []; // содержит объекты: { instance: {CartItem}, quantity: number }
    container = null;
    isVisible = false;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this.render();
    }

    render () {
        for (let product of this.products) {
            if (product.instance.rendered) {
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.instance.render());
        }
    }

    add (id, title, price) {
        if (!this.products.some(product => product.instance.id === id)) {
            this.products.push({
                instance: new CartItem(id, title, price),
                quantity: 1,
            });
            this.render();
        } else {
            this.products.forEach(product => {
                if (product.instance.id === id) {
                    document.querySelector(`p[data-id="${id}"]`).innerText = ++product.quantity;
                }
            });
        }
    }
    remove (id) {
        id = id.toString();
        for (let i = 0; i < this.products.length; i++) { // {instance: {CartItem}, quantity: number}
            if (this.products[i].instance.id === id) {
                this.products.splice(i, 1);
            }
        }

        let node = document.querySelector(`div[id="${id}"]`);
        node.parentNode.removeChild(node);
    }

    switchVisibility () {
        if (cart.isVisible === false) {
            cart.container.style.visibility = 'visible';
            cart.isVisible = true;
        } else {
            cart.container.style.visibility = 'hidden';
            cart.isVisible = false;
        }
    }

    // incrQuantity () - увеличивает количество продукта на 1 шт
    // decrQuantity () - уменьшает количество продукта на 1 шт
    // get price () - считает цену всей корзины
}

class CartItem {
    title = '';
    price = 0;
    id = 0;
    rendered = false;

    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render() {
        this.rendered = true;
        return `
        <div id="${this.id}" class="cart__item">
            <div class="cart__item-title">
                <div class="title">
                    <h4>${this.title}</h4>
                    <button class="removeBtn" onclick="cart.remove(${this.id})">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <p class="price">${this.price}</p>
            </div>
            <div class="cart__item-settings">
                <button class="decrease">-</button>
                <p class="quantity" data-id="${this.id}">1</p>
                <button class="increase">+</button>
            </div>
        </div>`
    }
}

const list = new Products('.products');
const cart = new Cart('.cart')



