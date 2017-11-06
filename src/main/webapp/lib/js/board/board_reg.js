/**
 * 
 */
var boardNo;
var agent = navigator.userAgent.toLowerCase();

$(document).ready(function() {
	initTinyMCE();
	chained();
	insertUserInfo();
	ajaxLoginCheck();
//	$('#board_type').on("change", chained());
	$(".sidebar").load("../common_html/nav_bar.html");
	$('#board_type').change(function(event){
		chained();
		isNoName();
	})
})

$(window).load(function() {
	isEdit();
	isNoName();
})

function chained() {
//	$("#category_list").chained("#board_type");
//	$('.product_issue').hide();
//	$('.notice').hide();
	
	$("#category_list_notice").hide();
	$("#category_list_product").hide();
	$("#category_list_etc").hide();
	
	var type = $("#board_type option:selected").val();
	if (type == "notice") {
		$('#category_list_notice').show();
	}
	if (type == "product_issue") {
		$('#category_list_product').show();
	}
	if (type == "etc_work") {
		$('#category_list_etc').show();
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
	    plugins : "noneditable,fullpage,help,link,contextmenu,textcolor,textpattern,save,preview,charmap,image",
	    menubar: "insert",
	    toolbar: "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyf,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,|,insertdate,inserttime,preview,|,forecolor,backcolor,|,font",
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
	
	// Validation
	if ($("#title").val() == "" || $("#title").val() == null) {
		alert("제목을 입력하세요.");
		return false;
	}
	
	// 내용은 미 입력 작성 가능하도록 설정
	
	if ($("#board_type option:selected").val() == "" || $("#board_type option:selected").val() == null) {
		alert("카테고리를 선택하세요");
		return false;
	}
	
	if ($("#board_type option:selected").val() == "no_name") {
		formData.append("showName", $('.show_box').prop("checked"));
	}
	
		// append
		formData.append("title", $("#title").val());
		formData.append("description", tinyMCE.activeEditor.getContent())
		formData.append("boardType", $("#board_type option:selected").val());
		
		if ($("#board_type option:selected").val() == "notice") {
			formData.append("category", $("#category_list_notice option:selected").val());
		} else if ($("#board_type option:selected").val() == "product_issue") {
			formData.append("category", $("#category_list_product option:selected").val());
		} else if ($("#board_type option:selected").val() == "etc_work") {
			formData.append("category", $("#category_list_etc option:selected").val());
		}
		
		formData.append("required", $('.required_box').prop("checked"));
		
		ajaxwriteRequest(formData, url);
		
}

function write_update() {
	var formData = new FormData();
	var url = "update.json";
	
	// Validation
	if ($("#title").val() == "" || $("#title").val() == null) {
		alert("제목을 입력하세요.");
		return false;
	}
	
	// 내용은 미 입력 작성 가능하도록 설정
	
	if ($("#board_type option:selected").val() == "" || $("#board_type option:selected").val() == null) {
		alert("카테고리를 선택하세요");
		return false;
	}
	
	if ($("#board_type option:selected").val() == "no_name") {
		formData.append("showName", $('.show_box').prop("checked"));
	}
	
	formData.append("boardNo", boardNo);
	formData.append("title", $("#title").val());
	formData.append("description", tinyMCE.activeEditor.getContent())
	formData.append("boardType", $("#board_type option:selected").val());
	
	if ($("#board_type option:selected").val() == "notice") {
		formData.append("category", $("#category_list_notice option:selected").val());
	} else if ($("#board_type option:selected").val() == "product_issue") {
		formData.append("category", $("#category_list_product option:selected").val());
	} else if ($("#board_type option:selected").val() == "etc_work") {
		formData.append("category", $("#category_list_etc option:selected").val());
	}
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
				console.log(result);
				if (result.data2 == "type") {
					location.href = "../board/noticeBoard.html?type=" + result.data + "&pageNo=1";
				} else if (result.data2 == "category") {
					location.href = "../board/noticeBoard.html?cat=" + result.data + "&pageNo=1";
				} else {
					alert("문제가 있습니다. 관리자에게 문의하세요.");
					location.href = "../main/Mainpage.html"; 
				}
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
		console.log("0 = " + params[0]);
		console.log("1 = " + params[1]);
		
		// 수정으로 들어온 경우
		if (params[0] == "no") {
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
		} else { // 수정이 아닌 경우
			console.log("수정 아님");
			if (params[0] == "type") {
				$("#board_type").val(params[1]);
				chained();
			} else if (params[0] == "cat"){
				console.log("cat 진입");
				console.log("param[1] = " + params[1])
				var type;
				switch (params[1]) {
				case "team_notice" : type = "notice"; break;
				case "work_notice" : type = "notice"; break;
				default : type = "product_issue"; break;
				}
				$("#board_type").val(type);
				chained();
				if (type == "notice") {
					$("#category_list_notice").val(params[1]);
				} else if (type == "product_issue") {
					$("#category_list_product").val(params[1]);
				}
			}
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
					
					// 공지 or 상품 타입은 하위 카테고리 있으므로 해당 select 선택되어 있도록 설정
					$("#board_type").val(result.data.boardType);
					chained();

					if (result.data.boardType == "notice") {
						$('#category_list_notice').val(result.data.category);
					} else if (result.data.boardType == "product_issue") {
						$('#category_list_product').val(result.data.category);
					} 
					
					// 필독 글인경우 기본으로 필독 체크되도록 설정
					if (result.data.required) {
						$("#required_box").prop('checked', true);
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

function isNoName() {
	if ($("#board_type option:selected").val() == "no_name") {
		$(".required_wrap").hide();
		$(".show_wrap").show();
	} else {
		$(".required_wrap").show();
		$(".show_wrap").hide();
	}
}
