import {Search} from "./search.js";
import {Error} from "./error.js";

const App = {
    components: {
        Search,
        Error,
    },
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            catalogUrl: '/catalogData.json',
            products: [],
            cartItems: [],
            imgCatalog: 'https://picsum.photos/300/300?random=',
            cartVisible: false,
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson,
        }
    },
    computed: {
        filtered () {
            let regexp = new RegExp(this.$refs.refSearch.userSearch, 'i');
            //let regexp = new RegExp('', 'i');
            return this.products.filter(product => regexp.test(product.product_name));
        },
        getTotalCartPrice () {
            if (this.cartItems.length) {
                let price = 0;
                this.cartItems.forEach(el => {
                    price += el.price * el.quantity;
                });
                return price;
            }
        },
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(e => this.$refs.error.setText(e));
        },
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                   if (data.result) {
                       const find = this.cartItems.find(el => el.id_product === product.id_product)
                       if (find) {
                           find.quantity++;
                       } else {
                            const cartItem = Object.assign({quantity: 1}, product);
                            this.cartItems.push(cartItem);
                       }
                   }
                });
        },
        removeProduct(product) {
            this.cartItems.splice(this.cartItems.indexOf(product),1);
        },
        decrQuantity(product) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data =>{
                   if (data) {
                       if (product.quantity > 1) {
                            product.quantity--;
                       } else {
                           this.removeProduct(product);
                       }
                   }
                });
        },
        incrQuantity(product) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data =>{
                    if (data) {
                        product.quantity++;
                    }
                });
        },
    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        console.log(this)
    }
};

Vue.createApp(App).mount('#app');



