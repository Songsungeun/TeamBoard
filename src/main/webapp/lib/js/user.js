/**
 * sign up/in 관련 js
 */


function fnLogin() {
	
	var formData = new FormData();
	
	formData.append("userID", $("#user_id").val());
	formData.append("password", $("#user_password").val())
	formData.append("department", $("#user_department").val());
	formData.append("position", $("#user_position").val());
	formData.append("name", $("#user_name").val());
	formData.append("admin", "user");
	formData.append("permission", false);
	
	DEBUG && console.log("admin: " + $("#admin").val());
	DEBUG && console.log("함수 호출전: " + formData.get("userID"));
	DEBUG && console.log("함수 호출전: " + formData.get("password"));
	DEBUG && console.log("함수 호출전: " + formData.get("department"));
	DEBUG && console.log("함수 호출전: " + formData.get("position"));
	DEBUG && console.log("함수 호출전: " + formData.get("name"));
	DEBUG && console.log("함수 호출전: " + formData.get("admin"));
	DEBUG && console.log("함수 호출전: " + formData.get("permission"));
	
//	ajaxAddBoard(formData);
	var url = "signUp.json";
	ajaxRequest(formData, url);
	
}
