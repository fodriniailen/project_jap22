let cars = [];
function cars_list(array) {
let htmlContentToAppend = "";
    for (let i = 0; i < array.products.length; i++) {
        let products = array.products[i];

        htmlContentToAppend += `
    
        <div class="list-group-item list-group-item-action">
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
    document.getElementById('autos').innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CAR_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cars = resultObj.data;
            cars_list(cars);
        }
    });
});