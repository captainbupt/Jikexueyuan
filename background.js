running = 0

function qiang(id){
	var id = $(this).data('id');
	$.ajax({
		url: 'http://fuwu.jikexueyuan.com/homework/take-homework',
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		success: function(data){
			if(data.error === 0){
				alert('ÇÀµ¥³É¹¦');
				window.location.href = window.APP_URL+'homework/'+id+'/correct';
			} else {
				alert(data.message);
			}
		}
	});
}

function notCorrected(){
	var xhr = new XMLHttpRequest();
	//xhr.open("GET", "http://fuwu.jikexueyuan.com/homework/not-corrected", false);
	xhr.open("GET", "http://fuwu.jikexueyuan.com/homework/my", false);
	xhr.send();
	var response = xhr.responseText.replace(/\n| |\r|\t/g, "");
	
	re = /<td>(.*?)<\/td>(<td>.*?<\/td>){8}/g;
	result = re.exec(response);
	while(result){
		id = result[1];	
		qiang(id);
		result = re.exec(response);
	}
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