
function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = 'product-info.html';
}

let commentsArray = [];
let currentProduct = [];
let productosRelacionados="";


function showProductsList(){
    let htmlContentToAppend = "";
    {
        
    htmlContentToAppend +=  `
    <br> 

    
    <div class="contenedorinfo">
    <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${product.images[0]}" class="d-block w-100" alt="IMG">
      </div>
      <div class="carousel-item">
        <img src="${product.images[1]}" class="d-block w-100" alt="IMG1">
      </div>
      <div class="carousel-item">
        <img src="${product.images[2]}" class="d-block w-100" alt="IMG2">
      </div>
      <div class="carousel-item">
        <img src="${product.images[3]}" class="d-block w-100" alt="IMG3">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>

    <div class="contenedor-descripcion">
    <button type="button" id="btn-buy" class="btn btn-success">Comprar</button>
    <h2>${product.name}</h2>
    <hr>
    <h5><b>Precio</b></h5>
         <h1 class="text-cost"><b>${product.currency} ${product.cost}</b></h1>
         <br>
    <h5><b>Descripción</b></h5>
         <p>${product.description}</p>
    <h5><b>Categoria</b></h5>
         <p>${product.category}</p>
    <h5><b>Cantidad de vendidos</b></h5>
         <p>${product.soldCount}</p>
    </div>
 </div>

      <h4>Comentarios</h4>
      `

    document.getElementById("div-product-info").innerHTML = htmlContentToAppend;
    }

}


 function showComments(){
    let htmlContentToAppend = "";
    if(commentsArray.length==0){
        document.getElementById("comment-container").innerHTML= `
        <h5> No hay comentarios sobre este producto</h5>
        `
    }else{
    for (let comment of commentsArray){
        htmlContentToAppend += `
        
        <p><b>${comment.user}</b> | ${comment.dateTime} | <i>Puntuación:${comment.score}</i></p> 
        <p>${comment.description}</p>
        <hr>
        <br>

        `

        document.getElementById("comments-container").innerHTML = htmlContentToAppend;
    
    }
}
 }

 function showRelatedProducts(){
    let htmlContentToAppend ="";
for (let i = 0; i < product.relatedProducts.length; i++) {
        
productosRelacionados=product.relatedProducts[i];
console.log(productosRelacionados)
    htmlContentToAppend += 
    `
    
    <div id="prod-relacionados">
    <div onclick="setProdID(${productosRelacionados.id})">
    <div class="list-group-item list-group-item-action cursor-active">
    
    <div class="img-container">
    <img src="${productosRelacionados.image}" class="img-fluid">
    </div>
    <p>${productosRelacionados.name}</p>
    </div>
    </div>
    </div>
    
    `
    document.getElementById("productos-relacionados").innerHTML = htmlContentToAppend;
}
 }




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        currentProduct = resultObj.data;
        {
           product = resultObj.data;
           console.log(product);
           showProductsList(product) ;
        }
        showProductsList()
    })
});

document.addEventListener("DOMContentLoaded", function (e){
    e.preventDefault()
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        commentsArray = resultObj.data;
        console.log(commentsArray)
        {
            comments = resultObj.data;
            showComments();
        }
        showComments()
    })
})

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        currentProduct = resultObj.data;
        {
           product = resultObj.data;
        }
       showRelatedProducts()
    })
});
 
