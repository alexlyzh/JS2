class Hamburger {
    constructor(size='', stuffing='') {
        this.toppings = []
        this.size = size;
        this.stuffing = stuffing;
        this.fetchPriceList();
        // if (size && stuffing) {
        //     this.calories = this.priceList.size[size].calories + this.priceList.stuffing[stuffing].calories;
        //     this.price = this.priceList.size[size].price + this.priceList.stuffing[stuffing].price;
        // }
    }
    fetchPriceList() {
        this.priceList = {
            size: {
                small: {price: 50, calories: 20},
                big: {price: 100, calories: 40},
            },
            stuffing: {
                cheese: {price: 10, calories: 20},
                salad: {price: 20, calories: 5},
                potato: {price: 15, calories: 10},
            },
            topping: {
                spices: {price: 15, calories: 0},
                mayo: {price:20, calories: 5},
            },
        };
    }
    chooseSize(size) {
        this.size = size;
    }
    choseStuffing(stuffing) {
        this.stuffing = stuffing;
    }
    addTopping(topping) {
        if (!this.toppings.includes(topping)) {
            this.toppings.push(topping);
        }
    }
    removeTopping(topping) {
        if (this.toppings.includes(topping)) {
            for (let i = 0; i < this.toppings.length; i++) {
                if (this.toppings[i] === topping) {
                    this.toppings.splice(i,1);
                }
            }
        }
    }
    calculatePrice() {
        let price = 0;
        if (this.size) {price += this.priceList.size[this.size].price}
        if (this.stuffing) {price += this.priceList.stuffing[this.stuffing].price}
        return price;
    }
    calculateCalories() {

    }
}

let burger = new Hamburger();
console.log(burger.calculatePrice());
console.log(burger)

let sizes = document.querySelectorAll("input[name='size']");
sizes = [...sizes];
let stuffings = document.querySelectorAll("input[name='stuffing']");
stuffings = [...stuffings];
let toppings = document.querySelectorAll("input[name='topping']");
toppings = [...toppings]
let submit = document.querySelector("input[type='submit']");
let price = document.querySelector('.price');
let calories = document.querySelector('.calories');

let size = '', stuffing = '';
sizes.forEach(elem => {
    elem.addEventListener('click', event => {
        size = event.target.id;
        burger.chooseSize(size);
        price.innerText = `Стоимость: ${burger.price} рублей`
    });
});
stuffings.forEach(elem => {
    elem.addEventListener('click', event => {
        stuffing = event.target.id;

    });
});

