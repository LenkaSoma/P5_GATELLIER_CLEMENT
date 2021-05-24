// On récupère toutes les informations de l'API
fetch('http://localhost:3000/api/cameras')
  .then((response) => response.json())
  .then((response) => {
  
    let element = "";

    // On fait une boucle pour afficher en HTML tous les éléments présents
    for (let i = 0; i < response.length; i++) {
      element += 
        '<div class="row p-2 bg-white border rounded mt-2">'+
          '<div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="'+ response[i].imageUrl +'"></div>'+
          '<div class="col-md-6 mt-1">'+
            '<h5>'+ response[i].name +'</h5>'+
            '<p class="para mb-0">'+ response[i].description +'<br><br></p>'+
          '</div>'+
          '<div class="align-items-center align-content-center col-md-3 border-left mt-1">'+
            '<div class="d-flex flex-row align-items-center">'+
              '<h4 class="mr-1">'+ (response[i].price/100).toFixed(2).replace(".",",") +'€</h4>'+
            '</div>'+
            '<h6 class="text-success">Frais de livraison offert</h6>'+
            '<div class="d-flex flex-column mt-4"><a href="details.html?id='+ response[i]._id +'"><button class="btn btn-primary btn-sm" type="button">Voir la fiche produit</button></a></div>'+
          '</div>'+
        '</div>'
    };
    
    // On envoie le tout après l'ID cameras en HTML
    document.getElementById("cameras").innerHTML = element;
});