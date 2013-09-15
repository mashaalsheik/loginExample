(function(window){

	function Login(){

		this.initialize = function(){
			bindEvents();
		}

		function bindEvents(){
			var request = null,
				serializedData = null;
			
			$("form.loginForm").submit(function(event){
				/*if form has novalidate attribute, handle how to validate*/
				if (!event.target.checkValidity()) {
		            event.preventDefault();
		        	displayErrorMessageForRequiredField(this);
		        } else {  
				  	if (request) {
				        request.abort();
				    }

				    serializedData = $(this).serialize();

				    request = $.ajax({
				        url: "http://api.apple.com/login",
				        type: "post",
				        data: serializedData
				    })
				    .done(function (response, textStatus, xhr){
				        console.log("Login succeeded");
				    })
				    .fail(function (xhr, textStatus, errorMsg){
				        console.error("Login Failed: "+ errorMsg);
				    })

			    event.preventDefault();
				}
			});
					    	
		};


		function displayErrorMessageForRequiredField(customForm){
			/* for every required input field */
	        $(customForm).find('input[required="true"]').each(function() {
	        	/* check if user has not input values */
	            if( ($(this).val() == $(this).attr('placeholder')) || ($(this).val() == '') ){
	                $(this).tooltip({trigger:'focus'});
	                //show the tooltip corresponding to this input field
	                $(this).tooltip('show');
	                return false;	                
	            } 
	        });
		};

	};

	window.Login = Login;

}(window));