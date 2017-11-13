/**
 *  main.js for require.js
 */

require.config({
	shim: {
		"bootstrap" : {"deps"   : ['jquery']},
		"domReady" : ["jquery"]
	},
	
	paths: {
		'common': '../common',
		'jquery' : '../jquery-3.2.1.min',
		'bootstrap' : '../../bootstrap/dist/js/bootstrap.min',
		'domReady' : 'domReady',
		'handlebars' : '../handlebars/handlebars-v4.0.11'
	}
})

// debug에서만 콘솔 찍기위해 선언한 변수
var DEBUG = true;
DEBUG && console.log("require Config");
require(['domReady', 'jquery', 'common'], function (domReady, $, common) {
		
		domReady(function() {
			if (!exceptLoginCheckUrl()) {
				require(['common'], function(common) {
					
					let successCallback = function(obj) {
						var result = obj.jsonResult;
						if (result.state != "success") {
							alert(result.data);
							location.href = "../user/login.html";
						} else {
							DEBUG && console.log("로그인 상태");
							common.setUser(result.data.name, result.data.position, result.data.memberNo);
						}
					};
					
					let errorCallback = function(err) {
						console.log("err message: " + err.data);
						alert("오류발생");
						location.href = "../user/login.html";
					};
					
					var url = "/" + location.pathname.split('/')[1] + "/user/loginCheck.json";
					common.ajax(url,null,successCallback, errorCallback, common.GET)
				})
			}
		})
})

// 프론트와 백단을 분리해놔서 서버에서 인터셉터 적용하기 번거로워
// this 스크립트에서 login check
// 회원 가입과 로그인 페이지는 제외
function exceptLoginCheckUrl() {
	let path = location.pathname.split('/')[3];
	if (path == "signup.html" || path == "login.html") {
		// todo login Check
		DEBUG && console.log("제외 url");
		return true;
	}
	
	return false;
}

