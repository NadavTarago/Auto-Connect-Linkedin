/**
	Auto-Add Conections into your linkedin account.
	instructions:
	1. Open chrome, get in: https://www.linkedin.com/mynetwork/ Connect to your linkedin first.
	2. Make sure the scroll-down bar is appear (means, DO NOT open the chrome window all over your screen! scroll up-down bar
	   should appeared and active! (DO NOT touch scroll it down).
	3. Open console (f12), and copy paste this script there and press enter.
	**/


/** FUNCTIONS: **/
//  Allows us to stop our code for |ms| milliseconds.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getGMTTime() {
    var dt = new Date(); 
    var utcDate = dt.toUTCString();
    return utcDate; 
}
// return the user name that connected.
function getUserName(){
	UserName = $("button[name='nav.settings']").prevObject.context.images["0"].alt ;
	return UserName+"_";
}


 // Convert String into txt/csv and download it.
function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(',');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

// For future updates- I want the program to give alram to users with less than 50 connections that is may not be effective.
function enoughConnections(num) { 
	if (num > 50)
		return true;
	else
		return false; 
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
// This function belong to the old version and having CSP problem with linkedin. (Doesn't responde well).
function arrayToCSV(csvContentss) {
	
var encodedUri = encodeURI(csvContentss);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link); // Required for FF
return link;
//link.click(); // This will download the data file named "my_data.csv".
	
	
}
*/

// make the 2d array as a String format to the wanted csv file. 
function arrayToCSV (twoDiArray) {
    //  Modified from: http://stackoverflow.com/questions/17836273/
    //  export-javascript-data-to-csv-file-without-server-interaction
	// can read more and .csv file format to understand how to manage it. 
    var csvRows = [];
    for (var i = 0; i < twoDiArray.length; ++i) {
        for (var j = 0; j < twoDiArray[i].length; ++j) {
            twoDiArray[i][j] = '\"' + twoDiArray[i][j] + '\"';  // Handle elements that contain commas
        }
        csvRows.push(twoDiArray[i].join(','));
    }

    var csvString = csvRows.join('\r\n');
	return csvString;
}

/*
// This function belong to the old version. Convert the 2d array into string. NOT IN USE.
function convertArrayIntoStringBeforeMakeCSV (arr){
	let csvContentss = "";
	arr.forEach(function(rowArray){
	   let row = rowArray.join(",");
	   csvContentss += row + "\r\n";
	   
	 return csvContentss; 
	   
});
	
}
	*/


//main function:.
async function addPeople() {
  rowsso = [["#: ","Name: ", "Title: "]];
  count = 0; // count of how many people added.
  var logString = "people you have been asking to connect with: \n	";
  while (count < 5){
	  ul = $('ul.js-mn-discovery-entity-list__pymk')[0]; // a list of persons’s card
	  ConectionsNodeList = ul.querySelectorAll('li'); // the person’s cards in NodeList object.
	  var castToArray = Array.prototype.slice.call(ConectionsNodeList); // cast nodeList into array.
	  ulRandomIndex = getRandomInt(0,castToArray.length);
	  randomLi = castToArray[ulRandomIndex]; // random person’s card
	  while( randomLi != null && count < 5){ // stop after adding x people or when already added all the people in the list.
		buttonToClick = randomLi.querySelector("button[data-control-name=invite]"); // the button of the first person's card.
		// make sure that this button contains the text "Connect", because there are also "invite" sometimes.
		if (buttonToClick.innerText.includes("Connect"))
		{	
			buttonToClick.click();
			count += 1; // If invation has been sent - let the coutner raise.
			var nameOfPerson = randomLi.getElementsByClassName('mn-discovery-person-card__name t-14 t-black t-bold')[0].innerHTML; // name of added person
			var occOfPerson = randomLi.getElementsByClassName('mn-discovery-person-card__occupation t-12 t-black--light t-normal')[0].innerHTML;
			nameOfPerson = new String (nameOfPerson.trim()); // we want to work without whitespace strings in order to create .csv file proprely. 
			occOfPerson = new String (occOfPerson.trim()); // we want to work without whitespace strings in order to create .csv file proprely. 
			addToAraay = [count, nameOfPerson, occOfPerson];
			rowsso.push(addToAraay); // add the 'line' into the the 2d array.
			  
			logString += "number:  " + count + "\n" + nameOfPerson + "\n" +occOfPerson; // to present at alret to the user.
			console.log("I have added " + count + " people so far."); // console information
		}
		castToArray.splice(ulRandomIndex,1); // remove the id card of the linkedin user. we aleady used it.
		ulRandomIndex = getRandomInt(0,castToArray.length);
		randomLi = castToArray[ulRandomIndex]; // random person’s card

		var sleepTimeClick  = getRandomInt(500, 1124);
		await sleep(sleepTimeClick); // stop this function for 0.5 sec to 1.124 secs randomly.
	  }
		logString += "\n";


	  	 window.scrollTo(0,document.body.scrollTop); // scroll to top, will scroll to bottum after.
	  for(i = 0; i <5; i++)
	  { // scroll down the page 5 times (load more linkedin account objects).
		 window.scrollTo(0,document.body.scrollHeight);
		 var sleepTimeScroll  = getRandomInt(22, 50);
		 await sleep(sleepTimeScroll); // let's load some new bitches! .
	  }

	}
	
	var dt = new Date(); 
	var utcDate = dt.toUTCString();

	prepare2dArrayToCSV= arrayToCSV(rowsso);
	downloadString(prepare2dArrayToCSV,"csv","logFile_" +getUserName()+ getGMTTime() +".csv");
	alert(logString); // give an alert about job that have done. 
		//window.open('mailto:Nadav.Tarago@Gmail.com?subject=log file&body=' +logString); // SEND EMAIL WITH THE ACTIVITIES.
 
}



addPeople(); // Run the main function
