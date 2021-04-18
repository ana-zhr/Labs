
var Templates = require('../Templates');
var sumForAll = $("#sumForAll");
var sumForOrder = $("#total-cost");
var htmlAllQuantity = $("#allQuantity");
var createOrder = $("#createOrder");
var allQuantity = 0;
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size, price) {
    //Додавання однієї піци в кошик покупок

    for (var i = 0; i < Cart.length; i++)
        if (Cart[i].pizza == pizza && Cart[i].size == size) {
            Cart[i].quantity += 1;
            updateCart();
            return;
        }

    Cart.push({
        pizza: pizza,
        size: size,
        price: price,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
}

$("#clear").click(function () {
    Cart.length = 0;
    updateCart();
});

function removeFromCart(cart_item) {
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i] === cart_item) {
            Cart.splice(i, 1);
        }
    }
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    if (localStorage.getItem('htmlCart') != null) {
        Cart = JSON.parse(localStorage.getItem('htmlCart'));
        updateCart();
    }
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    $cart.html("");
    //Онволення однієї піци
    var sumOrder = 0;
    allQuantity = 0;
    for (var i = 0; i < Cart.length; i++) {
        showOnePizzaInCart(Cart[i]);
        sumOrder += Cart[i].quantity * Cart[i].price;
        allQuantity += Cart[i].quantity;
    }
    $(htmlAllQuantity).text(allQuantity);
    $(sumForOrder).text(sumOrder);
    localStorage.setItem('htmlCart', JSON.stringify(Cart));
}

function createDescription(name, tel, address) {
    var text =
        "Замовлення піци: " + name + "\n" +
        "Адреса доставки: " + address + "\n" +
        "Телефон: " + tel + "\n" +
        "Замовлення:\n";
    for (var i = 0; i < Cart.length; i++) {
        text += "- " + Cart[i].quantity + "шт. [" + (Cart[i].size === 'big_size' ? 'Велика' : 'Маленька') + "] " + Cart[i].pizza.title + "\n";
    }
    return text;
}

function showOnePizzaInCart(cart_item) {
    var html_code = Templates.PizzaCart_OneItem(cart_item);
    var $node = $(html_code);
    if (cart_item.size === PizzaSize.Big) $node.find((".name")).text(cart_item.pizza.title + " (Велика)");
    $(sumForAll).text(cart_item.price * cart_item.quantity);
    $node.find(".plus").click(function () {
        //Збільшуємо кількість замовлених піц
        cart_item.quantity += 1;
        updateCart();
    });
    $node.find(".minus").click(function () {
        cart_item.quantity -= 1;
        if (cart_item.quantity === 0) removeFromCart(cart_item);
        updateCart();
    });
    $node.find(".cross").click(function () {
        removeFromCart(cart_item);
        updateCart();
    });

    $cart.append($node);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.createDescription = createDescription;

exports.PizzaSize = PizzaSize;