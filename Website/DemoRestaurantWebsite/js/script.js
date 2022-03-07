// run when DOMContentLoaded
$(function () {
	$("#addModal").load("LoginModal.html").hide();

	$("#navbarToggle").blur(function(event){
		var screenWidth = window.innerWidth;
	    if (screenWidth < 768) {
	      $("#collapsable-nav").collapse('hide');
	    }
	})

	$("#navbarToggle").click(function (event) {
	    $(event.target).focus();
	});

	$("#Login_id").click(function (event) {
	    $('#addModal').toggle();
	});

	setMainMenu();

	var c_width = $(window).width();
	var c_hight = $(window).height();
	document.getElementById('copy-right').innerHTML = "&copy; Jeff Ho 2022 w:"+c_width+"px h:"+c_hight+"px";
});

//check window size
$(window).resize(
	function(){
		var c_width = $(window).width();
		var c_hight = $(window).height();
		document.getElementById('copy-right').innerHTML = "&copy; Jeff Ho 2022 w:"+c_width+"px h:"+c_hight+"px";
		console.log('width= ' +c_width
			+' height= '+c_hight);
	}
);

/*About us page*/
function resetForm(){//reset form in About Us page
	document.getElementById("contact-us-form").reset();
}

//check email vail
var checkemail = function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('Email_id').value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function fakeSendEmail(){
	function printObject(o) {
	  var out = 'This is a fake json return value created by Js!\n';
	  for (var p in o) {
	    out += p + ': ' + o[p] + '\n';
	  }
	  alert(out);
	}

	if(checkemail()){
		var data = {
			Title : document.getElementById('Title_id').value,
			Email : document.getElementById('Email_id').value,
			Description : document.getElementById('Description_id').value
		};
		console.log("Data for email: ", data);
		printObject(data); // show fake json
	}
}
/*-----------------------------*/




/*FAQs Page*/
function updateLiveChart(){
	//readTextFile("..\Data\chat_demo.txt");
	var data = { // use objecy to similar json
		"unknow":"Please call us for more information: 999-888-777-66",
		"us":"This is a DEMO website created by Jeff Ho!",
		"delivery":"We do delivery on all zone in NO city",
		"address":"Our address is :77, ABC Street, NO city, AB33 DP79",
		"phone":"Call us with: 999-888-777-66"
		}
	var getMessage = function(){
		var input = $('#live_chat_text_id').val();
		var cus = "Customer: ";
		var result = "";
		// default
		if($('#live_chart_result_id').text() != ""){
				result = $('#live_chart_result_id').text()+"\n"+
				cus+input+"\n"+
				data["unknow"];
		}
		else{
			result = cus+input+"\n"+
			data["unknow"];
		}
		// ans
		for(var key in data){
			var temp_input = input.toLowerCase();
			console.log(cus +" "+ temp_input);
			if(temp_input.includes(key)){
				if($('#live_chart_result_id').text() != ""){
					result = $('#live_chart_result_id').text()+"\n"+
					cus+input+"\n"+
					data[key];
				}
				else{
					result = cus+input+"\n"+
					data[key];
				}
			}
		}


		$('#live_chart_result_id').text(""); // empty live_chart_result_id
		return result;
	}
	$('#live_chart_result_id').append(getMessage);
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
/*-----------------------------*/


/* special Menu */
function getTodaySpecial(){ 
	var special_instructions;
	$.getJSON( "/myWebPage/Data/categories.json", function( json ) {
		special_instructions = json[0].special_instructions;
		$('#today_specials_p_id').html(
		"<p>"+special_instructions+"</p>"
		);
	})
	.done(function() {
	    console.log( "Read Json success " );
	})
	.fail(function() {
	    console.log( "error" );
	});	
	
	$('#specials_menu_id').toggle();
}
/* ------------------------------------ */

/* Menu */
function setMainMenu(){
	$.getJSON( "/myWebPage/Data/categories.json", function( data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
	    items.push( 
	    	'<div class="col">'+
	    	'<div class="card shadow-sm">'+
	    	'<img src="/myWebPage/images/menu/'+val.short_name+'/'+val.short_name+'.jpg" class="py-3 img-fluid" alt="'+val.short_name+'">'+
	    	'<div class="card-body">'+
	    	'<h4>'+val.name+'</h4>'+
	    	'<p class="card-text">'+val.special_instructions+'</p>'+
	    	'<div class="d-flex justify-content-between align-items-center">'+
	    	'<div class="btn-group">'+
	    	'<button type="button" class="btn btn-sm btn-outline-secondary" onclick="alert(\''+val.name+'\');">View</button>'+
	    	'</div></div></div></div></div>'
	    	);
	 
	  });
	 
	  $( "<div/>", {
	  	class: "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3",
	    html: items.join("")
	  }).appendTo( "#mainMeue-content" );
	});
	
	
}
/*-----------------------------*/





