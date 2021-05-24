// On affiche le total de produits
totalProducts()

function totalProducts() {
    let number = 0;

    // On additionne le nombre d'éléments dans le cache
    if (sessionStorage.getItem('anyItem') !== null) {
        let keyNumber = JSON.parse(sessionStorage.getItem('anyItem'));
        for (let key of keyNumber) {
            number = number + key.quantity;
        }
    }

    // On envoie le total en HTML
    document.getElementById("total_cart").innerHTML = number;
}