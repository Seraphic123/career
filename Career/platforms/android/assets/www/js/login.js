var NASURL = "http://127.0.0.1/CI/index.php/rest_auth";

$(document).ready(function(){
	var qry_str='/student/format/json';
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
		});	//http://127.0.0.1/nas/index.php/RESTAPI/auth/format/json
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
	data = jQuery.parseJSON(data);
	if(data.auth =='success'){
			url_str="weclome.html";
			window.location= url_str;
//		href_load('search.html');
	} else {
		alert("login fail");
	}
	debug(data);
}
