/**
 * 
 */
var boardCnt;
var paramFlag;
var currPage;

$(document).ready(function() {
	
	checkParam();
})

function checkParam() {
	var origin_param = $(location).attr('search').split('?')[1];
	var split_param = origin_param.split('&');
	
	var params = split_param[0].split('=');
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
	console.log("param[0] : " + params[0])
	if (params[0] == "type") {
		switch (params[1]) {
		case "notice" : showText = "[공지사항]"; break;
		case "common_issue" : showText = "[시장이슈]"; break;
		case "product_issue" : showText = "[제품별 시장 이슈]"; break;
		case "process" : showText = "[업무프로세스]"; break;
		case "product_term" : showText = "[제품 관련 용어 정리]"; break;
		case "no_name" : showText = "[익명 게시판]"; break;
		case "free" : showText = "[자유 게시판]"; break;
		case "pc_helper" : showText = "[PC 도움방]"; break;
		case "about_work_site" : showText = "[업무 관련 사이트]"; break;
		}
	} else {
		console.log("else")
		switch (params[1]) {
		case "team_notice" : showText = "[팀 내부 공지사항]"; break;
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
	console.log("text : " + showText);
	$('.type_name').text(showText);
}

function ajaxBoardListForType(type_name, pageNo) {
	var formData = new FormData();
	var url = "typeList.json";
	
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


