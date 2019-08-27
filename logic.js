function createMenuElement(menu) {
  var button = document.createElement('BUTTON');
  button.innerHTML = menu.name + '<br>' + menu.price;
  return button;
}

function createCartItemElement(item) {
  var li = document.createElement('LI');

  var spanName = document.createElement('SPAN');
  spanName.className = 'name';
  spanName.innerHTML = item.name;
  li.appendChild(spanName);

  var spanQuantity = document.createElement('SPAN');
  spanQuantity.className = 'quantity';
  spanQuantity.innerHTML = item.quantity;
  li.appendChild(spanQuantity);

  var spanPrice = document.createElement('SPAN');
  spanPrice.className = 'price';
  spanPrice.innerHTML = item.price;
  li.appendChild(spanPrice);
  return li;
}

function renderMenuHTML() {
  var elMenu = document.querySelector('#menu');

  for(let i=0; i<menu.length; i++) {
    var menuButton = createMenuElement(menu[i]);

    menuButton.onclick = function addToCart() {

      cart.push(menu[i].id);

      renderCartHTML();
    }

    elMenu.appendChild(menuButton);
  }
}

function renderCartHTML() {
  var elCart = document.querySelector('#cart');
  elCart.innerHTML = '';

  // 아래 자료 구조를 변경
  // ['americano', 'americano', 'caffelatte']
  // { americano: 2, caffelatte: 1}
  var quantityObj = cart.reduce(function(acc, item) {
    if(acc[item]) {
      acc[item] = acc[item] + 1;
    }
    else {
      acc[item] = 1;
    }
    return acc;
  }, {});

  // 아래 자료 구조를 변경
  // { americano: 2, caffelatte: 1}
  // [{name:'아메리카노', quantity:2, price:4000}, {name:'까페라떼', quantity:1, price:2500}]
  var quantityArray = [];
  for(var id in quantityObj) {
    let menu = getMenuById(id);
    quantityArray.push({
      name: menu.name,
      quantity: quantityObj[id],
      price: menu.price * quantityObj[id]
    });
  }

  renderSubtotalHTML(quantityArray);

  quantityArray.forEach(function(item) {
    var elItem = createCartItemElement(item);
    elCart.appendChild(elItem);
  });
}

function getMenuById(id) {
  // input: 'americano'
  // output: { id: 'americano', name: '아메리카노', price: 2000 }
  var found = menu.filter(function(item) {
    return item.id === id;
  });
  return found[0];
}

function renderSubtotalHTML(arr) {
  var elSubtotal = document.querySelector('#subtotal span');
  var total = arr.reduce(function(subtotal, curr) {
    return subtotal + curr.price;
  }, 0);
  elSubtotal.innerHTML = total;
}

renderMenuHTML();