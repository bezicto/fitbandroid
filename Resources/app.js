var gameTitle = "Fill in the blank";
var brookes8 = 'brookes8';
var hug = 'hug';
var intLevel = 0;
var tries = 2;
var incorrect_answer_text = "Sorry, wrong answer.";
var incorrect_sound_location = "sounds/buzzer.wav";
var correct_answer_text = "Yes, correct answer";
var correct_sound_location = "sounds/correct.wav";
var intro_image_location = "images/intro.jpg";
var level_background_location = "images/bg.jpg";
var begin_button_text = "Begin";
var begin_button_text_color = "blue";
var loading_text = "Loading...";
var loading_text_color = "black";
var fin_text = "Thank you for playing this game. You have completed the game. More level will added soon.";

//read level.txt and put all the contents within an array for easy retrieval
var arr = [];
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function readFile(){
    file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'level.txt');
    var blob = file.read();
    var readText = blob.text;
    arr = readText.split("\n");
    file = null;
    blob = null;  
}
readFile();

//create the main window named intro that consits with a view acted as a button to begin the game
var intro = Titanium.UI.createWindow({
		title:gameTitle,
		navBarHidden:true,fullscreen:true,
		backgroundImage:intro_image_location,
		modal: true,
   		exitOnClose: false,
	});
	intro.orientationModes=[Titanium.UI.PORTRAIT];

//beginButton view that will contain Begin label
var beginButton = Ti.UI.createView({name:"begin",height:'60dp',});
var beginButtonLabel = Ti.UI.createLabel({name:"begin",text:begin_button_text,color:begin_button_text_color,height:'auto',width:'auto',font:{fontSize:'50dp',fontWeight:'bold',fontFamily:'brookes8'}});
beginButton.add(beginButtonLabel);

//add begin button inside a footerButtonWrapper (view inside a view)
var footerButtonWrapper = Ti.UI.createView({height:'40dp', width:'auto',bottom:'80dp',layout:'vertical'});
footerButtonWrapper.add(beginButton);

//add footerButtonWrapper inside the intro window
intro.add(footerButtonWrapper);

//beginButton view on click event listener
beginButton.addEventListener('click',function(){
	beginButtonLabel.setColor(loading_text_color);
	beginButtonLabel.setText(loading_text);
	Ti.include("levels/layout.js");
	intro.close();
	intro.win = null;
	});

//when user click on the back button on the main window -intro this will happened
intro.addEventListener('android:back', function()
	{
        intro.close();
     	var activity = Titanium.Android.currentActivity;
     	activity.finish();
    });
      
//when user start the game, hide the actionBar on top
intro.addEventListener("open", function(e) {
    shuffle(arr);//randomize the array of question
    if (Ti.Platform.osname == "android") {
        var actionBarIntro = intro.activity.actionBar;
        actionBarIntro.hide();
    }
    });

//start the game by displaying intro window first
intro.open();