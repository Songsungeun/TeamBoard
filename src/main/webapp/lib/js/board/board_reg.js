/**
 * 
 */
$(document).ready(function() {
	initTinyMCE();
	chained();
	insertUserInfo();
	ajaxLoginCheck();
})

function chained() {
	$("#category_list").chained("#board_type");
}
function initTinyMCE() {
	//TinyMCE 사용을 위한 설정 정의
	tinyMCE.init({
	    // General options
	    mode : "textareas", // 위지웍 에디터로 사용할 HTML 요소는 textarea로 지정한다.
	    theme : "modern", // TinyMCE는 여러가지 테마를 지원해준다. 그중 advanced 테마를 사용
	    plugins : "noneditable,autosave,fullpage,help,link,contextmenu,textcolor,textpattern,save,preview,charmap",
	    toolbar: "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyf,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,imagepop,cleanup,|,insertdate,inserttime,preview,|,forecolor,backcolor,|,font",
	    //skin : "lightgray",
	    forced_root_block : false,
	    language: "ko_KR", // 사용할 언어는 한국어로 지정
	    height : "350",
	    width : "830",
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
	formData.append("descripition", tinyMCE.activeEditor.getContent())
	formData.append("boardType", $("#board_type option:selected").val());
	formData.append("category", $("#category_list option:selected").val());
	
	DEBUG && console.log("title : " + formData.get("title"));
	DEBUG && console.log("descripition : " + formData.get("descripition"));
	DEBUG && console.log("boardType : " + formData.get("boardType"));
	DEBUG && console.log("category : " + formData.get("category"));
	
	ajaxwriteRequest(formData, url);
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
			}
		},
		error : function(err) {
			console.log("err message: " + err.data);
			alert("오류발생");
			location.href = "../user/login.html";
		}
	})
}

