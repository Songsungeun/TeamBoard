/**
 * 
 */

function write_add() {
	
	var formData = new FormData();
	var url = "add.json";
	
	formData.append("title", $("#title").val());
	formData.append("descripition", $(".write_desc_area").val());
	formData.append("category", $(".write_desc_area").val());
}