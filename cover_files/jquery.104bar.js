function jq_104bar(){
/************* 104 alertbar & global bar created by lindsay.hsieh @ 20120307 *************/
/***** 1.4.3+ *****/
    $("body").removeClass('no-js'); // Removes the class 'no-js' from the body to let us know javascript is enabled

    var showingDropdown;//current drop down menu
    var showingParent;  //current drop down menu parent

    var hideAlertBar = function() { //hide all alert bar
        if(showingDropdown){
            showingDropdown.find('.global_sub').slideUp('fast');
            showingParent.find('.active').removeClass('active');
        }
    }
    /* for each li which has global_sub drop down menu */
	$("ul.global_nav li").has(".global_sub").each(function(){
        var dropdown = $(this);
        var menu = dropdown.find(".global_sub");
        var parent = dropdown.parent();

        var showAlertBar = function(){
            hideAlertBar();
			menu.show(); //fix 1.4.2
            menu.slideDown('fast');
            showingDropdown = dropdown.addClass('active');
            showingParent = parent;
        }

        /* function to show drop down when clicked */
        dropdown.bind('click',function(e) {
            if(e) e.stopPropagation();
            var target = $( e.target );
            // if you click on the current dropdwon li or a , hide alertbar
            if(dropdown.hasClass("active")){
                if(target.parents().hasClass("global_nav")){
                    hideAlertBar();
                }
            }else{
                showAlertBar();
            }
        });
    })

    /* hide when clicked outside */
    $(document.body).bind('click',function(e) {
        if(showingParent) {
            if(showingDropdown.hasClass("active")){
                var parentElement = showingParent[0];
                if(!$.contains(parentElement,e.target)){
                    hideAlertBar();
                }
            }
        }
    });
}