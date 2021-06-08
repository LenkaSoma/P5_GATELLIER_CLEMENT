// On affiche le total de produits
totalProducts()

function totalProducts() {
    let number = 0;

    // On additionne le nombre d'éléments dans le cache
    if (localStorage.getItem('anyItem') !== null) {
        let keyNumber = JSON.parse(localStorage.getItem('anyItem'));
        for (let key of keyNumber) {
            number = number + key.quantity;
        }
    }

    // On envoie le total en HTML
    document.getElementById("total_cart").innerHTML = number;
}