
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
    <h2>${product.name}</h2>
    <hr>
    <h5><b>Precio</b></h5>
         <p>${product.currency} ${product.cost}</p>
    <h5><b>Descripción</b></h5>
         <p>${product.description}</p>
    <h5><b>Categoria</b></h5>
         <p>${product.category}</p>
    <h5><b>Cantidad de vendidos</b></h5>
         <p>${product.soldCount}</p>
    <h5><b>Imagenes ilustrativas</b></h5>
    <div class="img-container">
    <img src="${product.images[0]}" class="img-thumbnail">

    <img src="${product.images[1]}" class="img-thumbnail">

    <img src="${product.images[2]}" class="img-thumbnail">
    <img src="${product.images[3]}" class="img-thumbnail">
 </div>

      <br>
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
    <div onclick="setProdID(${productosRelacionados.id})">
    <div class="list-group-item list-group-item-action cursor-active">
    
    <div class="img-container">
    <img src="${productosRelacionados.image}" class="img-fluid">
    </div>
    <p>${productosRelacionados.name}</p>
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
 
