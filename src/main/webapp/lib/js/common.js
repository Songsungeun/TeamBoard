/**
 * Common js
 */

const DEBUG = true;

$(document).ready( function() {
	loadNav();
	ajaxLoginCheck();
	authCheck();
});

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

function ajaxLoginCheck() {
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
				console.log("로그인 상태");
			}
		},
		error : function(err) {
			console.log("err message: " + err.data);
			alert("오류발생");
			location.href = "../user/login.html";
		}
	})
}

function loadNav() {
	$(".sidebar").load("../common_html/nav_bar.html");
//	$("#nav_bar").load("../main/Mainpage2.html");
}

function authCheck() {
	var host = $(location).attr('pathname');
	var path = host.split('/')[3];
	console.log("path : " + path);
	
	if (path = 'noticeBoardDetail.html') {
		console.log("디테일 페이지");
	}
	
}
Paging = function(totalCnt, dataSize, pageSize, pageNo, param) {
	totalCnt = parseInt(totalCnt); // 전체 레코드 수
	dataSize = parseInt(dataSize); // 페이지당 보여줄 데이터 수
	pageSize = parseInt(pageSize); // 페이지 그룹 범위
	pageNo = parseInt(pageNo); // 현재 페이지
	
	var parameter;
	var html = new Array();
	
	if (totalCnt == 0) {
		return "";
	}
	
	// 페이지 카운트
	var pageCnt = totalCnt % dataSize;
	
	if (pageCnt == 0) {
		pageCnt = parseInt(totalCnt / dataSize);
	} else {
		pageCnt = parseInt(totalCnt / dataSize) + 1;
	}
	
	var prevCnt = parseInt(pageNo / pageSize);
	if (pageNo % pageSize == 0) {
		prevCnt = parseInt(pageNo / pageSize) - 1;
	}
	
	// 이전 화살표
	if (pageNo > pageSize) {
		var s2;
		if (pageNo % pageSize == 0) {
			s2 = pageNo - pageSize;
		} else {
			s2 = pageNo - pageNo % pageSize;
		}
		html.push('<a href="../board/noticeBoard.html?');
		html.push(param);
		html.push(s2);
		html.push('">');
		html.push('◀');
		html.push('</a>');
	} else {
		html.push('<a href="#">\n');
		html.push('◀');
		html.push('</a>');
	}
	
	// paging Bar
	for (var index = prevCnt * pageSize + 1; index < (prevCnt + 1) * pageSize + 1; index++) {
		if (index == pageNo) {
			html.push('<strong>');
			html.push(index);
			html.push('</strong>');
		} else {
			html.push('<a href="../board/noticeBoard.html?');
			html.push(param);
			html.push(index);
			html.push('">');
			html.push(index);
			html.push('</a>');
		}
		
		if (index == pageCnt) {
			break;
		} else {
			html.push('|');
		}
	}
	
	// 다음 화살표
	if (pageCnt > (prevCnt + 1) * pageSize) {
		html.push('<a href="../board/noticeBoard.html?');
		html.push(param);
		html.push((prevCnt + 1) * pageSize + 1);
		html.push('">');
		html.push('▶');
		html.push('</a>');
	} else {
		html.push('<a href="#">');
		html.push('▶');
		html.push('</a>');
	}
	
	return html.join("");
}
