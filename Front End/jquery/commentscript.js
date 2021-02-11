$(document).ready(function(){
	var allcookies = document.cookie;
	$('#btn1').click(function(){
		addComments();
	});
	var id=$(location).attr('href').split("=")[1];
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	var loadComments=function(){
		$.ajax({
		url:'http://localhost:16504/api/comments/'+id+'/comments',
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					if(data[i].comUserID!=Cookies.get('userid'))
					 {
						 str+="<tr><td>"+data[i].comUserID+"</td><td>"+data[i].comment1+"</td><td><a href='reply.html?id="+data[i].comID+"'>Reply</a></td><td></td></tr>";
					 }
					 else
						str+="<tr><td>"+data[i].comUserID+"</td><td>"+data[i].comment1+"</td><td><a href='reply.html?id="+data[i].comID+"'>Reply</a></td><td><a id='up' href='updatecomment.html?id="+data[i].comID+"'>Update</a></td><td><a id='up' href='deletecomment.html?id="+data[i].comID+"'>Delete</a></td></tr>";
					//str+="<tr><td>"+data[i].comUserID+"</td><td>"+data[i].comment1+"</td><td><a href='reply.html?id="+data[i].comID+"'>Reply</a></td><td><a href='updatecomment.html?id="+data[i].comID+"'>Update</a></td><td><a href='deletecomment.html?id="+data[i].comID+"'>Delete</a></td></tr>";
					$("#catList tbody").html(str);
					//str+="<tr><td></td><td>"+data[i].comment1+"</td><td><a href='updatecomment.html?id="+data[i].comID+"'>Update</a></td><td><a href='deletecomment.html?id="+data[i].comID+"'>Delete</a></td></tr>";
				}

			}
			else
			{
				$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}

loadComments();
var addComments=function(){
	var com=$("#comm").val();
	if(com == "")
	{
		$("#comErr").html("can't be empty");
	}
	else{
		$.ajax({
		url:"http://localhost:16504/api/comments",
		method:"POST",
		heade:"Content-Type:application/json",
		data:{
			comUserID:Cookies.get('userid'),
			comPostID:$(location).attr('href').split("=")[1],
			comment1:$("#comm").val(),
			createdAT:new Date()
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadComments();
				$("#comm").html("");
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
