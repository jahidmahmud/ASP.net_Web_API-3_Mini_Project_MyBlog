$(document).ready(function(){
	var allcookies = document.cookie;
	var loadPosts=function(){
		console.log(Cookies.get('userid'));
		$.ajax({
		url:"http://localhost:16504/api/posts/",
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].postTitle+"</td><td>"+data[i].postBody+"</td><td><a href='comment.html?id="+data[i].postID+"'>Comment</a></td></tr>";
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
});