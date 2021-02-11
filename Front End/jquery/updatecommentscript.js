$(document).ready(function(){
	var allcookies = document.cookie;
	$('#btn1').click(function(){
	
		updateComment();
	});
    var userid;
    var postid;
    
	var date;
	var id=$(location).attr('href').split("=")[1];
	var updateComment=function(){
		
		$.ajax({
		url:"http://localhost:16504/api/Comments/"+Cookies.get('userid'),
		method:"PUT",
		header:"Content-Type:application/json",
		data:{
		
            
            comID: id,
            comUserID: userid,
            comPostID: postid,
            comment1: $("#body").val(),
            createdAT: date
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
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