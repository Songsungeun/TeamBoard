/**
 * 
 */
var boardCnt;
var paramFlag;
var paramsForWrite;
var currPage;

require(['domReady', 'jquery', 'common'], function (domReady, $, common) {
		
		domReady(function() {
			DEBUG && console.log("board_list.js domReady");
			common.loadNav();
			checkParam();
		})
		
		$(".write_btn").click(function() {
			location.href = "write_board.html?" + paramsForWrite;
		})
})
//$(document).ready(function() {
//	
//	checkParam();
//	var user = new User('Alice');
//	console.log(user.say()); // My name is Alice
//
//	var admin = new Admin('Bob');
//	console.log(admin.say()); // [Administrator] My name is Bob
//	
//	console.log("boardList.js");
//})

function checkParam() {
	var origin_param = $(location).attr('search').split('?')[1];
	var split_param = origin_param.split('&');
	
	var params = split_param[0].split('=');
	paramsForWrite = split_param[0]; //writepage에 파라미터 전달할 변수
	
	DEBUG && console.log("paramsForWrite = " + paramsForWrite);
	paramFlag = split_param[0] + "&" + split_param[1].split('=')[0] + "=";
	currPage = split_param[1].split('=')[1];
	
	if (params[0] == "type") {
		ajaxBoardListForType(params[1], currPage);
	} else if(params[0] =="cat") {
		ajaxBoardListForCategory(params[1], currPage);
	} else {
		alert("parameter 값이 잘못되었습니다.")
	}
	DEBUG && console.log("param : " + params)
	insertBoardName(params);
}

function insertBoardName(params) {
	let showText;
	
	require(['common'], function(common) {
		showText = common.setTypeName(params);
		$('.type_name').text(showText);
	})
}

function ajaxBoardListForType(type_name, pageNo) {
	var formData = new FormData();
	var url = "typeList.json";
	
	if (type_name == "no_name") {
		formData.append("no_name", true);
	} else {
		formData.append("no_name", false);
	}
	
	formData.append("type", type_name);
	formData.append("pageNo", pageNo);
	ajaxRequest(formData, url);
}

function ajaxBoardListForCategory(category_name, pageNo) {
	var formData = new FormData();
	var url = "categoryList.json";
	
	formData.append("category", category_name);
	formData.append("pageNo", pageNo);
	ajaxRequest(formData, url);
}


function ajaxRequest(formData, url) {

	let successCallback = function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("데이타 로드 실패");
		} else {
			console.log(result);
			boardCnt = result.data2
			showBoardList(result)
		}
	}; 
	
	require(['common'], function(common) {
		common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
	})
	
}

function showBoardList(result) {
	let html;
	let paging;
	if (result.data2 <= 0) {
		html = "<tr style='background-color: #F0F0F0;'>" +
				"<td colspan='5' style='textalign: center;'> 게시물이 없습니다. </td>";
		
	} else {
		let source = $('#board_list_template').html();
		
		require(['handlebars'], function(Handlebars) {
			let template = Handlebars.compile(source);
			html = template(result);
			$('.board_contents').append(html);
		})
		
		require(['common'], function(common) {
			paging = common.Paging(result.data2, 10, 5, currPage, paramFlag);
			$('.paging').append(paging);
		})
	}
}


