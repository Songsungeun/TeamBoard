/**
 * 
 */
var boardCnt;
var paramFlag;
var paramsForWrite;
var currPage;

$(document).ready(function() {
	
	checkParam();
})

$(window).load(function() {
	console.log("write: " + paramsForWrite);
	$("#write_btn").click(function() {
		location.href = "noticeBoardReg.html?" + paramsForWrite;
	})
})

function checkParam() {
	var origin_param = $(location).attr('search').split('?')[1];
	var split_param = origin_param.split('&');
	
	var params = split_param[0].split('=');
	paramsForWrite = split_param[0]; //writepage에 파라미터 전달할 변수
	
	paramFlag = split_param[0] + "&" + split_param[1].split('=')[0] + "=";
	currPage = split_param[1].split('=')[1];
	
	if (params[0] == "type") {
		ajaxBoardListForType(params[1], currPage);
	} else if(params[0] =="cat") {
		ajaxBoardListForCategory(params[1], currPage);
	} else {
		alert("parameter 값이 잘못되었습니다.")
	}
	
	insertBoardName(params);
}

function insertBoardName(params) {
	var showText;
	if (params[0] == "type") {
		switch (params[1]) {
		case "notice" : showText = "[공지사항]"; break;
		case "common_issue" : showText = "[시장이슈]"; break;
		case "product_issue" : showText = "[제품별 사양 및 이슈]"; break;
		case "process" : showText = "[업무프로세스]"; break;
		case "product_term" : showText = "[제품 관련 용어 정리]"; break;
		case "no_name" : showText = "[익명 게시판]"; break;
		case "free" : showText = "[자유 게시판]"; break;
		case "pc_helper" : showText = "[PC 도움방]"; break;
		case "about_work_site" : showText = "[업무 관련 사이트]"; break;
		case "my_place" : showText = "[나의 업무 공간]"; break;
		}
	} else {
		console.log("else")
		switch (params[1]) {
		case "team_notice" : showText = "[팀 내 공지사항]"; break;
		case "work_notice" : showText = "[업무 관련 공지사항]"; break;
		case "sat" : showText = "[SAT]"; break;
		case "room_speaker" : showText = "[ROOM SPEAKER]"; break; 
		case "multiroom" : showText = "[MULTIROOM APP]"; break;
		case "band" : showText = "[BAND APP]"; break;
		case "bd_hes" : showText = "[BD/HES]"; break;
		case "pvr": showText = "[PVR]"; break;
		case "ss_connect" : showText = "[SAMSUNG CONNECT]"; break;
		case "convergence" : showText = "[CONVERGENCE]"; break;
		case "alexa" : showText = "[ALEXA]"; break;
		
		}
	}
	$('.type_name').text(showText);
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
				boardCnt = result.data2
				showBoardList(result)
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function showBoardList(result) {
	var html;
	var paging;
	if (result.data2 <= 0) {
		html = "<tr style='background-color: #F0F0F0;'>" +
				"<td colspan='5' style='textalign: center;'> 게시물이 없습니다. </td>";
		
	} else {
		var source = $('#board_list_template').html();
		var template = Handlebars.compile(source);
		html = template(result);
		
		paging = Paging(result.data2, 10, 5, currPage, paramFlag);
		$('.paging').append(paging);
	}
	$('.board_contents').append(html);
}


