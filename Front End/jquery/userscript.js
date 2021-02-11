$(document).ready(function(){
	var userid;
	$("#submitbtn").click(function(){
		addUser();
		//document.location.href="index.html";
	});
	$("#loginsubmit").click(function(){
		loginUser();
		//var url="http://localhost/MyBlog/index.html";
		//$(location).attr('href',url);
		//document.location.href="index.html";
	});
	var loginUser=function(){
		var username1=$("#uname").val();
		var password1=$("#pass").val();
		if($("#uname").val() == "" && $("#pass").val() == "")
		{
			$('#nameErr').show();
			$('#nameErr').html("username required");
			$('#passErr').show();
			$('#passErr').html("Password required");
		}
		else if(username1 == "")
		{
			$('#nameErr').html("username required");
		}
		else if(password1 == "")
		{
			$('#passErr').html("Password required");
		}
		else
		{
		$.ajax({
		url:"http://localhost:16504/api/users",
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				//console.log("hello world");
				var data=xmlhttp.responseJSON;
				var username=$("#uname").val();
				var password=$("#pass").val();
				var str="";
				for (var i = 0; i < data.length; i++) {
					if(username==data[i].userName && password==data[i].userPassword)
					{
						Cookies.set("userid",data[i].userID);
						userid = Cookies.get('userid');
						console.log(userid);
						window.location="/MyBlog/home.html";
					}
					
				}
				//$("#err").html("incorrect");
			}
			else
			{
				$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	}
        var addUser=function(){
        var name=$("#name").val();
        var email=$("#email").val();
        var uname=$("#uname").val();
        var password=$("#password").val();
        var cpassword=$("#cpassword").val();
        if(name== "")
        {
        	$("#namee").html("name required");
        	//$("#emaile").html("email required");
        	//$("#unamee").html("uname required");
        	//$("#passe").html("password required");
        	//$("#cpasse").html("confirm password required");
        }
        else if(email=="")
        {
        	$("#emaile").html("email required");
        }
        else if(uname=="")
        {
        	$("#unamee").html("uname required");
        }
        else if(password=="")
        {
        	$("#passe").html("password required");
        }
        else if(cpassword=="")
        {
        	$("#cpasse").html("confirm password required");
        }
        else if(password!=cpassword)
        {
        	$("#msg").html("password does not match");
        }
        else{
		console.log("success");
		$.ajax({
		url:"http://localhost:16504/api/users",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			userName:$("#uname").val(),
			userEmail:$("#email").val(),
			userPassword:$("#password").val(),
			userType:"1",
			createdAt:new Date()
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				window.location="/MyBlog/index.html";
				//move();
				//alert("Created");
				//$("#msg").html("Created");
				//console.log("success");
				//header("http://localhost/MyBlog/index.html");
				//document.location.href=ur;
			}
			else
			{
				console.log("failed");
				$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	}
});