/**
 * 
 */
$(document).ready(function() {
	
	checkParam();
})

function checkParam() {
	var param = $(location).attr('search').split('?')[1];
	var params = param.split('=');
	
	if (params[0] == "type") {
		console.log("type");
		ajaxBoardListForType(params[1]);
	} else {
		console.log("cat");
		ajaxBoardListForCategory(params[1]);
	}
}

function ajaxBoardListForType(type_name) {
	var formData = new FormData();
	var url = "typeList.json";
	
	formData.append("type", type_name)
	ajaxRequest(formData, url);
}

function ajaxBoardListForCategory(category_name) {
	var formData = new FormData();
	var url = "categoryList.json";
	
	formData.append("category", category_name);
	ajaxRequest(formData, url);
}


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
				console.log("데이타 로드 실패");
			} else {
				console.log(result);
				showBoardList(result)
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function showBoardList(data) {
	var source = $('#board_list_template').html();
	var template = Handlebars.compile(source);
	
	var html = template(data);
	$('.board_contents').append(html);
}