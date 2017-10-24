/**
 * 
 */

$(document).ready(function() {
	
	ajaxLoginCheck();
	
})
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#noticemenu')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  
  if (!event.target.matches('#noticemenu2')) {

      var dropdowns = document.getElementsByClassName("dropdown-content2");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
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
				$("#user_department").text(result.data.department + "팀");
				$("#user_name").text(result.data.name);
				$("#user_position").text(result.data.position);
				console.log("login 상태");
			}
		},
		error : function(err) {
			console.log("err message: " + err.data);
			alert("오류발생");
			location.href = "../user/login.html";
		}
	})
}

function fnLogout() {
		console.log("aaaaa");
}