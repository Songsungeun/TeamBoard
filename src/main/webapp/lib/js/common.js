/**
 * Common js
 */

const DEBUG = true;
var userNo;

define(function() {
	
	return {
		GET:"GET",
		POST:"POST",
		
		/**
		 * ajax 공통으로 쓰기 위한 함수
		 * @param url
		 * @param data (formData)
		 * @param successCallback
		 * @param failCallback
		 * @param methodType
		 * @param isAsync (가끔 동기 방식이 필요할 수도 있어서 일단 추가)
		 */
			
		ajax: function(url, data, successCallback, failCallback, methodType, isAsync) {
			return $.ajax({
				url: url,
				type: methodType,
				processData: false,
				contentType: false,
				async: (isAsync === false ? false : true),
				data: data,
				success : successCallback,
				error : failCallback
			});
		},
		
		getPostion: function(positionNo) {
			let position;
			
			switch(positionNo) {
			case "1" : position = "팀장"; break;
			case "2" : position = "수석"; break;
			case "3" : position = "책임"; break;
			case "4" : position = "선임"; break;
			case "5" : position = "주임"; break;
			case "6" : position = "사원"; break;
			}
			
			return position;
		}
	};
});


//$(document).ready( function() {
//	loadNav();
//	if ($(location).attr('pathname').split('/')[3] != "mypage.html") {
//		console.log("마이 페이지 아님");
//		ajaxLoginCheck();
//	} 
//	console.log("common.js")
//});
//
//function ajaxRequest(formData, url) {
//	$.ajax({
//		url: url,
//		data: formData,
//		processData: false,
//		contentType: false,
//		type: "POST",
//		success : function(obj) {
//			var result = obj.jsonResult
//			if (result.state != "success") {
//				alert(result.data)
//			} else {DEBUG && console.log(result.data)}
//		},
//		error : function(err) {
//			alert("오류 발생");
//			console.log("err message : " + err.data);
//		}
//	})
//}
//
//function ajaxLoginCheck() {
//	var url = "/" + location.pathname.split('/')[1] + "/user/loginCheck.json";
//	$.ajax({
//		url: url,
//		type: "GET",
//		success : function(obj) {
//			var result = obj.jsonResult;
//			if (result.state != "success") {
//				alert(result.data);
//				location.href = "../user/login.html";
//			} else {
//				console.log("로그인 상태");
//			}
//		},
//		error : function(err) {
//			console.log("err message: " + err.data);
//			alert("오류발생");
//			location.href = "../user/login.html";
//		}
//	})
//}
//
//function loadNav() {
//	$(".sidebar").load("../common_html/nav_bar.html");
////	$("#nav_bar").load("../main/Mainpage2.html");
//}
//
//// 페이징 함수
//Paging = function(totalCnt, dataSize, pageSize, pageNo, param) {
//	totalCnt = parseInt(totalCnt); // 전체 레코드 수
//	dataSize = parseInt(dataSize); // 페이지당 보여줄 데이터 수
//	pageSize = parseInt(pageSize); // 페이지 그룹 범위
//	pageNo = parseInt(pageNo); // 현재 페이지
//	
//	var parameter;
//	var html = new Array();
//	
//	if (totalCnt == 0) {
//		return "";
//	}
//	
//	// 페이지 카운트
//	var pageCnt = totalCnt % dataSize;
//	
//	if (pageCnt == 0) {
//		pageCnt = parseInt(totalCnt / dataSize);
//	} else {
//		pageCnt = parseInt(totalCnt / dataSize) + 1;
//	}
//	
//	var prevCnt = parseInt(pageNo / pageSize);
//	if (pageNo % pageSize == 0) {
//		prevCnt = parseInt(pageNo / pageSize) - 1;
//	}
//	
//	// 이전 화살표
//	if (pageNo > pageSize) {
//		var s2;
//		if (pageNo % pageSize == 0) {
//			s2 = pageNo - pageSize;
//		} else {
//			s2 = pageNo - pageNo % pageSize;
//		}
//		html.push('<a href="../board/noticeBoard.html?');
//		html.push(param);
//		html.push(s2);
//		html.push('">');
//		html.push('◀');
//		html.push('</a>');
//	} else {
//		html.push('<a href="#">\n');
//		html.push('◀');
//		html.push('</a>');
//	}
//	
//	// paging Bar
//	for (var index = prevCnt * pageSize + 1; index < (prevCnt + 1) * pageSize + 1; index++) {
//		if (index == pageNo) {
//			html.push('<strong>');
//			html.push(index);
//			html.push('</strong>');
//		} else {
//			html.push('<a href="../board/noticeBoard.html?');
//			html.push(param);
//			html.push(index);
//			html.push('">');
//			html.push(index);
//			html.push('</a>');
//		}
//		
//		if (index == pageCnt) {
//			break;
//		} else {
//			html.push('|');
//		}
//	}
//	
//	// 다음 화살표
//	if (pageCnt > (prevCnt + 1) * pageSize) {
//		html.push('<a href="../board/noticeBoard.html?');
//		html.push(param);
//		html.push((prevCnt + 1) * pageSize + 1);
//		html.push('">');
//		html.push('▶');
//		html.push('</a>');
//	} else {
//		html.push('<a href="#">');
//		html.push('▶');
//		html.push('</a>');
//	}
//	
//	return html.join("");
//}
