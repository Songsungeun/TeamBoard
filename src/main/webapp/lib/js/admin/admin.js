/**
 * 
 */

$(document).ready(function() {
	ajaxGetUser();
})


function ajaxGetUser() {
	var url = "../user/userList.json";
	
	$.ajax({
		url: url,
		type: "GET",
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("데이터 로드 실패");
			} else {
				console.log(result);
				showList(result, $('#user_list').html(), '.user_tab');
			}
		}
	})
}


function showList(result, source, target) {
	console.log("source : " + source);
//	var source = $('#user_list').html();
	var template = Handlebars.compile(source);
	var html = template(result);
	$(target).html(html);
}

function approveUser(userNo) {
	var url = "../user/approveUser.json";
	var param = "userNo=" + userNo;
	$.ajax({
		url: url,
		type: "GET",
		data: param,
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("승인 실패");
			} else {
				console.log(result);
				alert("승인 되었습니다.");
				location.reload();
			}
		}
	})
}

function setAdminUser(userNo, isAdmin) {
	var url = "../user/setAdminUser.json";
	var param = "userNo=" + userNo + "&admin=" + isAdmin;
	$.ajax({
		url: url,
		type: "GET",
		data: param,
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("승인 실패");
			} else {
				console.log(result);
				alert("적용 되었습니다.");
				location.reload();
			}
		}
	})
}