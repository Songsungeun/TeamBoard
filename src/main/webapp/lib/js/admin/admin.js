/**
 * 
 */

var source_user;
var source_required;
$(document).ready(function() {
	tabsFunc();
	ajaxGetUser();
})

window.onload = function() {
	source_user = $('#user_list').html();
	source_required = $('#required_list').html();
	
	console.log("source_user : " + source_user);
}

function tabsFunc() {

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        $(this).addClass("active").css("color", "white");
        var activeTab = $(this).attr("value");
        var target = '.' + $(this).attr("data-target");
        console.log("activeTab1 = " + activeTab);
        
        var url;
        if (target == '.user_tab') {
        	url = "../user/userList.json";
        	ajaxGetList(url, target, null);
        } else {
        	url = "../board/getAdminRequiredBoard.json";
        	ajaxGetList(url, target, 'notice');
        }
    });
}

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

function ajaxGetList(url, source, target, category) {
	var source;
	if (category != null) {
		console.log("category 있음 필독 보드")
		source = source_user;
	} else {
		console.log("category null 유저리스트");
		source = source_required; 
	}
	
	console.log("source_user: " + source_user);
	
	$.ajax({
		url: url,
		type: "GET",
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("데이터 로드 실패");
			} else {
				console.log(result);
				showList(result, source, target);
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