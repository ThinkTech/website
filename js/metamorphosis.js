const app = {};

app.ready = function(callback) { 
  document.addEventListener("DOMContentLoaded", function(event) {
	  if(callback) callback();
  }); 
};

const page = {};

page.wait = function(position) { 
	const wait = $("#wait");
	if(!position) {
	  wait.css("height",$(document).height()).show();
	}else {
		if(position.top) wait.css("padding-top",position.top+"px");
		if(position.left) wait.css("padding-left",position.left+"px");
		wait.show();
	}
};

page.release = function() { 
	const wait = $("#wait").hide();
	wait.css("padding-top","15%");
	wait.css("padding-left","0px");
};


page.init = function() {
	$("body").append('<div id="wait"><div id="loader"/></div>');
	$("body").append('<div id="alert-dialog-container" style="display:none">'+
			'<div><span data-translation="information">Information</span><span></span>'+
			'<a tabindex="3" id="alert-dialog-ok" data-translation="ok">OK</a></div></div>');
	$("#alert-dialog-container").on('keydown', function(event) {     
       switch (event.keyCode) {
            case 27:
            	$(document.activeElement).click();
                break;
            case 13:
            	$(document.activeElement).click();
                break;
       }
       return false;
	}); 
	$("body").append('<div id="confirm-dialog-container" style="display:none">'+
			'<div><span data-translation="confirmation">Confirmation</span>'+
			'<span class="confirmation-dialog-title"></span>'+
			'<a id="confirm-dialog-ok" tabindex="1" data-translation="ok">OK</a>'+
			'<a id="confirm-dialog-cancel" tabindex="2" data-translation="cancel">Cancel</a></div></div>');
	
	$("#confirm-dialog-cancel").click(function() { 
		$("#confirm-dialog-container").hide();
	});
	
	$("#confirm-dialog-container").on('keydown', function(event) {     
	        switch (event.keyCode) {
	            case 27:
	            	$(this).hide();
	                break;
	            case 9:
	            	document.activeElement == $("#confirm-dialog-ok")[0] ? $("#confirm-dialog-cancel").focus() : $("#confirm-dialog-ok").focus(); 
	            	break;
	            case 13:
	            	$(document.activeElement).click();
	                break;
	        }
	       return false;
	}); 
	
	$(window).scroll(function(){
	    if ($(this).scrollTop() > 300) {
	      $('.scrollToTop').fadeIn();
	    } else {
	      $('.scrollToTop').fadeOut();
	    }
	});
	$('.scrollToTop').click(function(){
	    $('html, body').animate({scrollTop : 0},800);
	    return false;
	});
	
	 $.each($("img"),function(index,element){
		const src = $(element).data("src");
		const delay = $(element).data("delay");
		if(!delay && src) $(element).attr("src",src);
	});
	
};


const alert = function(message,callback) {
	const container = $("#alert-dialog-container");
	$("span:nth-child(2)",container).html(message);
	container.show(0,function(){
		$("#alert-dialog-ok").one("click",function() {
			container.hide();
			if(callback)callback();
		}).focus();
	});
	return false;
};

const confirm = function(message,callback){
	$("body").trigger("click");
	const container = $("#confirm-dialog-container");
	$("span.confirmation-dialog-title",container).html(message);
	container.show(0,function(){
		$("#confirm-dialog-ok").unbind("click").click(function(){
			container.hide();
			callback();
		}).focus();
	});
};

app.ready(function() {
	page.init();
});