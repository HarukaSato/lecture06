var INTERVAL = 1000;//1000=１秒


var DEFAULT_MESSAGE = "終了";//規定のメッセージの設定


var alarm = {
		duration: -1,//シグナル送信までの秒数を指定する
		message: "" 
};



var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒"; //テキストあと＋
};



var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();//外に出しているテキストと中のカウントを一緒にする
};



var showAlarmMessage = function(){//アラームメッセージを見せるというタスク
		var message = DEFAULT_MESSAGE;//メッセージは規定のメッセージ（終了）
		if(alarm.message.length > 0){
				message = alarm.message;
		}//もしalarm.messageが入ってたらmessageはalarm.message
		
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}//もし、notification.permissionがその通りだったら？お知らせはmessageになる
		alarm.output.textContent = message;//外のメッセはmessageと一緒
};



var update = function(){
		alarm.duration = alarm.duration - 1;//alarm.durationから-1していく（カウントダウンのこと）
		if(isReadyToCountdown())//もしカウント終わってたら、、、
		{
				updateCounter();
				window.setTimeout(update, INTERVAL);//ある関数が終わったら、これを実行してください（実行、時間）インターヴァルが終わってからupdateを呼ぶ。
		}//INTERVAR=1000後に、updateを呼ぶ
		else{
				showAlarmMessage();
		}//カウントしてなかったらshowAlarmMessageを出す（上）
};



var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration)//alarm.durationが数字値をかえす。
		 && alarm.duration > 0;//かつalarm.durationが0より大きい
};

var setupAlarm = function(durationString, message){//？？？
		alarm.duration = Number(durationString),//alarm.duration＝-1を
		alarm.message = message;//alarm.messageをメッセージ
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);//アラームをセットする
		if(isReadyToCountdown()){//カウントダウンの用意が出来ていたら
				updateCounter();//カウンターをアップデート
				window.setTimeout(update, INTERVAL);//インターバルが終わってからアップデートを呼ぶ
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
