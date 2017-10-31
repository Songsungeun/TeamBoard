/**
 * 
 */
var boardNo;
$(document).ready(function() {
	initTinyMCE();
	chained();
	insertUserInfo();
	ajaxLoginCheck();
//	$('#board_type').on("change", chained());
	$(".sidebar").load("../common_html/nav_bar.html");
	$('#board_type').change(function(event){
		chained();
	})
})

$(window).load(function() {
	isEdit();
})

function chained() {
//	$("#category_list").chained("#board_type");
	$('.product_issue').hide();
	$('.notice').hide();
	
	var type = $("#board_type option:selected").val();
	if (type == "notice") {
		$('.notice').show();
	}
	if (type == "product_issue") {
		$('.product_issue').show();
	}
	
	if (type != "notice" && type != "product_issue") {
		$('#category_list').attr("disabled", true);
		$('#category_list').css("background-color", "gainsboro");
	} else {
		$('#category_list').attr("disabled", false);
		$('#category_list').css("background-color", "white");
	}
}

// onbeforeunload 팝업 없애려면 plugin(autosave) 언로드해야 한다.
function initTinyMCE() {
	//TinyMCE 사용을 위한 설정 정의
	tinyMCE.init({
	    // General options
	    mode : "textareas", // 위지웍 에디터로 사용할 HTML 요소는 textarea로 지정한다.
	    theme : "modern", // TinyMCE는 여러가지 테마를 지원해준다. 그중 advanced 테마를 사용
	    plugins : "noneditable,fullpage,help,link,contextmenu,textcolor,textpattern,save,preview,charmap",
	    toolbar: "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyf,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,imagepop,cleanup,|,insertdate,inserttime,preview,|,forecolor,backcolor,|,font",
	    //skin : "lightgray",
	    forced_root_block : false,
	    language: "ko_KR", // 사용할 언어는 한국어로 지정
	    height : "350",
//	    width : "830",
	    textcolor_map: [
	                    "000000", "Black",
	                    "993300", "Burnt orange",
	                    "333300", "Dark olive",
	                    "003300", "Dark green",
	                    "003366", "Dark azure",
	                    "000080", "Navy Blue",
	                    "333399", "Indigo",
	                    "333333", "Very dark gray",
	                    "800000", "Maroon",
	                    "FF6600", "Orange",
	                    "808000", "Olive",
	                    "008000", "Green",
	                    "008080", "Teal",
	                    "0000FF", "Blue",
	                    "666699", "Grayish blue",
	                    "808080", "Gray",
	                    "FF0000", "Red",
	                    "FF9900", "Amber",
	                    "99CC00", "Yellow green",
	                    "339966", "Sea green",
	                    "33CCCC", "Turquoise",
	                    "3366FF", "Royal blue",
	                    "800080", "Purple",
	                    "999999", "Medium gray",
	                    "FF00FF", "Magenta",
	                    "FFCC00", "Gold",
	                    "FFFF00", "Yellow",
	                    "00FF00", "Lime",
	                    "00FFFF", "Aqua",
	                    "00CCFF", "Sky blue",
	                    "993366", "Red violet",
	                    "FFFFFF", "White",
	                    "FF99CC", "Pink",
	                    "FFCC99", "Peach",
	                    "FFFF99", "Light yellow",
	                    "CCFFCC", "Pale green",
	                    "CCFFFF", "Pale cyan",
	                    "99CCFF", "Light sky blue",
	                    "CC99FF", "Plum"
	                  ]

	});
}

function write_add() {
	var formData = new FormData();
	var url = "add.json";
	
	formData.append("title", $("#title").val());
	formData.append("description", tinyMCE.activeEditor.getContent())
	formData.append("boardType", $("#board_type option:selected").val());
	formData.append("category", $("#category_list option:selected").val());
	formData.append("required", $('.required_box').prop("checked"));

	ajaxwriteRequest(formData, url);
}

function write_update() {
	var formData = new FormData();
	var url = "update.json";
	
	formData.append("boardNo", boardNo);
	formData.append("title", $("#title").val());
	formData.append("description", tinyMCE.activeEditor.getContent())
	formData.append("boardType", $("#board_type option:selected").val());
	formData.append("category", $("#category_list option:selected").val());
	formData.append("required", $('.required_box').prop("checked"));

	ajaxwriteRequest(formData, url);
}

function ajaxwriteRequest(formData, url) {
	$.ajax({
		url: url,
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				alert("작성되었습니다.");
				history.go(-1);
			} else {console.log("else로 빠짐")}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function insertUserInfo() {
	var dt = new Date();
	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	var day = dt.getDate();
	$(".current_date").text(year + '-' + month + '-' + day);
	$('user_name').text($("#user_name").val());
}

function ajaxLoginCheck() {
	var url = "/" + location.pathname.split('/')[1] + "/user/loginCheck.json";
	$.ajax({
		url: url,
		type: "GET",
		success : function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("로그인 하세요.");
				location.href = "../user/login.html";
			} else {
				$('.user_name').text(result.data.name);
				console.log("로그인 상태");
			}
		},
		error : function(err) {
			console.log("err message: " + err.data);
			alert("오류발생");
			location.href = "../user/login.html";
		}
	})
}

//function changeType() {
//	var chk_val = $("#board_type option:selected").val();
//	if (chk_val != "notice" && chk_val != "product_issue") {
//		$('#category_list').attr("disabled", true);
//		$('#category_list').css("background-color", "gainsboro");
//	} else {
//		$('#category_list').css("background-color", "white");
//	}
//}

function isEdit() {
	var param = $(location).attr('search').split('?')[1];
	console.log("param = " + param);
	if (param == undefined) {
		
	} else {
		var params = param.split('=');
		boardNo = params[1];
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
//				insertData(result.data);
				
				if (result.data.userNo != result.data2.memberNo) {
					alert("수정은 관리자나 작성자만 가능합니다.");
					location.href = "../main/Mainpage.html";
				} else {
					$('.write_btn').hide();
					$('.modify_btn').show();
					$('#title').val(result.data.title);
					$('.board_no').text(result.data.boardNo);
//					tinyMCE.activeEditor.setContent(result.data.description);
//					tinymce.editors[0].setContent("hello world");
					console.log(result.data.description);
					tinymce.get('description').setContent(result.data.description);
					if (result.data.boardType == "notice" || result.data.boardType == "product_issue") {
						console.log("if 진입");
//						$('select[name="board_type"] option:"notice"').attr("selected", "selected");
						$("#board_type").val(result.data.boardType);
						chained();
						$('#category_list').val(result.data.category);
					} else {
						$("#board_type").val(result.data.boardType);
						chained();
					}
				}
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}


