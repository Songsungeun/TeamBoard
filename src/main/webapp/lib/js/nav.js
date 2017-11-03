/**
 * 
 */
$(document).ready(function() {
	
	ajaxRequest();
	$('.logout_area').click(function(event) {
		logout();
	})
})

function ajaxRequest() {
	
	var url = "../user/loginCheck.json";
	
	$.ajax({
		url: url,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log("데이타 로드 실패");
			} else {
				console.log(result);
				var position;
				switch (result.data.position) {
				case "1" : position = "팀장"; break;
				case "2" : position = "수석"; break;
				case "3" : position = "책임"; break;
				case "4" : position = "선임"; break;
				case "5" : position = "주임"; break;
				case "6" : position = "사원"; break;
				}
				$('.nav_user_name').text(result.data.name + " " + position);
				
				if (result.data.admin) {
					$('.admin_menu').show();
				}
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function logout() {
	var url = "../user/logout.json";
	
	$.ajax({
		url: url,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log("로그아웃 실패");
			} else {
				alert("로그아웃 되었습니다.");
				location.href = "../user/login.html";
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}


