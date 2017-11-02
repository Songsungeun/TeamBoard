/**
 * mypage 관련 js
 */
var pw_flag = false;
$(document).ready(function() {
	getMyInfo();
})

function getMyInfo() {
	var url = "/" + location.pathname.split('/')[1] + "/user/loginCheck.json";
	$.ajax({
		url: url,
		type: "GET",
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("로그인 하세요.");
				location.href = "../user/login.html";
			} else {
				$("#user_name").val(result.data.name);
				$("#user_id").val(result.data.userID);
				$("#user_department").val(result.data.department);
				$("#user_position").val(result.data.position);
			}
		},
		error : function(err) {
			console.log("err message: " + err.data);
			alert("오류발생");
			location.href = "../user/login.html";
		}
	})
}

function fnCancelBtn() {
	location.href = "../main/Mainpage.html";
}

function updateMyInfo() {
	if (validationInfo()) {
		var formData = new FormData();
		var url = "updateinfo.json";
		
		if (pw_flag) {
			formData.append("newPassword", $("#new_user_password").val());	
		}
		
		formData.append("password", $("#user_password").val());
		formData.append("userID", $("#user_id").val());
		formData.append("department", $("#user_department").val());
		formData.append("position", $("#user_position").val());
		
		$.ajax({
			url: url,
			data: formData,
			processData: false,
			contentType: false,
			type: "POST",
			success : function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert(result.data)
				} else {
					alert("변경되었습니다.");
					location.reload();
				}
			},
			error : function(err) {
				alert("오류 발생");
				console.log("err message : " + err.data);
			}
		})
	}
}


function showRePW() {
	if (pw_flag) {
		$("#new_user_password").val("");
		$("#new_user_password_confirm").val("");
		$("#re_pw").hide();
		$("#re_pw_confirm").hide();
		pw_flag = false;
	} else {
		$("#re_pw").show();
		$("#re_pw_confirm").show();
		pw_flag = true;
	}
}

function validationInfo() {
	
	// 비밀번호 변경시
	if ($("#new_user_password").val()) {
		if ($("#new_user_password").val() != $("#new_user_password_confirm").val()) {
			alert("신규 비밀번호와 재입력된 비밀번호가 다릅니다.");
			return false;
		}
	} else { // 비밀번호 미 변경시
		if ($("#user_password").val() == "") {
			alert("비밀번호를 입력하세요.");
			return false;
		}
		if ($("#user_department").val() == 0) {
			alert("부서를 선택하세요.")
			return false;
		}
		if ($("#user_position").val() == 0) {
			alert("직급을 선택하세요.");
			return false;
		}
	}
	
	return true;
}