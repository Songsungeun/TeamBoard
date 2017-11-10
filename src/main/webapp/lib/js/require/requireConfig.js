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
		'jquery' : '../../jquery/dist/jquery.min',
		'bootstrap' : '../../bootstrap/dist/js/bootstrap.min',
		'domReady' : 'domReady',
		'handlebars' : '../handlebars/handlebars-v4.0.11'
	}
})

// debug에서만 콘솔 찍기위해 선언한 변수
var DEBUG = true;
DEBUG && console.log("require Config");
//require(['domReady', 'jquery'], function (domReady, $) {
//		
//		domReady(function() {
//			if (!exceptLoginCheckUrl()) {
//				require(['common'], function(common) {
//					common.loadNav();
//				})
//			}
//		})
//})

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

