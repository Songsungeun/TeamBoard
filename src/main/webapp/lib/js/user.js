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
	
	DEBUG && console.log(formData.get("userID"));
	ajaxRequest(formData, url);
	
}

function fnLogin() {
	
	var formData = new FormData();
	var url = "login.json";
	
	formData.append("userID", $("#txtLoginId").val());
	formData.append("password", $("#txtPassword").val())
	
//	console.log("userID : " + formData.get("userID"));
//	console.log("password : " + formData.get("password"));
	var check = fnCheck();
	if(check) {
		console.log("if")
		ajaxLoginRequest(formData, url);
	}
	
}

function ajaxRequest(formData, url) {
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
			} else {DEBUG && console.log(result.data)}
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

