let searchText = document.getElementById("txtSearch")


searchText.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
   


    let searchTerm = searchText.value // Hämtar det som står i sökrutan
    console.log("Kommer söka efter", searchTerm)


    // Det här anropas funktionen för att hämta info från ett API.
    // Vi väntar på svaret med await
    let results = await search(searchTerm)


    // Här anropas funktionen som ansvarar för att "rendera" (alltså rita ut) resultatet
    renderResults(results)
   
    // TODO: Skriv kod för att tömma sökfältet igen
    searchText.value = ""
  }
}


// Detta är en asynkron funktion som anropar ett API och returnerar svaret som ett JSON-objekt.
async function search(searchString) {
  // Använd funktionen fetch för att anropa ett API med rätt parametrar.
  /*
    Om ni vill använder ni The Movie Database API.
    Det finns dokumentation här https://developers.themoviedb.org/3/getting-started/introduction
    Ni kan i så fall låna min API-nyckel. Den kommer postas i Classroom.
    */


  //Här bygger vi upp den URL som vi ska använda i vårat anrop till APIet.
  let apiKey = "fb2c25666a8cd3030959e4d2ec58a7c9" //TODO: Lägg in API-nyckeln från Classroom här.
  var url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${apiKey}`
  console.log("Den URL vi kommer anropa: ", url)


  //Här används URLen för att göra anrop med den inbyggda funktionen fetch()
  let response = await fetch(url)


  // Detta gör om resultatet från APIet till ett JSON-objekt.
  let json = await response.json()
  return json
}


/*
  Den här funktionen går igenom sökresultatet som är parametern "results"
  och skriver ut det i en lista i DOMen.
*/
function renderResults(results) {
  let resultDiv = document.getElementById("searchresults") //Hämtar ut diven med id="searchresults" för att lägga in resultatet där
  resultDiv.innerHTML = ""


  // Använd console.log() för att skriva ut resultatet till konsollen och titta på det.
  // Det är ofta bra att titta på hur resultatet ser ut för att få en förståelse för
  // hur man kan skriva koden för att använda resultatet.
  console.log("Alla olika: ", results)


  // TODO: Hämta ut attributet av variablen res (res.results) som innehåller listan med resultat
  // och tilldela variablen allObjects det värdet.
  let allObjects = [results.results]
  console.log(allObjects)


  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  if (allObjects[0].length === 0) {
    resultDiv.insertAdjacentHTML("beforeend", "<p>Inga filmer hittades</p>")
  }
  for (let index = 0; index < allObjects[0].length; index++) {
    const object = allObjects[0][index]
    console.log("Film", index +1, object.title)


    // Create a div element and save it to the variable "element"
element = document.createElement("div")

// Create an img element and save it to the variable "img"
img = document.createElement("img")

// Create a p element and save it to the variable "p"
p = document.createElement("p")

// If the object has a poster path, set the src attribute of the img element to the image URL
if (object.poster_path) img.src = "https://image.tmdb.org/t/p/w500" + object.poster_path

// If the object has a title, set the inner text of the p element to the title of the movie
// Make the p innertext the title of the movie and a hyperlink to the movie
if (object.title) p.innerHTML = `<a href="https://www.themoviedb.org/movie/${object.id}">${object.title}</a>`

// Append the element to the resultDiv
resultDiv.appendChild(element)

// Append the img to the element
element.appendChild(img)

// Append the p to the element
element.appendChild(p)
    // TODO: lägg in en div i resultDiv för varje objekt
    // du kan använda t.ex. resultDiv.insertAdjacentHTML("beforeend", "en sträng med html")
  }
}



