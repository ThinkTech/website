
$(document).ready(function() {
	$().UItoTop({ easingType: 'easeOutQuart' });
	$(".subscribe").click(function(event){
	   $(".plans .pricing").hide();
	   const form = $(".subscribe-form");
	   form.find("form").show();
	   form.find("p").hide();
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
 	   const subscription = {};
 	   subscription.contact = form.find("input[name=contact]").val();
 	   subscription.email = form.find("input[name=email]").val();
 	   subscription.structure = form.find("input[name=structure]").val();
 	   subscription.project = form.find("input[name=project]").val();
 	   subscription.plan = form.find("input[name=plan]").val();
 	   $.ajax({
 	     type: "POST",
 	     url: form.attr("action"),
 	     data: JSON.stringify(subscription),
 	     contentType : "application/json",
 	     success : function(response){
 		   const parent = form.parent();
 	 	   form.hide();
 	 	   parent.find("p").show();
 	 	   form.find(':input').not(':input[readonly]').not(':input[type=submit]').val("");
 	     },
 	     dataType : "json"
 	   });
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