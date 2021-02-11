$(document).ready(function(){
	$('#btn2').click(function(){
		addReply();
	});
	var id=$(location).attr('href').split("=")[1];
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	var loadReplies=function(){
		$.ajax({
		url:'http://localhost:16504/api/replies/'+id+'/replies',
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td></td><td>"+data[i].reply1+"</td><td></td></tr>";
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

loadReplies();
var addReply=function(){
	var com=$("#comm").val();
	if(com == "")
	{
		$("#comErr").html("can't be empty");
	}
	else{
		$.ajax({
		url:"http://localhost:16504/api/replies/",
		method:"POST",
		heade:"Content-Type:application/json",
		data:{
			reply1:$("#comm").val(),
			comID:id
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadReplies();
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
