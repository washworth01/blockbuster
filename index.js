let search;
let requestURL = "http://192.168.1.119:8080/api/film"
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.setRequestHeader('Content-type', 'application/json');
request.setRequestHeader('Access-Control-Allow-Origin', '*');
request.responseType = "json"
request.send();
let jsonString = request.response;
let film = [];

request.onload = function() {
	jsonString = request.response;
	for(let i = 0; i < 3; i++){
		film[i] = Math.floor(Math.random() * jsonString.length);
		console.log(film[i])
	}
	displaySlides();
	newReleasesTable();
}

function displaySlides(){
	for(let i = 0; i < 3; i++){
		slide = document.getElementById("slide"+ i);
		slide.src = getImage(jsonString[film[i]].category);
		console.log(jsonString[film[i]].category)
		document.getElementById("filmTitle"+i).innerHTML = jsonString[film[i]].title;
		document.getElementById("filmRating"+i).innerHTML = jsonString[film[i]].rating;
	}
}

function newReleasesTable(){
    let txt = "";
	let counter = 0;
	let totalFilms = jsonString.length;
	
	txt += "<tr><td>Title</td><td>Catergory</td><td>Price</td><td>Rating</td></tr>"
	for (i = totalFilms; i > 0; i--){
		if(jsonString[i-1].category == "New"){
			txt += "<tr><td>" + jsonString[i].title + "</td>"
			txt += "<td>" + jsonString[i].category + "</td>"
			txt += "<td>" + jsonString[i].price + "</td>"
			txt += "<td>" + jsonString[i].rating + "</td>"
			counter++
			if(counter == 10){
				break;
			}
		}
    }
    console.log(jsonString[0].category);
    document.getElementById("newReleasesTable").innerHTML = txt;
}

function getImage(category){
	let image;
	console.log(image);
	 if(category === 'Action'){
		image = "action.jpg";
		console.log(image);
	 }
	 else if(category == "Animation"){
		image = "animation.jpg";
		console.log(image);
	 }
	 else if(category == "Children"){
		image = "children.jpg";
		console.log(image);
	 }
	 else if(category == "Classics"){
		image = "classics.jpg"
		console.log(image);
	 }
	 else if(category == "Comedy"){
		image = "comedy.jpg"
		console.log(image);
	 }
	 else if(category == "Documentary"){
		image = "documentary.jpg"
		console.log(image);
	 }
	 else if(category == "Drama"){
				image = "drama.jpg"
	 console.log(image);
	 }
	 else if(category == "Family"){
			image = "family.jpg"
		 console.log(image);
	 }
	 else if(category == "Foreign"){
			image = "foreign.png"
		 console.log(image);
	 }
	 else if(category == "Games"){
			image = "games.jpg"
		 console.log(image);
	 }
	 else if(category == "Horror"){
			image = "horror.jpg"
		console.log(image);
	 }
	 else if(category == "Music"){
			image = "music.jpg"
		 console.log(image);
	 }
	 else if(category == "New"){
			image = "new.jpg"
			console.log(image);
	}
	 else if(category == "Sci-Fi"){
			image = "science.jpg"
			console.log(image);
	 }
	 else if(category == "Sports"){
		image = "sports.jpg" 
		console.log(image);
	 }
	 else if(category == "Travel"){
		image = "travel.jpg" 
		console.log(image);
	 }
	return image;
}

function getFilm(title){
	for(let i = 0; i < jsonString.length; i++){
		if(jsonString[i].title == title){
			
		}
	}
}