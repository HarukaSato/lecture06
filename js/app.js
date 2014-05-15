var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";

var alarm = {
		duration1: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration1 + "秒";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var update = function(){
		alarm.duration1 = alarm.duration1 - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration1) && alarm.duration1 > 0;
};

var setupAlarm = function(duration1String, message){
		alarm.duration1 = Number(duration1String),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.duration1Select.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		alarm.duration1Select = document.querySelector("#duration1");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");

		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});





























var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");

		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});















		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
};

initApp();
