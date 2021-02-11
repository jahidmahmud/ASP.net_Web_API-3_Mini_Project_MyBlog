$(document).ready(function(){
	var allcookies = document.cookie;
	$('#postbtn').click(function(){
		addPost();
		//document.location.href="index.html";
	});
	var loadPosts=function(){
		$("#title").html("");
		$("#body").html("");
		$.ajax({
		url:'http://localhost:16504/api/posts/'+Cookies.get('userid')+'/posts',
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].postTitle+"</td><td>"+data[i].postBody+"</td><td><a href='comment.html?id="+data[i].postID+"'>Comment</a></td><td><a href='update.html?id="+data[i].postID+"'>Update</a></td><td><a href='delete.html?id="+data[i].postID+"'>Delete</a></td></tr>";
					$("#catList tbody").html(str);
				}

			}
			else
			{
				$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}

loadPosts();

var addPost=function(){
		var title=$('#title').val();
		var body=$('#body').val();
		if(title=="" && body=="")
		{
			$('#titleErr').html("title required");
			$('#bodyErr').html("body required");
		}
		else if(title=="")
		{
			$('#titleErr').html("title required");
		}
		else if(body=="")
		{
			$('#bodyErr').html("body required");
		}
		else
		{
		$.ajax({
		url:"http://localhost:16504/api/posts",
		method:"POST",
		heade:"Content-Type:application/json",
		data:{
			postUserID:Cookies.get('userid'),
			postTitle:$('#title').val(),
			postBody:$('#body').val(),
			published:1,
			createdAt:new Date()
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadPosts();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
}
});