var NASURL = "http://127.0.0.1/nas/index.php/rest_auth";

	function onLoad() { 
	   //註冊裝置備妥處理事件
	   document.addEventListener("deviceready", onDeviceReady, false);
	 }

	 function onDeviceReady() {
	   checkConnection();
	 } 
	  
	  //檢查網路
	 function checkConnection() {
		var networkState = navigator.network.connection.type;
		 
	   //定義網路名稱類型
		var states = {};
		states[Connection.UNKNOWN]  = '未知的網路型態';
		states[Connection.ETHERNET] = '乙太網路';
		states[Connection.WIFI]     = 'WiFi';
		states[Connection.CELL_2G]  = '行動網路-2G';
		states[Connection.CELL_3G]  = '行動網路-3G';
		states[Connection.CELL_4G]  = '行動網路-4G';
		states[Connection.NONE]     = '無網路';
		document.getElementById('status').innerHTML = states[networkState];
	 }

$(document).ready(function(){
	var qry_str='/student/format/json';
	if(localStorage.getItem('re_account')=='on'){
		$("#username").val(localStorage.getItem('name'));
		$("#psw").val(localStorage.getItem('password'));
		$("#re_account").val("on").flipswitch("refresh");
	}
	else{
			$("#username").val('');
			$("#psw").val('');
		}
	$(document).ready(function(){	
	
		$("#login").click(function(){	
			
			if($("#username").val() == "" || $("#psw").val() == "" ){
				alert( "請輸入完整資料!!");
			} else {
				window.sessionStorage["id"] = $("#username").val();
				var request = $.ajax({
					url: NASURL+qry_str,
					type: "POST",	
					cache: false,
					crossDomain: true,
					success: onSuccess,
					error: onError,			
					data: {
						user_id:$("#username").val(),
						password:$("#psw").val()
					},
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					dataType: "html"
				});				

			}
		});
		

			//http://127.0.0.1/nas/index.php/RESTAPI/auth/format/json
	});
});
function href_load(url) { //解決無法直接使用href屬性的問題
	location.href= url;
}
function onError(data, status)
{
	alert(data);
} 

function onSuccess(data, status)
{
	localStorage.setItem('name',$("#username").val());
	localStorage.setItem('password',$("#psw").val());
	localStorage.setItem('re_account',$('#re_account').val());
	data = jQuery.parseJSON(data);
	if(data.auth =='success'){
			url_str="weclome.html";
			window.location= url_str;
//		href_load('search.html');
	} else {
		alert("login fail");
	}

//	debug(data);
}
