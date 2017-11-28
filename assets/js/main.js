
$(document).ready(function(){
	
	$("body").imagesLoaded().always(function(instance){
		$(".loader").delay(300).fadeOut(500);
	});
	
	// ANIMATION
	if($(".cover").length > 0){
		$(".cover").particleground({
			dotColor: "rgba(255,255,255,0.15)",
			lineColor: "rgba(255,255,255,0.15)",
			parallax: false
		});
	}
	
	
	// NAV
	$("#navigation").navigation();
	$("#navigation").fixed();
	$("#navigation").scrollspy();
	
	if($(window).scrollTop() > 10){
		$(".navigation-fixed-wrapper").addClass("navigation-onscroll");
	}
	
	
	// Apply styles on scroll
	$(window).scroll(function(){
		if($(window).scrollTop() > 10){
			$(".navigation-fixed-wrapper").addClass("navigation-onscroll");
		}
		else{
			$(".navigation-fixed-wrapper").removeClass("navigation-onscroll");
		}
	});
	
	// MAPS
	$('#map').locationpicker({
		location: {
			latitude: 48.8588208,
			longitude: 2.3495592
		},
		radius: 10
	});
	
	// FORM VALIDATION
	$("#contact-form").validate({
		errorLabelContainer: $("#error-container"),
		rules: {
            name: {
                required: true,
                minlength: 2,
                lettersonly: true
            },
            email: {
                required: true,
                minlength: 6,
                email: true
            },
			subject: {
                required: true,
                minlength: 2
            },
			message: {
                required: true,
                minlength: 6
            }
		},
		messages: {
            name: {
                required: "Please enter your name",
                minlength: "Minimum 2 characters",
                lettersonly: "Only letters please!"
            },
            email: {
                required: "Please enter your email address",
                minlength: "Minimum 6 characters",
                email: "That's an invalid email"
            },
			subject: {
                required: "Please enter the subject",
                minlength: "Minimum 2 characters"
            },
			message: {
                required: "Please enter your message",
                minlength: "Minimum 6 characters"
            }
		},
		success: function(label) {
            label.addClass("valid").html("<span class='text-capitalize'>" + $(label).attr("for") + ": Ok</span>");
        },
		submitHandler: function(element) {

            var ajaxform = $(element),
                url = ajaxform.attr('action'),
                type = ajaxform.attr('method'),
                data = {};

            $(ajaxform).find('[name="submit"]').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Sending...');


            ajaxform.find('[name]').each(function(index, value) {
                var field = $(this),
                    name = field.attr('name'),
                    value = field.val();

                data[name] = value;

            });

            $.ajax({
                url: url,
                type: type,
                data: data,
                success: function(response) {
                    if (response.type == 'success') {
                        $("#contact-form").before("<div class='alert alert-success' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + response.text + "</div>");
                        $(ajaxform).each(function() {
                            this.reset();
                            $(this).find('[name="submit"]').html('<i class="fa fa-paper-plane fa-fw"></i> Sent');
                        }).find('.valid').each(function() {
                            $(this).remove('label.valid');
                        })
                    } else if (response.type == 'error') {
                        $("#contact-form").before("<div class='alert alert-danger' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + response.text + "</div>");
                        $(ajaxform).find('[name="submit"]').text("Send the message");
                    }
                }
            });

            return false;
        }
	});
	
});