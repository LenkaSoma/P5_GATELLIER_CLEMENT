fetch('http://localhost:3000/api/cameras')
  .then((response) => response.json())
  .then((response) => {
  
    console.log(response);
    let element = "";

    for(let i = 0; i < response.length; i++) {
      console.log(response[i].name);

      element += 
        '<div class="col-lg-4 col-md-6 mb-4">'+
            '<div class="card h-100">'+
                '<a href="test?'+ response[i]._id +'"><img class="card-img-top" src="'+ response[i].imageUrl +'" alt="Camera" /></a>'+
                '<div class="card-body">'+
                    '<h4 class="card-title"><a href="test?'+ response[i]._id +'">'+ response[i].name +'</a></h4>'+
                    '<h5>'+ (response[i].price/100).toFixed(2).replace(".",",") +'€</h5>'+
                    '<p class="card-text">'+ response[i].description +'</p>'+
                '</div>'+
            '</div>'+
        '</div>'
    }
    
    document.getElementById("cameras").innerHTML = element;
});