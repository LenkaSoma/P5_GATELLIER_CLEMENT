let total = 0;

// On affiche la quantité
displayProductsQuantity()

function displayProductsQuantity() {
    if (sessionStorage.getItem("anyItem") !== null) {
        let products    = JSON.parse(sessionStorage.getItem("anyItem"));
        total           = 0;
        let html        = "";

        // Pour chaque produit présent on additionne le total x la quantité et on affiche le HTML
        products.forEach(function(product) {
            total = total + (product.price * product.quantity);

            html +=
                '<tr>'+
                    '<th scope="row" class="border-0">'+
                        '<div class="p-2">'+
                            '<img src="'+ product.imageUrl +'" alt="'+ product.name +'" width="70" class="img-fluid rounded shadow-sm">'+
                            '<div class="ml-3 d-inline-block align-middle">'+
                                '<h5 class="mb-0"><a href="#" class="text-dark d-inline-block align-middle">'+ product.name +'</a></h5>'+
                            '</div>'+
                        '</div>'+
                    '</th>'+
                    '<td class="border-0 align-middle"><strong>'+ (product.price * product.quantity /100).toFixed(2).replace(".",",") +'€</strong></td>'+
                    '<td class="border-0 align-middle"><strong>'+ product.quantity +'</strong></td>'+
                    '<td class="border-0 align-middle"><a href="#" class="text-dark id="delete"><i class="fa fa-trash"></i></a></td>'+
                '</tr>'

            document.getElementById('cart').innerHTML = html;
        });

        // On formate le total pour pouvoir l'afficher
        strTotal = (total / 100).toFixed(2).replace(".",",") + '€';
        document.getElementById('total').innerHTML = strTotal;

        // On ajoute un EventListener au moment de cliquer sur l'envoie du formulaire
        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();
            SendForm();
        });
    } else {
        // Si aucun produit dans le panier
        noProduct = '<h5 class="mb-0 ml-3 d-inline-block align-middle">Vous n\'avez aucun produit dans votre panier !</h5>'
        document.getElementById('cart').innerHTML = noProduct;
        document.getElementById("formstyle").style.display = "none";
    }
}


function SendForm() {
    // On récupère les valeurs du formulaire
    let contact = {
        firstName: document.getElementById("input-firstname").value,
        lastName: document.getElementById("input-lastname").value,
        address: document.getElementById("input-address").value,
        city: document.getElementById("input-city").value,
        email: document.getElementById("input-email").value
    };

    // Pour chaque produit présent on envoie l'ID
    let products = [];
    if (sessionStorage.getItem('anyItem') !== null) {
        let productTab = JSON.parse(sessionStorage.getItem("anyItem"));
        productTab.forEach(p => { products.push(p._id) });
    }

    // On convertit en JSON et on envoie les informations
    let contactItems = JSON.stringify({ contact, products })
    SendInfos(contactItems);
}

function SendInfos(contactItems) {
    // On envoie les informations reçus a l'API et on redirige vers la page de confirmation
    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: contactItems
    }).then(response => {
        return response.json();
    }).then(resp => {
        sessionStorage.setItem('contact', JSON.stringify(resp.contact));
        sessionStorage.setItem('orderId', JSON.stringify(resp.orderId));
        sessionStorage.setItem('total', JSON.stringify(total));
        sessionStorage.removeItem('anyItem');
        window.location.replace("./confirm.html");
    });
}

