class Products {
    data = [];
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.data = [
            { title: 'Notebook', id: 1, price: 2000 },
            { title: 'Keyboard', id: 2, price: 200 },
            { title: 'Mouse', id: 3, price: 100 },
            { title: 'Gamepad', id: 4, price: 87 }
        ];
    }

    _render() {
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    // 2. Добавьте для Products метод, определяющий суммарную стоимость всех товаров.
    getFullPrice() {
        let fullPrice = 0;
        this.data.forEach(item => {
            fullPrice += item.price;
        });
        return fullPrice;
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';

    constructor(product, img = 'https://picsum.photos/300/300?random=') {
        ({ title: this.title, price: this.price, id: this.id } = product);
        this.img = img;
    }

    render() {
        return `
        <figure class="product-item">
            <img src="${this.img}${this.id}" alt="${this.id}">
            <figcaption>
                <div>
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                </div>
                <button class="to-cart">Добавить в корзину</button>
            </figcaption>
        </figure>`
    }
}

// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class Cart {
    // products = [ - массив с добавленными продуктами
    //     {CartItem}, - продукты
    //     {CartItem},
    //     ...
    // ]
    //

    // applyPromo() - принимает промокод, делает скидку 15% на всё
    // getCartPrice() - возвращает полную стоимость корзины
    // placeOrder() - принимает заказ и отправляет на страницу оплаты
}

class CartItem {
    // title - название
    // price - цена
    // quantity - количество
    // discountPrice - цена после скидки

    // incrQuantity() - увеличивает количество на 1 шт
    // decrQuantity() - уменьшает количество на 1 шт
    // deleteProduct() - удаляет продукт из корзины
    // getDiscount() - делает скидку на продукт,
}

const list = new Products('.products');