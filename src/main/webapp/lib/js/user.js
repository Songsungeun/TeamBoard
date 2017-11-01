/**
 * sign up/in 관련 js
 */


function fnSignUp() {
	
	var formData = new FormData();
	var url = "signUp.json";
	
	formData.append("userID", $("#user_id").val());
	formData.append("password", $("#user_password").val())
	formData.append("department", $("#user_department").val());
	formData.append("position", $("#user_position").val());
	formData.append("name", $("#user_name").val());
	formData.append("admin", false);
	formData.append("permission", false);
	
	var check = fnSignUpCheck();
	if (check) {
		ajaxSignUpRequest(formData, url);
	}
	
}

function fnLogin() {
	
	var formData = new FormData();
	var url = "login.json";
	
	formData.append("userID", $("#txtLoginId").val());
	formData.append("password", $("#txtPassword").val())
	
	var check = fnCheck();
	if(check) {
		ajaxLoginRequest(formData, url);
	}
	
}

function ajaxSignUpRequest(formData, url) {
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
				alert("가입 되었습니다. 승인을 기다려 주세요.");
				location.href = "login.html";
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function ajaxLoginRequest(formData, url) {
	$.ajax({
		url: url,
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				console.log("페이지 이동");
				location.href = "../main/Mainpage.html"
			} else {
				alert(result.data);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function fnCheck() {
    if ($("#txtLoginId").val() == "") {
        alert("로그인 아이디를 입력하세요.");
        return false;
    }
    if ($("#txtPassword").val() == "") {
        alert("로그인 비밀번호를 입력하세요.");
        return false;
    }
    
    return true;
}

function fnSignUpCheck() {
	if ($("#user_id").val() == "") {
		alert("아이디를 입력하세요.");
		return false;
	}
	if ($("#user_name").val() == "") {
		alert("이름을 입력하세요.");
		return false;
	}
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
	
	if ($("#user_password").val() != $("#user_password_confirm").val()) {
		alert("비밀번호가 일치 하지 않습니다.");
		return false;
	}
	
	return true;
	
}

