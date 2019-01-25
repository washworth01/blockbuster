let search;
let requestURL = "http://192.168.1.119:8080/api/film"
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.setRequestHeader('Content-type', 'application/json');
request.setRequestHeader('Access-Control-Allow-Origin', '*');
request.responseType = "json"
request.send();
let jsonString = request.response;
let txt = "";
let page = 1;
let ageCheckbox = [document.getElementById("r"), document.getElementById("nc-17"), document.getElementById("pg-13"), document.getElementById("pg"), document.getElementById("g")]
let table = jsonString;
let baseTable;

request.onload = function() {
	jsonString = request.response;
	baseTable = jsonString;
	loadTable(jsonString);
}

function getData(){
    request.open("GET", requestURL);
    request.setRequestHeader('Content-type', 'application/json');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.responseType = "json"
    request.send();
}

function loadTable(newTable){
	let counter = 0;
	let i = 0;
	table = newTable;
	if (page == 1){
		i = 0;
	}
	else{
		i = page*20;
	}
    txt = "";
	document.getElementById("filmList").innerHTML = txt;
	txt += "<tr><td>Title</td><td>Description</td><td>Catergory</td><td>Price</td><td>Length</td><td>Rating</td><td>Actors</td></tr>"
    for (i = i; i < table.length; i++){
        txt += "<tr><td>" + table[i].title + "</td>"
        txt += "<td>" + table[i].description + "</td>"
        txt += "<td>" + table[i].category + "</td>"
        txt += "<td>" + table[i].price + "</td>"
        txt += "<td>" + table[i].length + "</td>"
        txt += "<td>" + table[i].rating + "</td>"
        txt += "<td>" + table[i].actors + "</td></tr>"
		counter++;
		if (counter == 20){
			break;
		}
    }
    console.log(jsonString[0].category);
  //  let jsonString = json.parse(request.stringify);
    let myH1 = document.createElement('h1');
    document.getElementById("filmList").innerHTML = txt;
}

// horror.onclick = function getCategory(word){
//     search = "horror";
//     getByCategory(search);
// }

function getByCategory(cat){
	let counter = 0;
	let i = 0;
	if (page == 1){
		i = 0;
	}
	else{
		i = page*20;
	}
    txt = "";
	document.getElementById("filmList").innerHTML = txt;
	txt += "<tr><td>Title</td><td>Description</td><td>Catergory</td><td>Price</td><td>Length</td><td>Rating</td><td>Actors</td></tr>"
    for (i = i; i < jsonString.length; i++){
		if(jsonString[i].category == cat){
			txt += "<tr><td>" + jsonString[i].title + "</td>"
			txt += "<td>" + jsonString[i].description + "</td>"
			txt += "<td>" + jsonString[i].category + "</td>"
			txt += "<td>" + jsonString[i].price + "</td>"
			txt += "<td>" + jsonString[i].length + "</td>"
			txt += "<td>" + jsonString[i].rating + "</td>"
			txt += "<td>" + jsonString[i].actors + "</td></tr>"
			counter++;
			if (counter == 20){
				break;
			}
		}
    }
    console.log(jsonString[0].category);
  //  let jsonString = json.parse(request.stringify);
    let myH1 = document.createElement('h1');
    document.getElementById("filmList").innerHTML = txt;
}

function findByTitle(){
    let input = document.getElementById("search").value;
	input = input.toUpperCase();
	txt = "";
	let titleTable = [];
    let counter = 0;
    for (i = 0; i < table.length; i++){
        if (table[i].title.includes(input)){
			titleTable[counter] = table[i];
			counter++;
			}
        }
	if (counter == 0){
		txt = "Sorry! We couldn't find what you were looking for."
	}
	loadTable(titleTable);
}

function ageFilter(){
	let numberOfBoxesChecked = 0;
	let checkedBoxes = [];
	let ageTable = [];
	let newTable = baseTable;
	for(let i = 0; i < ageCheckbox.length; i++){
		if(ageCheckbox[i].checked == true){
			numberOfBoxesChecked++;
			checkedBoxes.push(ageCheckbox[i]);
		}
	}
	
	if (numberOfBoxesChecked > 0){
		counter = 0;
		console.log(checkedBoxes.length);
		txt += "<tr><td>Title</td><td>Description</td><td>Catergory</td><td>Price</td><td>Length</td><td>Rating</td><td>Actors</td></tr>"
		for (i = 0; i < baseTable.length; i++){
			for(let j = 0; j < numberOfBoxesChecked; j++){
				console.log(j);
				if(newTable[i].rating == checkedBoxes[j].name){
				ageTable.push(newTable[i]);
				break;
				}
				else if(baseTable[i].rating == checkedBoxes[j].name){
				ageTable.push(newTable[i]);
				break;
				}
				
			}
		}
	console.log(table.length);		
	}
	loadTable(ageTable);
}
	
function priceFilter(){
	let lessThan = document.getElementById("lessThan").value;
	let greaterThan = document.getElementById("greaterThan").value;
	let counter = 0;
	let newTable = baseTable;
	txt = "";
	priceTable = []
	console.log(lessThan.value);
	console.log(greaterThan.value);
	
	txt += "<tr><td>Title</td><td>Description</td><td>Catergory</td><td>Price</td><td>Length</td><td>Rating</td><td>Actors</td></tr>"
	for (i = 0; i < newTable.length; i++){
		if(newTable[i].price < lessThan && newTable[i].price > greaterThan){
			priceTable.push(newTable[i]);	
		}
		
	}
	console.log(table.length);
	loadTable(priceTable);
}

function nextPage(){
    page = page*1+1;
	console.log(page);
    loadTable(table);
}

function previousPage(){
    if(page != 1){
		page = page*1-1;
		console.log(page);
		loadTable(table);
	}
}
