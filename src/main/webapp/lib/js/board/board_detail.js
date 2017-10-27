/**
 * 
 */
$(document).ready(function() {
	getBoardDetail();
	addComment();
})

function addComment() {
	$('.add_comment').click(function(event) {

		var formData = new FormData();
		var url = "inserComment.json";
		var boardNo = Number($('.board_no').val());
		console.log(typeof($('.board_no').val()));
		console.log(typeof(boardNo));
		console.log(boardNo);
		
		formData.append("boardNo", boardNo);
		formData.append("commentDescription", $('.comment_content').val());
		var limit = LimitString();
		if (limit) {
			ajaxAddComment(formData, url);
		} else {
			alert("글자수를 초과하였습니다. 최대 글자수는 1000자입니다.");
		}
	})
}

function getBoardDetail() {
	var param = $(location).attr('search').split('?')[1];
	console.log(param);
	var params = param.split('=');
	
	var formData = new FormData();
	var url = "detail.json";
	
	if (params[1]) {
		formData.append("boardNo", params[1])
		ajaxGetBoard(formData, url)
	} else {
		alert("오류 발생");
		location.href = "noticeBoard.html"
	}
	
}

function ajaxGetBoard(formData, url) {
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
				insertData(result.data);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

// Part 변경시 해당 영역 변경 변경
function insertData(data) {
	$('.board_title').text(data.title);
	$('.author_name').text(data.userName);
	$('.cre_dt').text(data.date);
	$('.board_content').html(data.description);
	$('.board_no').val(data.boardNo);
	var type;
	var category;
	if (data.category) {
		switch(data.category) {
		case "team_notice" : category = "팀 내부 공지사항"; break;
		case "work_notice" : category = "업무 관련 공지사항"; break;
		case "sat" : category = "SAT"; break;
		case "room_speaker" : category = "ROOM SPEAKER"; break;
		case "multiroom" : category = "MULTIROOM APP"; break;
		case "band" : category = "BAND APP"; break;
		case "bd_hes" : category = "BD/HES"; break;
		case "pvr" : category = "PVR"; break;
		case "ss_connect" : category = "SAMSUNG CONNECT"; break;
		case "convergence" : category = "CONVERGENCE"; break;
		}
		
		$('.page_title').text(category + "+");
		$('.board_type').text(category);
		$('.board_type').attr("href", "noticeBoard.html?category=" + data.category);
	} else {
		switch(data.boardType) {
		case "notice" : type = "공지사항"; break;
		case "common_issue" : type = "시장이슈"; break;
		case "product_issue" : type = "제품별 시장 이슈"; break;
		case "process" : type = "업무프로세스"; break;
		}
		
		$('.page_title').text(type + "+");
		$('.board_type').text(type);
		$('.board_type').attr("href", "noticeBoard.html?type=" + data.boardType);
	}
	getCommentList();
}

function ajaxAddComment(formData, url) {
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
				console.log(result)
			} else {
				alert("등록 되었습니다.");
				location.reload(true);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err);
		}
	})
}

function getCommentList() {
	var boardNo = Number($('.board_no').val());
	var formData = new FormData();
	var url = "getComment.json";
	
	formData.append("boardNo", boardNo);
	
	$.ajax({
		url: url,
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log("댓글 로드 실패");
				console.log(result)
			} else {
				console.log(result);
				showBoardList(result);
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err);
		}
	})
}

function showBoardList(data) {
	var source = $('#board_comment_template').html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$('.tmp').append(html);
}

function LimitString() {
	var maxLength = 1000;
	var length = $('.comment_content').val().length;
	if (length <= maxLength) {
		return true;
	} else {
		return false;
	}
	
}