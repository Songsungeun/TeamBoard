/**
 * sign up/in 관련 js
 */

require(['domReady'], function (domReady) {
	require(['jquery'], function ($) {
		
		domReady(function() {
			$('.login_btn').on("click", fnLogin);
			$('.signbtn').on("click", fnSignUp);
			enterLogin();
		})
	})
})

fnAjaxFail = function(err) {
		alert("오류 발생");
		console.log("err message : " + err.data);
	};
	
fnLogin = function () {
	let formData = new FormData();
	let url = "login.json";
	
	formData.append("userID", $("#txtLoginId").val());
	formData.append("password", $("#txtPassword").val())
	
	let fnSuccess = function(obj) {
		let result = obj.jsonResult
		if (result.state == "success") {
			location.href = "../main/Mainpage.html"
		} else {
			alert(result.data);
		}
	};
	
	if(fnLoginCheck()) {
		console.log("check 진입");
		require(['common'], function(common) {
			common.ajax(url, formData, fnSuccess, fnAjaxFail, common.POST);
		})
	}
	
}

fnSignUp = function (){
	
	var formData = new FormData();
	var url = "signUp.json";
	
	formData.append("userID", $("#user_id").val());
	formData.append("password", $("#user_password").val())
	formData.append("department", $("#user_department").val());
	formData.append("position", $("#user_position").val());
	formData.append("name", $("#user_name").val());
	formData.append("admin", false);
	formData.append("permission", false);
	
	let fnSuccess = function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert(result.data)
		} else {
			alert("가입 되었습니다. 승인을 기다려 주세요.");
			location.href = "login.html";
		}
	}
	
//	var check = fnSignUpCheck();
	if (fnSignUpCheck()) {
		require(['common'], function(common) {
			common.ajax(url, formData, fnSuccess, fnAjaxFail, common.POST);
		})
	}
	
}

var fnLoginCheck = function () {
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
	
	var idReg = /^[a-z]+[a-z0-9]{5,19}$/g;
    if( !idReg.test( $("#user_id").val() ) ) {
    	if ($("#user_id").val() == "admin") { return true; } // 편의를 위해 관리자 최초 가입시 admin으로 가입하면 바로 관리자 권한 획득
        alert("아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.");
        return;
    }

	return true;
}

function enterLogin() {
	
	$("#txtPassword").keypress(function (e) {
		
		if (e.keyCode == 13) {
			fnLogin();
		}
	});
}    
