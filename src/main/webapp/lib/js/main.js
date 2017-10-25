/**
 * 
 */

$(document).ready(function() {
	
	tabsFunc();
	ajaxRequest();
})

function tabsFunc() {
	$(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "white");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
}

function ajaxRequest() {
	
	var formData = new FormData();
	formData.append("type", "notice");
	formData.append("position", "main");
	var url = "../board/mainList.json";
	
	$.ajax({
		url: url,
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log("데이타 로드 실패");
			} else {
				console.log(result);
				showNoticeList(result.data);
				showIssueList(result.data);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function showNoticeList(data) {
	var source = $('#main_notice').html();
	var template = Handlebars.compile(source);
	
	var html = template(data);
	$('.notice_table').append(html);
}

function showIssueList(data) {
	var source = $('#issue_notice').html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$('.issue_table').append(html);
}