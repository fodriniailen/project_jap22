
function showCart(){
    let htmlContentToAppend = "";{
      
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
     
      <td><input type="number"  id="valor1" onKeyUp="calcular(this);" /></td>
      <td><input type="text" id="valor2" readonly onKeyUp="calcular(this);" ></td>
    </tr>
        </table>
        </div>
        <hr>
        <br>
        `
      
        document.getElementById("cart-info").innerHTML = htmlContentToAppend;
    
}

}

var subtotal;
function calcular(input)
  {

    var valor =15200;
     var id = input.id;
     if (id == "valor1") {
       subtotal = document.getElementById("valor2").value = (valor*input.value); 
     } 
     
  }

 

document.addEventListener("DOMContentLoaded", function(e){
  
    getJSONData(CART_INFO_URL).then(function(resultObj){
        
        if(resultObj.status === "ok")
        cartArray = resultObj.data.articles[0];
        console.log(cartArray)
        {
            articles = resultObj.data;
            showCart(articles);
        }
        showCart();
    })
})