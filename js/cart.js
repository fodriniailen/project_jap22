let DOLLAR_SYMBOL = "USD";
let costoPremium = 0.15;
let costoExpress = 0.07;
let costoStandard = 0.05;
let formularioEnvio = document.forms['formulario-de-envio'];
let tipoDeEnvio = formularioEnvio.envio.value;



function showCart() {
  let htmlContentToAppend = ""; {

    htmlContentToAppend = `
        <br>
        <div class="container">
        <h4 style="text-align:center">Carrito de compras</h4>
        <br>
        <h5><i>Artículos a comprar</i></h5>
        <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Costo</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
    <tr>
      <th scope="row"><img src="${cartArray.image}" id="cart-img"></th>
      <td>${cartArray.name}</td>
      <td>${cartArray.currency} ${cartArray.unitCost}</td>
     
      <td><input type="number"  id="valor1" class="form-control" onInput="calcular(this);" min="1" value="1" /></td>
      <td><input type="text" id="valor2"  readonly onInput="calcular(this);" style="border:none;"></td>
    </tr>
        </table>
        </div>
        <hr>
        <br>
        `

    document.getElementById("cart-info").innerHTML = htmlContentToAppend;

  }

}

/*DESHABILITAR LOS CAMPOS DEL MEDIO DE PAGO NO SELECCIONADO*/
var numTarjeta = document.getElementById("num-tarjeta");
var codSeguridad = document.getElementById("cod-seguridad");
var vencimiento = document.getElementById("vencim");
var numDeCuenta = document.getElementById("num-cuenta");
var mostrarPago = document.getElementById("pago-selected")

document.getElementById("credit-card").addEventListener("click", function (e) {
  numDeCuenta.disabled = true;
  numTarjeta.disabled = false;
  codSeguridad.disabled = false;
  vencimiento.disabled = false;
  mostrarPago.innerHTML = "<i>Tarjeta de crédito</i>";
})

document.getElementById("transf").addEventListener("click", function (e) {
  numTarjeta.disabled = true;
  codSeguridad.disabled = true;
  vencimiento.disabled = true;
  numDeCuenta.disabled = false;
  mostrarPago.innerHTML = "<i>Transferencia bancaria</i>"
})

/*FUNCION QUE CALCULA  EL SUBTOTAL POR LA CANTIDAD DE ARTICULOS Y EL COSTO DEL ENVIO SELECCIONADO*/
var subtotal;
var valor = 15200;
function calcular(input) {
  let costoProductHTML = document.getElementById("productCost");
  let costoEnvioHTML = document.getElementById("costoEnvioText");
  let costoTotalHTML = document.getElementById("totalCostText");

  var id = input.id;
  if (id == "valor1") {
    subtotal = document.getElementById("valor2").value = (valor * input.value)
      && (subtotal = costoProductHTML.value = (valor * input.value));
  }


  /*MOSTRAR COSTO DE ENVIO PREMIUM Y TOTAL*/
  if (document.getElementById("premium").checked) {

    let costoEnvioPrem = ((Math.round(subtotal * costoPremium)));

    costoEnvioHTML.innerHTML = DOLLAR_SYMBOL + costoEnvioPrem;
    costoTotalHTML.innerHTML = DOLLAR_SYMBOL + (costoEnvioPrem + subtotal);

  }

  /*MOSTRAR COSTO DE ENVIO EXPRESS Y TOTAL*/

  document.getElementById("express").addEventListener("change", function () {

    let costoEnvioExp = ((Math.round(subtotal * costoExpress)));

    costoEnvioHTML.innerHTML = DOLLAR_SYMBOL + costoEnvioExp;
    costoTotalHTML.innerHTML = DOLLAR_SYMBOL + (costoEnvioExp + subtotal);
  })

  /* MOSTRAR COSTO DE ENVIO STANDARD Y TOTAL */

  document.getElementById("standard").addEventListener("change", function () {

    let costoEnvioStand = ((Math.round(subtotal * costoStandard)));

    costoEnvioHTML.innerHTML = DOLLAR_SYMBOL + costoEnvioStand;
    costoTotalHTML.innerHTML = DOLLAR_SYMBOL + (costoEnvioStand + subtotal);
  })

}



document.addEventListener("DOMContentLoaded", function (e) {



  getJSONData(CART_INFO_URL).then(function (resultObj) {

    if (resultObj.status === "ok")
      cartArray = resultObj.data.articles[0];
    console.log(cartArray)
    {
      articles = resultObj.data;
      showCart(articles);
    }
    showCart();
  })
})






/*VALIDACIONES AL CLICKEAR EL BOTON DE FINALIZAR LA COMPRA*/
formularioEnvio.addEventListener("submit", function (e) {




  let validityStateCalle = formularioEnvio.calle.validity;
  let validityStateNumero = formularioEnvio.numero.validity;
  let validityStateEsquina = formularioEnvio.esquina.validity;
  let validityStateCredit = document.getElementById('credit-card').validity;
  let validityStateTransf = document.getElementById('transf').validity;

  let validityStateCuenta = document.getElementById('num-cuenta').validity;
  let validityStateNroTarj = document.getElementById('num-tarjeta').validity;
  let validityStateVenc = document.getElementById('vencim').validity;
  let validityStateCod = document.getElementById('cod-seguridad').validity;

  /*CALLE*/
  if (validityStateCalle.valueMissing) {
    e.preventDefault();

  }

  /*NUMERO*/
  if (validityStateNumero.valueMissing) {
    e.preventDefault();

  }

  /*ESQUINA*/
  if (validityStateEsquina.valueMissing) {
    e.preventDefault();

  }

  /*FORMA DE PAGO */
  if (validityStateCredit.checked || validityStateTransf.checked) {



  }
  if ((validityStateCredit.checked) && validityStateCod.valueMissing || validityStateNroTarj.valueMissing || validityStateVenc.valueMissing) {
    e.preventDefault();

  }
  else if ((validityStateTransf.checked) || validityStateCuenta.valueMissing) {
    e.preventDefault();

  }

  /*SI EL FORMULARIO SE ENVIA CORRECTAMENTE SE REMUEVE EL ATRIBUTO hidden AL ALERT*/
  else {
    e.preventDefault()
    document.getElementById("alert-success").removeAttribute("hidden");

  }

  formularioEnvio.classList.remove('needs-validation')
  formularioEnvio.classList.add('was-validated');


});



