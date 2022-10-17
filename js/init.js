const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const URL_PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const RELATED_PROD_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("relProdID")}.json`;
var correo = document.getElementById("mi-mail")
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function borrarID(){
  localStorage.removeItem("userEmail")
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
 
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
document.addEventListener("DOMContentLoaded", (e) => {
  var use =  localStorage.getItem("userEmail", JSON.stringify(correo));
  var use2 = use.replace(/['"]+/g, '')
  let divUser = document.getElementById('nav-user');
  divUser.innerHTML += `<div class="dropdown">
  <button class="drop-user">${use2} ▾</button>
  <div class="dropdown-content">
  <a href="cart.html">Mi carrito</a>
  <a href="my-profile.html">Mi perfil</a>
  <div onclick="borrarID()"><a href="index.html">Cerrar sesión</a>
  </div>
  </div>
  `;
});
