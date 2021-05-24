const IDProduct = window.location.search.substr(4); 

fetch(`http://localhost:3000/api/cameras/${IDProduct}`)
  .then((response) => response.json())
  .then((response) => {
  
    console.log(response);
    let element = "";

    // On intègre le HTML dans la variable
    element += 
      '<br><br><div class="row">'+
        '<div class="col-12 col-lg-6">'+
          '<div class="card bg-light mb-3">'+
            '<div class="card-body">'+
              '<img class="img-fluid" src="'+ response.imageUrl +'" alt="'+ response.name +'">'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-12 col-lg-6 add_to_cart_block">'+
          '<div class="card bg-light mb-3">'+
            '<div class="card-body">'+
              '<h3>'+ response.name +'</h3>'+
              '<h4 class="price">'+ (response.price/100).toFixed(2).replace(".",",") +'€</h4>'+
              '<div class="form-group">'+
                '<label for="colors">Lentilles</label>'+
                '<select class="custom-select" id="select_lense">'+
                  '<option selected disabled>Sélectionnez</option>'+
                '</select>'+
              '</div>'+
              '<span class="btn btn-success btn-lg btn-block text-uppercase" id="addCart">'+
                '<i class="fa fa-shopping-cart"></i> Ajouter au panier'+
              '</span>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
        '<div class="col-12">'+
          '<div class="card border-light mb-3">'+
            '<div class="card-header bg-primary text-white text-uppercase"><i class="fa fa-align-justify"></i> Description</div>'+
            '<div class="card-body">'+
              '<p class="card-text">'+ response.description +'</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'

    // On incorpore la variable element dans le HTML
    document.getElementById("content").innerHTML = element;

    // Menu déroulant pour choisir les lentilles
    let choice = document.getElementById("select_lense");

    response.lenses.forEach(function(lenses) {
      let choose = document.createElement("option");
      choose.value = lenses;
      choose.textContent = lenses;
      choice.appendChild(choose);
    });

    // Gestion du bouton Ajouter au panier
    let addCartBtn = document.getElementById("addCart");
    addCartBtn.addEventListener('click', () => {
      let selected = document.getElementById("select_lense");
      response.selectedLense = selected.options[selected.selectedIndex].value;
      addProduct(response);
    });
});

// Function ajouter au panier
function addProduct(product) {
  // Déclaration des variables - tableaux
  let currentCart = [];
  let otherProduct = true;

  // Stockage des informations
  let savedProduct  = {
    _id: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    quantity: 1,
    selectedLense: product.selectedLense
  }

  // Si la sessionStorage est vide elle crée un nouveau tableau
  if (sessionStorage.getItem('anyItem') === null) {
    currentCart.push(savedProduct);
    sessionStorage.setItem('anyItem', JSON.stringify(currentCart));
  // Sinon elle récupère le tableau et enregistre le produit
  } else {
    currentCart = JSON.parse(sessionStorage.getItem('anyItem'));

    for (let cart of currentCart) {
      if (product._id === cart._id && product.selectedLense === cart.selectedLense) {
        cart.quantity++;
        otherProduct = false;
      }
    }

    if (otherProduct) currentCart.push(savedProduct);
    sessionStorage.setItem('anyItem', JSON.stringify(currentCart));
  }
  
  totalProducts()
  alert("Vous avez ajouté un produit a votre panier");
}