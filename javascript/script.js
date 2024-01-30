    
    /* --------------------- fetch Nasa image ------------------- */
    
var mykey = "3PJTMTlKhpkRlCtxoaLmFX3ZvTKmo374yKM4LIRo";
        
$("#fetch-image-button").on("click",function(){
    var inputDate = $('#date-input').val();
    var formattedDate = dayjs(inputDate).format('YYYY-MM-DD');
    var apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${mykey}&date=${formattedDate}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayImageData(data);
        })
        .catch(error => {
            console.error('Error:', error);
           
        });

        function displayImageData(data) {
            var imageDataDiv = $('#image-data');
            imageDataDiv.html(`
            <h1>${data.title}</h1>
            <img src="${data.url}">
            <p class="explanation">explanation:</p>
           
            <p>${data.explanation}</p>
        `);
        }
    });


// --------------------------Solar system Api---------------------------
//https://api.le-systeme-solaire.net/rest/bodies/{id} 


function fetchPlanetData(planet) {
    var url = `https://api.le-systeme-solaire.net/rest/bodies/${planet}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayPlanetData(data);
        });
}   



$('#fetch-planet-button').on('click', function() {
    var input = $('#planet-input').val();
    fetchPlanetData(input);

    // Check if the button already exists
    if (!$("#planety button").text().includes(input)) {
        localStorage.setItem("planet", input);
        let btn = $("<button>").text(input);
        btn.addClass("btn btn-outline-secondary btn-block");
        $("#planety").append(btn);

        // Event handler for the new button
        btn.on("click", function() {
            $('#planet-input').val(input);
            fetchPlanetData(input);
        });
    }
});



function displayPlanetData(data) {
    var planetDataDiv = $('#planet-data');
    planetDataDiv.html(`
        <h1>${data.englishName}</h1>
        <p>Gravity: ${data.gravity}</p>
        <p>Density: ${data.density}</p>
        <p>Mass: ${data.mass.massValue} ${data.mass.massExponent}</p>
        <p>Escape Velocity: ${data.escape}</p>
        <p>Equatorial Radius: ${data.equaRadius}</p>
        <p>Polar Radius: ${data.polarRadius}</p>
        <p>Mean Radius: ${data.meanRadius}</p>
        <p>Sideral Rotation: ${data.sideralRotation}</p>
        <p>Sideral Orbit: ${data.sideralOrbit}</p>
        <p>Aphelion: ${data.aphelion}</p>
        <!-- Add more fields as needed -->
    `);
    }   
