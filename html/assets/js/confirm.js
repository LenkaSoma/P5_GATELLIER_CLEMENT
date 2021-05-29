// On récupère les données du cache
const contact   = JSON.parse(sessionStorage.getItem("contact"));
const orderId   = JSON.parse(sessionStorage.getItem("orderId"));
const total     = JSON.parse(sessionStorage.getItem("total"));
let element     = "";
    // On affiche la page de confirmation
    element +=
        '<h5>Votre commande a bien été prise en compte !</h5> <span>Votre commande est désormais en cours de préparation.</span>' +
        '<div class="payment border-top mt-3 mb-3 border-bottom table-responsive">'+
            '<table class="table table-borderless">'+
                '<tbody>'+
                    '<tr>'+
                        '<td><div class="py-2"><span class="d-block text-muted">Order N°</span> <span>'+ orderId +'</span></div></td>'+
                        '<td><div class="py-2"><span class="d-block text-muted">Identité</span> <span>'+ contact.firstName + contact.lastName +'</span></div></td>'+
                        '<td><div class="py-2"><span class="d-block text-muted">Adresse</span> <span>'+ contact.address +'</span></div></td>'+
                        '<td><div class="py-2"><span class="d-block text-muted">Ville</span> <span>'+ contact.city +'</span></div></td>'+
                        '<td><div class="py-2"><span class="d-block text-muted">Email</span> <span>'+ contact.email +'</span></div></td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+
        '</div>'+
        '<div class="row d-flex justify-content-end">'+
            '<div class="col-md-5">'+
                '<table class="table table-borderless">'+
                    '<tbody class="totals">'+
                        '<tr class="border-top border-bottom">'+
                            '<td><div class="text-left"><span class="font-weight-bold">TOTAL:</span></div></td>'+
                            '<td><div class="text-right"><span class="font-weight-bold">'+ (total / 100).toFixed(2).replace(".", ",") +'€</span></div></td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</div>'+
        '</div>'

    document.getElementById('confirm').innerHTML = element;
    // On supprime les éléments du cache
    sessionStorage.removeItem('contact');
    sessionStorage.removeItem('total');
    sessionStorage.removeItem('orderId');
    