/**
 * Requeridos:  jQuery.
 */
 
$(function() {

  var nlsCustomServices='';

  function setGigyaCookie(cookieBox) {
        
        $.cookie.raw = false; //it will be encoded
        $.cookie("vocuser_arealibre_newsletters", "UID=|newsletters=" + cookieBox, {
            expires: 1, //expires in 10 days

            path: '/', //The value of the path attribute of the cookie 
            //(default: path of page that created the cookie).

            domain: '.domain' //The value of the domain attribute of the cookie
            //(default: domain of page that created the cookie).

            secure: false 	//If set to true the secure attribute of the cookie
                    //will be set and the cookie transmission will
                    //require a secure protocol (defaults to false).
        });

        return true;
    }
    
    $(":checkbox").on("click", function(){
      checkers();
    });

    // Open modal with buttoms login/register
    $(".ap-btn.js-abrirmodal:button").on('click', function(e){
        gigyaUX.updateCustomerServiceInCookieVocUser("160", nlsCustomServices);
    });

    function checkers() {
      var cookieBox='';
      var nlsCustomServices='';

      $(":checkbox:checked").each(function(i,e){
            if(e.hasAttribute("id")) {
                cookieBox+=e.id+'*';
                if(nlsCustomServices.length > 0){
                    nlsCustomServices+=",";
                }
                nlsCustomServices+=e.id;
            }
        });
      setGigyaCookie(cookieBox.slice(0,-1));
    }  
});
