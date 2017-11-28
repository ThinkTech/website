$(document).ready(function() {
	$().UItoTop({ easingType: 'easeOutQuart' });
	$(".subscribe").click(function(event){
	   $(".plans .pricing").hide();
	   const form = $(".subscribe-form");
	   const plan = $(this).data("plan");
	   $("input[name=plan]").val("plan "+plan);
	   if(plan == "personal"){
	      $("input[name=structure]").removeAttr("required").hide().prev().hide();
	   }else{
	      $("input[name=structure]").attr("required","true").show().prev().show();
	   }
	   form.removeClass().addClass("subscribe-form "+plan).show();
	   $('html,body').animate({scrollTop:form.offset().top-20},1000);
	});	
    $(".subscribe-form .close").click(function(event){
	   $(".subscribe-form").hide();
	});	
    $(".subscribe-form form").submit(function(event){
 	   const form = $(this);
 	   form.parent().hide();
 	   return false;
 	});	
    $(".plan-details").click(function(event){
	   $(".plans .pricing").hide();
	   const plan = $(this).data("plan");
	   const top = event.pageY;
	   $(".plans").css("top",top-250);
	   const div = $(".plans ."+plan).show();
	   $('html,body').animate({scrollTop:div.offset().top-20},1000);
	   return false;
	});	
    $(".plans .pricing .close").click(function(event){
	   $(".plans .pricing").hide();
	});				
});