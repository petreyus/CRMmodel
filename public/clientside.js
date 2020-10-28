const userdata = document.getElementById('contact_us');
function clientSide(){

	console.log("Help me please");
}



function sendData(){
	event.preventDefault();
	console.log(userdata.subject.value);
		let data=userdata.subject.value;

}

clientSide()