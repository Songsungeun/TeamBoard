/**
 * 
 */

require(['domReady'], function (domReady) {
		
	domReady(function() {
		require(['jquery', 'common'], function ($, common) {
			
			$('.logout_btn').click(function(event) {
				logout();
			})
			
			showContent();
			DEBUG && console.log("loading nav.js");
			
			insertUserData(common.getUser().name, common.getPostion(common.getUser().position));
		})
		
	})
})

function insertUserData(name, position) {
	$('.user_name').text(name);
	$('.user_position').text(position);
}

function logout() {
	var url = "../user/logout.json";
	
	$.ajax({
		url: url,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log("로그아웃 실패");
			} else {
				alert("로그아웃 되었습니다.");
				location.href = "../user/login.html";
			}
		},
		error : function(err) {
			alert("오류 발생");
			console.log("err message : " + err.data);
		}
	})
}

function showContent() {
	$(function(){
		  $('.notice_dropdown').mouseenter(function(){
		    $('.notice_content').css('display', 'block');
		  });
		  $('.notice_dropdown').mouseleave(function(){
			  $('.notice_content').css('display', 'none');
		  });
		});
	
	$(function(){
		  $('.issue_dropdown').mouseenter(function(){
		    $('.issue_content').css('display', 'block');
		  });
		  $('.issue_dropdown').mouseleave(function(){
			  $('.issue_content').css('display', 'none');
		  });
		});
	
	$(function(){
		  $('.etc_dropdown').mouseenter(function(){
		    $('.etc_content').css('display', 'block');
		  });
		  $('.etc_dropdown').mouseleave(function(){
			  $('.etc_content').css('display', 'none');
		  });
		});

	$(function(){
		  $('.admin_menu').mouseenter(function(){
		    $('.admin_content').css('display', 'block');
		  });
		  $('.admin_menu').mouseleave(function(){
			  $('.admin_content').css('display', 'none');
		  });
		});
}



