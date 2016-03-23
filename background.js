running = 0

var audio = new Audio();
audio.src="system.wav" 

function qiang(id){
	chrome.cookies.get({"url": "http://fuwu.jikexueyuan.com", "name": "XSRF-TOKEN"}, function(cookie){
		console.log(cookie.value);
		$.ajax({
			url: 'http://fuwu.jikexueyuan.com/homework/take-homework',
			type: 'POST',
			dataType: 'json',
			headers: {
				// modified this line every time
				"X-CSRF-TOKEN": "AlLN4x6UnJLW77nlnevglA9A4tDj4scymRtc9Mml",
				"X-Requested-With": "XMLHttpRequest"
			},
			data: {
				id: id
			},
			success: function(data){
				if(data.error === 0){
					alert('抢单成功');
					//window.location.href = window.APP_URL+'homework/'+id+'/correct';
				} else {
					alert(data.message);
				}
			}
		});
	});
}

function notCorrected(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://fuwu.jikexueyuan.com/homework/not-corrected", false);
	//xhr.open("GET", "http://fuwu.jikexueyuan.com/homework/my", false);
	xhr.send();
	var response = xhr.responseText.replace(/\n| |\r|\t/g, "");
	
	re = /<td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/g;
	result = re.exec(response);
	if(result){
		audio.play(); 
		if(result[4].indexOf("C++") < 0 && result[4].indexOf("NoOneDies") < 0){
			id = result[1];	
			console.log(id);
			qiang(id);
			result = re.exec(response);
		}
	}
	if(running == 1){
		setTimeout(notCorrected, 10000)
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