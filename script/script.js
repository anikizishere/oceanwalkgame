
let playerPosition = { x: 1, y: 1 }; //X-koordinaten på horisontell spelyta, y -koordinaten på vertikal spelyta.
let coinPosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };  //Math.random(), ger ett slumpmässigt tal mellan 0 och 1 (ex 0.1/0.234/0.45 osv ej 1). * 5, multiplicerar slumpmässigt tal, kan bli 2,5/1,6 /4,8 osv aldrig över 5.   
let piratePosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };    //Math.floor(), avrundar det nya talet nedåt till närmaste heltal. x och y kan alltså få fem möjliga värden: 0, 1, 2, 3, 4.
const landscapeImages = ["images/ocean1.jpg", "images/ocean2.jpg", "images/ocean3.jpg", "images/ocean4.jpg", "images/ocean5.jpg", // En array med 25-landsapsbilder i havet.   
                        "images/ocean6.jpg", "images/ocean7.jpg", "images/ocean8.jpg", "images/ocean9.jpg", "images/ocean10.jpg",
                        "images/ocean11.jpg", "images/ocean12.jpg", "images/ocean13.jpg", "images/ocean14.jpg", "images/ocean15.jpg",   
                        "images/ocean16.jpg",  "images/ocean17.jpg", "images/ocean18.jpg", "images/ocean19.jpg", "images/ocean20.jpg",
                        "images/ocean21.jpg", "images/ocean22.jpg", "images/ocean23.jpg", "images/ocean24.jpg", "images/ocean25.jpg", 
                        ]; 
const landscape = document.getElementById('landscape'); //Skapar id 'landscape', visar aktuell topbild.
const message = document.getElementById('message'); //Skapar id 'message',  meddelade om man hittar mynt/pirat.
const grid = document.getElementById('grid');   //Skapar id 'grid', själva spelplanen.

function createGrid() { //Skapar ett rutnät som spelplan.
    grid.innerHTML = '';    //Rensar innehållet i spelytan.
    for (let y = 0; y < 5; y++) {   //Skapar y-axeln i spelytans kolumner, 5 st.
        for (let x = 0; x < 5; x++) {   //Skapar x-axeln i spelytans rader, 5 st.
            const cell = document.createElement('div');     //Här skapas en cell för varje x och y kombitation.
            cell.textContent = playerPosition.x === x && playerPosition.y === y ? 'X' : '0';    //Bestämmer vad som ska visas i varje cell. Om spelarens position matchar cellens playerPosition visas 'X' annas '0' för tom. === javaoperator , lika värde och lika typ.
            if(playerPosition.x === x && playerPosition.y ===y){   // Lägger till en klass 'player' till cellen som visar spelarens position. Användas för att ändra spelarens färg.
            cell.classList.add('player');
            }
            grid.appendChild(cell); //Varje ny skapade cell läggs i en grid, som bygger upp cell för cell.
        }
        
    }
    checkPosition();// Kör funktionen checkPosition() nedan. 
}

function movePlayer(dx, dy) { //Funktion avsedd för att hantera rörelse position 'dx' och 'dy'.
    playerPosition.x = Math.max(0, Math.min(4, playerPosition.x + dx)); //Positivt värde för dx är rörelse åt höger, negativt värde rörelse åt vänster. Math.min() ser till att ny positionen inte går förbi den övre ränsen, 4 (0-4). Uppdaterar spelarens x-position.  
    playerPosition.y = Math.max(0, Math.min(4, playerPosition.y + dy)); //Positivt värde för dy är rörelse nedåt, negativt värde en rörelse uppåt. Math.max() ser till att ny positionen inte går förbi den nedre gränsen, 0 (0-4). 
    createGrid(); // Efter att spelarens position har uppdaterats, anropas funktionen.  
    updateLandscape(); // Funktionen updateLandscape() körs nedan. 
}

function updateLandscape() {//För att uppdatera topbilden.
   
    const randomImageIndex = Math.floor(Math.random() * landscapeImages.length); //Ger en slumpmässigt index-bild baserat på antalet bilder i bild-arrayen.
    landscape.style.backgroundImage = `url('${landscapeImages[randomImageIndex]}')`;//BackgroundImage-stilen ställs in för HTML-elementet 'landscape' för att visa den slumpmässigt valda bilden frånlandscapeImages.
   
    const coin = document.getElementById('coin');  //Hämtar referens till HTML-element som representerar myntet.   
    const pirate = document.getElementById('pirate'); //Hämtar referens till HTML-element som representerar piraten. 
  
    coin.style.display = 'none'; //Myntet görs osynlig innnan några villkor uppfylls. 
    pirate.style.display = 'none'; //Piraten görs osynlig innnan några villkor uppfylls. 

    
    if (playerPosition.x === coinPosition.x && playerPosition.y === coinPosition.y) {   //Om spelaren matchar myntets position uför detta.
       
        coin.style.display = 'block'; // Visa mynt.
        coin.style.left = `${coinPosition.x * 20}%`; //Positionerar myntet synligt baserat på dess position i spelplan, skalat som en procent av förälderelementets dimensioner.
        coin.style.top = `${coinPosition.y * 20}%`;    
        coin.style.transform = 'translate(-50%, -50%)'; //Centrerar myntet relaterat till de beräknade left och top värdena ovan.
    
    } else if (playerPosition.x === piratePosition.x && playerPosition.y === piratePosition.y) { //Om spelarens position matchar piratens position, utförs detta. 
       
        pirate.style.display = 'block';  // Visa pirat.
        pirate.style.left = `${piratePosition.x * 10}%`; //Positionerar piraten synligt baserat på dess position i spelplan, skalat som en procent av förälderelementets dimensioner.
        pirate.style.top = `${piratePosition.y * 10}%`; //Centrerar mpiraten relaterat till de beräknade left och top värdena ovan.
    }
}


function checkPosition() { //Funktion för att kolla spelarens position i förhållande till mynt o pirat.
    if (playerPosition.x === coinPosition.x && playerPosition.y === coinPosition.y) { //Jämför spelarens nuvarande position med myntets position om det matchar skriv ut: 
        message.textContent = 'You found the coin, congratulations, look for more!';
    } else if (playerPosition.x === piratePosition.x && playerPosition.y === piratePosition.y) { //Jämför spelarens nuvarande position med piratens position om det matchar skriv ut: 
        message.textContent = 'The pirate took you, too bad, try again!';
    } else {
        message.textContent = ''; //Matchar inget ovan, rensa meddelandet. 
    }
}

document.getElementById('randomWordButton').addEventListener('click', function() { //För att hitta HTML-element ID 'randomWordButton'. När detta element klickas, körs funktionen som definieras i addEventListener.
    fetch('https://api.api-ninjas.com/v1/randomword', { //Denna fetch-anrop gör en nätverksbegäran till API:n för att hämta ett slumpmässigt ord. Den skickar också en API-nyckel i headers för att autentisera begäran.
        headers: {
            'X-Api-Key': 'g1KUI6lOn4BLN9sN32QUDw==AgLJCQOUJGsskYyT' 
        }
    })
    .then(response => response.json()) // Först konverteras svaret till JSON. Sedan kontrollerar koden om det finns ett ord i svaret, om så är fallet, visas ordet i elementet med ID 'wordDisplay'. Om inte, visas ett felmeddelande.
    .then(data => {
        const wordDisplay = document.getElementById('wordDisplay');
        if (data && data.word) {
            wordDisplay.textContent = ` ${data.word}`;
        } else {
            wordDisplay.textContent = 'Kunde inte ladda ett slumpmässigt ord.'; 
        }
    })
    .catch(error => { // Om det uppstår ett fel under nätverksanropet, loggas felet och ett felmeddelande visas i 'wordDisplay'.
        console.error('Error:', error);
        document.getElementById('wordDisplay').textContent = 'Fel vid laddning av ord.';
    });
});


document.getElementById('up').addEventListener('click', () => movePlayer(0, -1)); //Knapp som indikerar i vilken riktning spelaren ska röra sig i.
document.getElementById('down').addEventListener('click', () => movePlayer(0, 1));
document.getElementById('left').addEventListener('click', () => movePlayer(-1, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(1, 0));

createGrid(); // Skapa grid.
updateLandscape(); // Uppdatera top-bild.