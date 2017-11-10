/**
 * 
 */

require(['domReady'], function (domReady) {
		
		domReady(function() {
			require(['jquery'], function(jquery) {
				console.log("!13211");
				tabsFunc();
			})
		})
})


//$(document).ready(function() {
//	
//	var source = $('#product_list').html();
//	var template = Handlebars.compile(source);
//	tabsFunc(source, template);
//	ajaxRequest(source, template);
//})

function tabsFunc(source, template) {

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        $(this).addClass("active").css("color", "white");
        var activeTab = $(this).attr("value");
//        ajaxProductRequest($(this).attr("value"), source, template);
    });
}

function ajaxRequest(source, template) {
	
	var formData = new FormData();
	formData.append("category1", "team_notice");
	formData.append("category2", "work_notice");
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
				showWorkList(result.data);
				showTeamList(result.data);
				showProductList(result.data, source, template);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function ajaxProductRequest(category, source, template) {
	console.log("product ajax 호출");
	var formData = new FormData();
	var url = "../board/productList.json";
	formData.append("category", category);
	
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
				showProductList(result.data, source, template);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function showWorkList(data) {
	var source = $('#main_notice').html();
	var template = Handlebars.compile(source);
	
	var html = template(data);
	$('.notice_table').append(html);
}

function showTeamList(data) {
	var source = $('#issue_notice').html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$('.issue_table').append(html);
}

function showProductList(data, source, template) {
	var html;
	if (data.productNoReq <= 0 && data.productReq <= 0) {
		html = "<tr style='background-color: #F0F0F0;'>" +
		"<td colspan='3' style='text-align: center;'> 게시물이 없습니다. </td>";
	} else {
		html = template(data);
	}
	$('.product_tab').html(html);
}