	//next.js will provide function and interface for moving on to the next level
	
	intLevel = intLevel+1;
	tries = 2;
	if (arr[intLevel] !== undefined)
	{
		var arrArray = arr[intLevel].split(',');
		var wordType=arrArray[0];	
		var wordArrayPrev=arrArray[1];		
		var possibleArrayPrev=arrArray[2];	
	
		//remove references from previous level
		for (var i = 0; i <= prevWordArrayLength; i++) 
		{e[i].remove(le[i]);}	
		for (var i = 0; i <= prevWordArrayLength; i++)
		{answerPlaceHolder.remove(e[i]);}	
		for (var i = 1; i <= 4; i++)
		{alphaPlaceHolder.remove(a[i]);}	
		gamePlaceHolder.remove(answerWrapper);
		gamePlaceHolder.remove(alphaPlaceHolder);		
	
		Ti.include("func.js");
	}
	
	else	
		{
			var toastFin = Ti.UI.createNotification({
   			 	message:fin_text,
    			duration: Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toastFin.show();
					
			var timerEnd = setTimeout(function(e){
    				win001.fireEvent("android:back");
				}, 4000);			
		}