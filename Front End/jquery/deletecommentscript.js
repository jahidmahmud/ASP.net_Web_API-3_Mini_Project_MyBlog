$(document).ready(function(){
	$('#yesbtn1').click(function(){
		
		DeleteComment();
    });
    
    $('#nobtn1').click(function(){
		window.location="/MyBlog/mypost.html";
		
	});
	var userid;
	var date;
	var id=$(location).attr('href').split("=")[1];
	var DeleteComment=function(){
	
		$.ajax({
		url:"http://localhost:16504/api/comments/"+id,
		method:"Delete",
		header:"Content-Type:application/json",
		
		complete:function(xmlhttp,status){
			if(xmlhttp.status==204)
			{
				window.location="/MyBlog/home.html";
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	var loadComments=function(){
		$.ajax({
			url:"http://localhost:16504/api/comments/"+id,
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
                comment=data.comment1;
                userid=data.comUserID;
                postid=data.comPostID;
                date=data.createdAT;
				
				
				$('#body').html(comment);

			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}
	loadComments();

});