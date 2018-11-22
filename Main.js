/**
	Auto-Add Conections into your linkedin account.
	instructions: 
	1. Open chrome, get in: https://www.linkedin.com/mynetwork/  	. Connect to your linkedin first. 
	2. Make sure the scroll-down bar is appear (means, DO NOT open the chrome window all over your screen! scroll up-down bar should be appear and active! (do not touch scroll it down).
	3. Open console (f12), and copy paste this script there and press enter. 
	**/

	// this function allows us to stop our code for |ms| milliseconds.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// download log text file into your device. 
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



//main function:.
async function addPeople() {
  count = 0; // count of how many people added. 
  var logString = "people you have been asking to connect with: \n	"
  while (count < 250){
	  ul = $('ul.js-mn-discovery-entity-list__pymk')[0]; // a list of person’s card 
	  firstLi = ul.querySelector('li'); // the first person’s card
	  while(firstLi && count < 250){ // stop after adding 250 people
		buttonToClick = firstLi.querySelector("button[data-control-name=invite]"); // the button of the first person's card.
		// make sure that this button contains the text "Connect", because there are also "invite" sometimes.
		if (buttonToClick.innerText.includes("Connect")){
		  buttonToClick.click();
		  count += 1; // If invation has been sent - let the coutner raise.
		  var nameOfPerson = firstLi.getElementsByClassName('mn-discovery-person-card__name t-14 t-black t-bold')[0].innerHTML; // name of added person 
		  var occOfPerson = firstLi.getElementsByClassName('mn-discovery-person-card__occupation t-12 t-black--light t-normal')[0].innerHTML;
		  logString += "number:  " + count + nameOfPerson + occOfPerson;
		  console.log("I have added " + count + " people so far.");
		}
		ul.removeChild(firstLi); // remove it. we aleady used it. 
		await sleep(1000); // stop this function for 1 second here.
		firstLi = ul.querySelector('li'); // define the next person's card. 
	  }
	  	 window.scrollTo(0,document.body.scrollTop); // scroll to top, will scroll to bottum after.
	  for(i = 0; i <5; i++) { // scroll down the page 5 times, 
	 window.scrollTo(0,document.body.scrollHeight);
	 await sleep(6000); // let's load some new bitches! (6 secs).
	 }

	}
	alert(logString);
		window.open('mailto:Nadav.Tarago@Gmail.com?subject=log file&body=' +logString); // change mail. 
	downloadString(logString,"text", "test.txt");
  }
addPeople();

