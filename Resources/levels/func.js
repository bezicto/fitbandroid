	var wordArray = wordArrayPrev.split('');
	var possibleArray = possibleArrayPrev.split('');
	
	var prevWordArrayLength = wordArray.length;
	
	//for empty slot to insert in all possible letter
	for (var i = 0; i <= wordArray.length; i++) 
	{
		e[i] = Ti.UI.createView({left:'10dp',width:'20dp',height:'20dp',});
		le[i] = Ti.UI.createLabel({color:'black',height:'auto',width:'auto',font:{fontSize:'24dp',fontWeight:'bold',fontFamily:'brookes8'}});
		le[i].setText(wordArray[i]);
		e[i].add(le[i]);
	}	
	var totalWidthemptySlotLabel = ((wordArray.length)*40)+10;
	var totalWidthemptySlot = ((wordArray.length)*30)+10;	
	
	//for all letters that will eventually become the answer
	for (var i = 1; i <= 4; i++) 
	{
		a[i] = Ti.UI.createView({left:'20dp',borderColor:'#133899',borderWidth:'2dp',backgroundColor:'black',width:'50dp',height:'50dp',});
		la[i] = Ti.UI.createLabel({text:possibleArray[i],color:'white',height:'auto',width:'auto',font:{fontSize:'24dp',fontWeight:'bold',fontFamily:'Helvetica Neue'}});
		a[i].add(la[i]);
	}
	var totalWidthalpha = (4*70)+20;
			
	//create all views to put all the elements into
	var answerWrapperHeight = Math.floor(gamePlaceHolder.getHeight()) - 50;//50 = 50dp bagi alphaPlaceHolder
	var hintWrapper = Ti.UI.createView({height:answerWrapperHeight,width:totalWidthemptySlotLabel});
		var typeLabel = Ti.UI.createLabel({text:wordType,color:'blue',font:{fontSize:'32dp',fontFamily:'hug'}});
		hintWrapper.add(typeLabel);
	var answerWrapper = Ti.UI.createView({height:answerWrapperHeight,width:totalWidthemptySlotLabel});
		var answerPlaceHolder = Ti.UI.createView({bottom:'30dp',height:'30dp',width:totalWidthemptySlot,layout:'horizontal'});
		answerWrapper.add(hintWrapper);
		answerWrapper.add(answerPlaceHolder);	
	var alphaPlaceHolder = Ti.UI.createView({height:'50dp',width:totalWidthalpha,layout:'horizontal'});
		
	//element arrangements -  the answer field
	for (var i = 0; i <= wordArray.length; i++)
	{answerPlaceHolder.add(e[i]);}
	
	//element arrangements - the item in question
	for (var i = 1; i <= 4; i++)
	{alphaPlaceHolder.add(a[i]);}
	
	gamePlaceHolder.add(answerWrapper);
	gamePlaceHolder.add(alphaPlaceHolder);	
	
	//function to check whether a user selected a correct alphabets		
	function checkAnswer(quesIndex)
	{
		//declare sound to use in this game
		var clickSound = Ti.Media.createSound({url:incorrect_sound_location,preload: true});
		function playClick()
		{clickSound.play();}

		var clickSound_c = Ti.Media.createSound({url:correct_sound_location,preload: true});
		function playClick_c()
		{clickSound_c.play();}
		
		if (le[quesIndex].getText() == possibleArray[possibleArray[0]])
			{
				var toast = Ti.UI.createNotification({
   			 			message:correct_answer_text,
    					duration: Ti.UI.NOTIFICATION_DURATION_SHORT
						});
				toast.show();
					
				le[quesIndex].setColor('blue');	
				//playClick_c();	
				var timerRight = setTimeout(function(e){
    				next();
				}, 2000);
			}
		else if (le[quesIndex].getText() != '')
			{
				if (le[quesIndex].getText() != possibleArray[possibleArray[0]])
				{
					var toast = Ti.UI.createNotification({
   			 			message:incorrect_answer_text,
    					duration: Ti.UI.NOTIFICATION_DURATION_SHORT
						});
					toast.show();
						
					le[quesIndex].setColor('red');
					//playClick();
					tries = tries - 1;
					if (tries == 0)
						{
							var timerWrong = setTimeout(function(e){
								intro.open();
								beginButtonLabel.setColor(begin_button_text_color);
								beginButtonLabel.setText(begin_button_text);
								intLevel = 0;
								tries = 2;
							}, 2000);
						}						
				}
			}
	}
	
	//function to put selectable answers into its place and check answer
	function setPlace(alphabet,quesIndex)
	{le[quesIndex].setText(alphabet);le[quesIndex].setColor('black');checkAnswer(quesIndex);}
	
	//event listeners for alphabets-----------------------------------
	a[1].addEventListener('click',function(ev){setPlace(possibleArray[1],wordArray.indexOf('_'));a[1].hide();});		
	a[2].addEventListener('click',function(ev){setPlace(possibleArray[2],wordArray.indexOf('_'));a[2].hide();});		
	a[3].addEventListener('click',function(ev){setPlace(possibleArray[3],wordArray.indexOf('_'));a[3].hide();});			
	a[4].addEventListener('click',function(ev){setPlace(possibleArray[4],wordArray.indexOf('_'));a[4].hide();});
	