/**
 * 
 */
//$(document).ready(function() {
//	getBoardDetail();
//	addComment();
//})

require(['domReady', 'jquery', 'common'], function (domReady, $, common) {
		
		domReady(function() {
			DEBUG && console.log("board_detail.js domReady");
			common.loadNav();
			getBoardDetail();
			addComment();
		})
})

var returnType;

function addComment() {
	$('.add_comment').click(function(event) {

		if ($('.comment_content').val() == "" || $('.comment_content').val() == null) {
			alert("내용을 입력하세요");
			return false;
		}
		
		let formData = new FormData();
		let url = "inserComment.json";
		let boardNo = Number($('.board_no').val());
		let successCallback = function() {
			alert("등록 되었습니다.");
			location.reload(true);
		}		
		formData.append("boardNo", boardNo);
		formData.append("commentDescription", $('.comment_content').val());
		
		let limit = LimitString();
		
		if (limit) {
			require(['common'], function(common) {
				common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
			})
		} else {
			alert("글자수를 초과하였습니다. 최대 글자수는 1000자입니다.");
		}
	})
}

function getBoardDetail() {
	var param = $(location).attr('search').split('?')[1];
	var params = param.split('=');
	
	let successCallback = function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("데이타 로드 실패");
		} else {
			DEBUG && console.log(result);
			returnType = result.data.boardType; // 목록 돌아가기 위해 type 저장
			
			// Data 삽입
			insertData(result.data);
			
			if (result.data.userNo == result.data2.memberNo || result.data2.admin) {
				$('.login_user_btn').show();
			}
		}
	}
	
	var formData = new FormData();
	var url = "detail.json";
	
	if (params[1]) {
		formData.append("boardNo", params[1])
		
		require(['common'], function(common) {
				common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
		})
	} else {
		alert("오류 발생");
		location.href = "boardList.html"
	}
	
}

function ajaxDeleteBoard() {
	let param = $(location).attr('search').split('?')[1];
	let boardNo = param.split('=')[1];
	let dataNo= "boardNo=" + boardNo;
	let confirm_del = confirm("삭제하시겠습니까?");
	
	let successCallback = function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert(obj.data);
		} else {
			alert("삭제 되었습니다.");
			location.href = "../main/Mainpage.html";
		}
	};
	
	if (confirm_del) {
		require(['common'], function(common) {
			common.ajax("delete.json", dataNo, successCallback, common.fnAjaxErr, common.GET);
		})
//		$.ajax({
//			url : "delete.json",
//			data: dataNo,
//			processData: false,
//			contentType: false,
//			success : function(obj) {
//				var result = obj.jsonResult
//				if (result.state != "success") {
//					alert(obj.data);
//				} else {
//					alert("삭제 되었습니다.");
//					location.href = "../main/Mainpage.html";
//				}
//			},
//			error : function(err) {
//				alert("오류 발생");
//			}
//		})
	} else {
		return false;
	}
	
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
		case "product_issue" : type = "제품별 사양 및 이슈"; break;
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
	let source = $('#board_comment_template').html();
	
	require(['handlebars'], function(Handlebars) {
		let template = Handlebars.compile(source);
		let html = template(data);
		$('.tmp').append(html);
	})
//	var template = Handlebars.compile(source);
//	var html = template(data);
//	$('.tmp').append(html);
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

function moveToUpdate() {
	location.href = "../board/board_write.html?no=" + $('.board_no').val();
}

function moveToList() {
	
	if (document.referrer.split('/')[5] == "Mainpage.html") {
		location.href = "../board/boardList.html?type=" + returnType + "&pageNo=1"; 
	} else {
		history.go(-1);
	}
}