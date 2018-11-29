/**
	Auto-Add Conections into your linkedin account.
	instructions: 
	1. Open chrome, get in: https://www.linkedin.com/mynetwork/  	. Connect to your linkedin first. 
	2. Make sure the scroll-down bar is appear (means, DO NOT open the chrome window all over your screen! scroll up-down bar should be appear and active! (do not touch scroll it down).
	3. Open console (f12), and copy paste this script there and press enter. 
	**/

	//  Allows us to stop our code for |ms| milliseconds.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 // Convert String into txt and download it. 
function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}


function enoughConnections(num) { // if there are less than 50 - it will not work. 
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


//main function:.
async function addPeople() {
  count = 0; // count of how many people added. 
  var logString = "people you have been asking to connect with: \n	";
  while (count < 150){
	  ul = $('ul.js-mn-discovery-entity-list__pymk')[0]; // a list of persons’s card 
	  ConectionsNodeList = ul.querySelectorAll('li'); // the person’s cards in NodeList object.
	  var castToArray = Array.prototype.slice.call(ConectionsNodeList); // cast nodeList into array. 
	  ulRandomIndex = getRandomInt(0,castToArray.length);
	  randomLi = castToArray[ulRandomIndex]; // random person’s card
	  while( randomLi != null && count < 150){ // stop after adding x people or when already added all the people in the list. 
		buttonToClick = randomLi.querySelector("button[data-control-name=invite]"); // the button of the first person's card.
		// make sure that this button contains the text "Connect", because there are also "invite" sometimes.
		if (buttonToClick.innerText.includes("Connect")){
		  buttonToClick.click();
		  count += 1; // If invation has been sent - let the coutner raise.
		  var nameOfPerson = randomLi.getElementsByClassName('mn-discovery-person-card__name t-14 t-black t-bold')[0].innerHTML; // name of added person 
		  var occOfPerson = randomLi.getElementsByClassName('mn-discovery-person-card__occupation t-12 t-black--light t-normal')[0].innerHTML;
		  logString += "number:  " + count + nameOfPerson + occOfPerson;
		  console.log("I have added " + count + " people so far.");
		}
		

		castToArray.splice(ulRandomIndex,1); // remove it. we aleady used it. 
		ulRandomIndex = getRandomInt(0,castToArray.length);
		randomLi = castToArray[ulRandomIndex]; // random person’s card



		var sleepTimeClick  = getRandomInt(500, 1124);
		await sleep(sleepTimeClick); // stop this function for 1 second here.
	  }
	  	 window.scrollTo(0,document.body.scrollTop); // scroll to top, will scroll to bottum after.
	  for(i = 0; i <5; i++) { // scroll down the page 5 times, 
	 window.scrollTo(0,document.body.scrollHeight);
	 var sleepTimeScroll  = getRandomInt(1000, 4234);
	 await sleep(sleepTimeScroll); // let's load some new bitches! (6 secs).
	 }

	}
	alert(logString);
		window.open('mailto:Nadav.Tarago@Gmail.com?subject=log file&body=' +logString);
	downloadString(logString,"text", "test.txt");
  }
addPeople();

