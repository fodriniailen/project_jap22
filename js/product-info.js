
function getProdID(id){
    localStorage.getItem("prodID");
}
let commentsArray = [];
let currentProduct = [];


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

        </div>
    
        `

        document.getElementById("comments-container").innerHTML = htmlContentToAppend;
        console.log(comment);
    }
}
 }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        currentProduct = resultObj.data;
        {
           product = resultObj.data;
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
