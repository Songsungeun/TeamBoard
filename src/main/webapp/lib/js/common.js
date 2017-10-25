/**
 * Common js
 */

const DEBUG = true;

$(document).ready( function() {
	loadNav();
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
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}



function ajaxwriteRequest(formData, url) {
	$.ajax({
		url: url,
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				alert("작성되었습니다.");
				location.reload();
			} else {DEBUG && console.log("else로 빠짐")}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function loadNav() {
//	$("#nav_bar").load("../common_html/nav_bar.html");
//	$("#nav_bar").load("../main/Mainpage2.html");
}
