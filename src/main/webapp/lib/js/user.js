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
	ajaxLoginRequest(formData, url);
	
}

function fnCheck() {
	console.log("check");
    if ($("#txtLoginId").val() == "") {
        alert("로그인 아이디를 입력하세요.");
        return;
    }
    if ($("#txtPassword").val() == "") {
        alert("로그인 비밀번호를 입력하세요.");
        return;
    }
}