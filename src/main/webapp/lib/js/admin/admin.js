/**
 * 
 */
$(document).ready(function() {
	
	tabsFunc();
	ajaxGetUser();
})

function tabsFunc() {

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        $(this).addClass("active").css("color", "white");
        var activeTab = $(this).attr("value");
        console.log("activeTab = " + activeTab);
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
				showUserList(result);
			}
		}
	})
}

function showUserList(result) {
	var source = $('#user_list').html();
	var template = Handlebars.compile(source);
	var html = template(result);
	$('.user_tab').append(html);
}

