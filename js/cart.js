const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const cartTableTotal = document.querySelector(".card-table__total");
  const modalForm = document.querySelector(".modal-form");

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }

      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id && good.count > 0) {
        good.count--;
      }

      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (cart.some((good) => good.id === clickedGood.id)) {
      console.log("увеличить число");
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }

        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    const trTotal = document.createElement("tr");
    let totalPrice = 0;

    cartTable.innerHTML = "";
    cartTableTotal.innerHTML = "";

    goods.forEach((good) => {
      const trGoods = document.createElement("tr");

      trGoods.innerHTML = `
					<td>${good.name}</td>
					<td>${good.price}$</td>
					<td><button class="cart-btn-minus"">-</button></td>
					<td>${good.count}</td>
					<td><button class=" cart-btn-plus"">+</button></td>
					<td>${+good.price * +good.count}$</td>
					<td><button class="cart-btn-delete"">x</button></td>
      `;

      totalPrice += +good.price * +good.count;
      cartTable.append(trGoods);

      trGoods.addEventListener("click", (event) => {
        if (event.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          // console.log("delete");
          deleteCartItem(good.id);
        }
      });
    });

    trTotal.innerHTML = `
      <th colspan=" 5">Total:</th>
      <th class="card-table__total" colspan="2">${totalPrice}$</th>
    `;

    cartTableTotal.append(trTotal);
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        name: modalForm.nameCustomer.value,
        phone: modalForm.phoneCustomer.value,
      }),
    }).then(() => {
      cart.style.display = "";
    });
  };

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    sendForm();
  });

  cart.addEventListener("click", (event) => {
    if (
      !event.target.closest(".modal") &&
      event.target.classList.contains("overlay")
    ) {
      cart.style.display = "";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cart.style.display = "";
    }
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);

    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    cart.style.display = "";
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    });
  }
};

cart();
