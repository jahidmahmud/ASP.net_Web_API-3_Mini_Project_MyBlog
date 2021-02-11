$(document).ready(function(){
	$('#postbtn1').click(function(){
		console.log("hello");
		updatePost();
	});
	var userid;
	var date;
	var id=$(location).attr('href').split("=")[1];
	var updatePost=function(){
		console.log($("#title").val());
		console.log($("#body").val())
		$.ajax({
		url:"http://localhost:16504/api/posts/"+id,
		method:"PUT",
		header:"Content-Type:application/json",
		data:{
			postUserID:userid,
			postTitle:$("#title").val(),
			postBody:$("#body").val(),
			published:1,
			createdAt:date
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				window.location="/MyBlog/mypost.html";
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	var loadPosts=function(){
		$.ajax({
		url:"http://localhost:16504/api/posts/"+id,
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				userid=data.postUserID;
				date=data.createdAt;
				$("#title").html(data.postTitle);
				$('#body').html(data.postBody);

			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}
	loadPosts();

});