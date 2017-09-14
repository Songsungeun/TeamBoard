/**
 * Common js
 */

const DEBUG = true;




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
			    console.log(result.data)
			    return
			   }
			  }
	})
}