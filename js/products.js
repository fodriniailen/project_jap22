let originalProductList = [];
let productList = [];
let minCount = undefined;
let maxCount = undefined;
let divProd = document.getElementById('prod-list-container');


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = 'product-info.html';
}

function product_list() {
    let htmlContentToAppend = "";
    for (let products of productList) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div onclick="setProdID(${products.id})">
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
        <div class="col-3">
            <img src=${products.image}  class="img-thumbnail">
        </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}   </h4>
            <small class="text-muted">${products.soldCount} artículos</small>
            </div>
            <p class="mb-1 th">${products.description}</p>
        </div>
        </div>
        </div>
        </div>
    `
        }
        let divProd = document.getElementById('prod-list-container');
        divProd.innerHTML = htmlContentToAppend;
    }
};


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok")
            productList = resultObj.data.products;
        {

            products = resultObj.data;
            product_list(products);
        }
        product_list();
    });



    document.getElementById("sortAsc").addEventListener("click", () => {
        productList.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });

        product_list();
    });

    document.getElementById("sortDesc").addEventListener("click", () => {
        productList.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
        product_list();
    });

    document.getElementById("sortByCount").addEventListener("click", () => {
        productList.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
        product_list();
    });


    document.getElementById("filterCount").addEventListener("click", () => {
        minCount = document.getElementById("filterCountMin").value;
        maxCount = document.getElementById("filterCountMax").value;
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        product_list();
    });
});

