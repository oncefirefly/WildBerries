const search = () => {
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");
  // const viewAllBtn = document.querySelector(".more");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      // console.log(good);
      const goodBlock = document.createElement("div");

      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${good.label ? null : "d-none"}">${
        good.label
      }</span>
                    <img src="db/${good.img}" alt="${
        good.name
      }" class="goods-image">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${
                      good.id
                    }">
                        <span class="button-price">$${good.price}</span>
                    </button>
                </div>
          `;

      goodsContainer.append(goodBlock);

      //   console.log(goodBlock);
    });
  };

  const getData = (value) => {
    fetch("/db/db.json")
      .then((res) => res.json()) // res - response
      .then((data) => {
        const array = data.filter((good) =>
          good.name.toLowerCase().includes(value.toLowerCase())
        );

        // console.log(value);

        // if (category) {
        //     console.log('yah');
        // } else {
        //     console.log('nah');
        // }

        // category ? console.log('yah') : console.log('nah');

        localStorage.setItem("goods", JSON.stringify(array));

        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(array);
        }

        // console.log(window.location);
      });
  };

  // input.addEventListener('input', (event) => {
  //     console.log(event.target.value);
  // })

  searchBtn.addEventListener("click", () => {
    getData(input.value);
  });

  // try {
  //     searchBtn.addEventListener('click', () => {
  //         console.log(input.value);
  //     })
  // } catch (e) {
  //     console.error(e.message);
  // }

  // viewAllBtn.addEventListener("click", () => {
  //   getData(input.value);
  // });
};

search();
