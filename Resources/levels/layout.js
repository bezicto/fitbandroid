	var arrArray = arr[intLevel].split(',');
	var wordType=arrArray[0];	
	var wordArrayPrev=arrArray[1];		
	var possibleArrayPrev=arrArray[2];	
	
	//create window win001 for starting the game
	var win001 = Titanium.UI.createWindow({title:gameTitle,navBarHidden:true,fullscreen:true,backgroundImage:level_background_location,layout:'vertical',modal: true});
	win001.orientationModes=[Titanium.UI.PORTRAIT];
	
	//create a main placeholder for all elements on screen
	var gamePlaceHolderHeight = Math.floor((Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.5)) / (Titanium.Platform.displayCaps.dpi / 160));// 50% of screen in pixel to dp
	var gamePlaceHolder = Ti.UI.createView({height:gamePlaceHolderHeight,layout:'vertical'});//main game alphabets and answer placeholders	
				
	var e = [];
	var le = [];
	var a = [];
	var la = [];
	Ti.include("func.js");	
		
	//element arrangements in window	
	win001.add(gamePlaceHolder);		
	
	//function to free all element from memory upon calling	
	function freeEveryting()
	{
		e=null;
		le=null;
		a=null;
		la=null;
		totalWidthemptySlot=null;
		totalWidthalpha=null;
		answerWrapper=null;
		answerPlaceHolder=null;
		alphaPlaceHolder=null;
		gamePlaceHolder=null;	
	}
	
	//function to move to the next level
	function next()
	{Ti.include("levels/next.js");}
	
	//androidback listener for win001 window - start at level 1 game window
	win001.addEventListener('android:back', function()
	{
        beginButtonLabel.setColor(begin_button_text_color);
        beginButtonLabel.setText(begin_button_text); 
        intLevel = 0;  
        tries = 2;     
        intro.open();
        win001.close();
        win001 = null;
    });
    
    //when user exit to the intro window, free from memory every element resources
    win001.addEventListener("close", function(e) {
    if (Ti.Platform.osname == "android") {
        //freeEveryting();//generate a runtime error, so disable it for the time being
    };});
    
    //when user start the game after the intro window, display win001 window and hide the action bar
    win001.addEventListener("open", function(e) {
    if (Ti.Platform.osname == "android") {
        var actionBar = win001.activity.actionBar;
        actionBar.hide();
    };});
    
    win001.open();