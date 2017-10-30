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
				$('.nav_user_name').text(result.data.name);
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


