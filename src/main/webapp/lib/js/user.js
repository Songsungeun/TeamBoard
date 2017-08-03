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
	formData.append("admin", "admin");
	
	console.log("함수 호출전: " + formData.get("userID"));
	console.log("함수 호출전: " + formData.get("password"));
	console.log("함수 호출전: " + formData.get("department"));
	console.log("함수 호출전: " + formData.get("position"));
	console.log("함수 호출전: " + formData.get("name"));
	console.log("함수 호출전: " + formData.get("admin"));
	
//	ajaxAddBoard(formData);
	
}
