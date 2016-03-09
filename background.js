running = 0

function notCorrected(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://fuwu.jikexueyuan.com/homework/not-corrected", false);
	xhr.send();
	var response = xhr.responseText.replace(/\n| |\r/g, "");
	//result = response.match(/<td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/g);
	//chrome.extension.getBackgroundPage().console.log(response);

	alert(response);
	var result = response.match(/<th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th><th>(.*?)<\/th>/g);
	
	alert(result);
	if(running == 1){
		//setTimeout(notCorrected, 10000)
	}
}
chrome.browserAction.onClicked.addListener(
	function(tab) { 
		if(running == 0){
			alert('start sending request');
			running = 1;
			notCorrected();
		}else{
			alert('stop sending request');
			running = 0;
		}
	});