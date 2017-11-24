/**
 * 
 */
var boardNo;
var agent = navigator.userAgent.toLowerCase();

//$(document).ready(function() {
//	initTinyMCE();
//	chained();
//	insertUserInfo();
//	ajaxLoginCheck();
//	$(".sidebar").load("../common_html/nav_bar.html");
//	$('#board_type').change(function(event){
//		chained();
//		isNoName();
//	})
//})

require(['domReady', 'jquery', 'common'], function (domReady, $, common) {
		
		domReady(function() {
			DEBUG && console.log("board_list.js domReady");
			common.loadNav();
			chained();
			$('#board_type').change(function(event){
				chained();
				isNoName();
			})
	})
})

$(window).load(function() {
	isEdit();
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
	
	formData = append_formData(formData);
	
	for (var pair of formData.entries()) {
	console.log(pair[0] + ', ' + pair[1]);
}
	
	require(['common'], function(common) {
		common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
	});
		
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
	formData = append_formData(formData);

	require(['common'], function(common) {
		common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
	});
}

function append_formData(formData) {
	if ($("#board_type option:selected").val() == "no_name") {
		formData.append("showName", $('.show_box').prop("checked"));
	}
	
	// append
	formData.append("title", $("#title").val());
	formData.append("description", CKEDITOR.instances.description.getData());
	formData.append("boardType", $("#board_type option:selected").val());
	
	if ($("#board_type option:selected").val() == "notice") {
		formData.append("category", $("#category_list_notice option:selected").val());
	} else if ($("#board_type option:selected").val() == "product_issue") {
		formData.append("category", $("#category_list_product option:selected").val());
	} else if ($("#board_type option:selected").val() == "etc_work") {
		formData.append("category", $("#category_list_etc option:selected").val());
	}
	
	formData.append("required", $('.required_box').prop("checked"));
	
	$($("#InputFile")[0].files).each(function(index, file) {
		formData.append("files", file)
	});
	
	return formData;
}

function insertUserInfo() {
	var dt = new Date();
	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	var day = dt.getDate();
	$(".current_date").text(year + '-' + month + '-' + day);
	$('user_name').text($("#user_name").val());
}

function isEdit() {
	DEBUG && console.log("is edit?");
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
			DEBUG && console.log("수정 아님");
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
	
	let successCallback = function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("데이타 로드 실패");
		} else {
			console.log(result);
//			insertData(result.data);
			
			if (result.data.userNo != result.data2.memberNo && !(result.data2.admin)) {
				alert("수정은 관리자나 작성자만 가능합니다.");
				location.href = "../main/Mainpage.html";
			} else {
				$('.write_btn').hide();
				$('.modify_btn').show();
				$('#title').val(result.data.title);
				$('.board_no').text(result.data.boardNo);
				console.log(result.data.description);
				CKEDITOR.instances.description.setData(result.data.description);
				$('.cre_dt').text(result.data.date);
				
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
				
				// 익명인지 체크후 체크박스 이름 변경
				isNoName();
			}
		}
	};
	
	require(['common'], function(common) {
		common.ajax(url, formData, successCallback, common.fnAjaxErr, common.POST);
	});
}

function isNoName() {
	console.log("isnoname1");
	console.log($("#board_type option:selected").val());
	if ($("#board_type option:selected").val() == "no_name") {
		$(".required_wrap").hide();
		$(".show_wrap").show();
	} else {
		$(".required_wrap").show();
		$(".show_wrap").hide();
	}
}

//작성, 수정 공용 success 함수
var successCallback = function(obj) {
	var result = obj.jsonResult
	if (result.state == "success") {
		alert("작성되었습니다.");
		console.log(result);
		if (result.data2 == "type") {
			location.href = "../board/boardList.html?type=" + result.data + "&pageNo=1";
		} else if (result.data2 == "category") {
			location.href = "../board/boardList.html?cat=" + result.data + "&pageNo=1";
		} else {
			alert("문제가 있습니다. 관리자에게 문의하세요.");
			location.href = "../main/Mainpage.html"; 
		}
	} else {console.log("else로 빠짐")}
};
