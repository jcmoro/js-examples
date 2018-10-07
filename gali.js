// Jquery Events
function() {
        $('.mobile_menu_button').click(
            function() {
                $('.display_mobile_menu').toggle();
            }
        );
        $('form[id=form_search_blog]').submit(
            function () {
                if (document.getElementById('needle').value.length < 3) {
                    $('.error_search_blog').text('Mín. 3 carácteres de búsqueda');
                    $('#needle').css('border', 'solid #c80000 2px');
                    return false;
                }
        
                var reg = /^[a-z0-9\sáéíóúñ]+$/i;
                if (reg.test(document.getElementById('needle').value) === false) {
                    $('.error_search_blog').text('Solo letras y números');
                    $('#needle').css('border', 'solid #c80000 2px');
                    return false;
                }
                $('form[id=form_search_blog]').attr('action', '/blog/search/' + document.getElementById('needle').value);
            }
        );
        $('.gali-cookie-message__button').click(
            function () {
                controlcookies();
            }

        );
        $('.select-selected').click(
            function (e){
                e.stopPropagation();
                $('.select-hide').toggle();
            }
        );
        // Suscribete newsletter blog
        $('form[id=form-nls-blog-suscribete]').submit(
            function (){
                if(document.getElementById('amf-input-email_209').value === ""){
                    $('#aviso-nls-blog-email').text('El correo electrónico es necesario.');
                    $('#aviso-nls-blog-email').show();
                    return false;
                }
                if (document.getElementById('nls-form-acepto').checked === true) {
                    $('form[id=form-nls-blog-suscribete]').attr('action', '/addNewsletterMember');
                    return true;
                }
                $('#aviso-nls-blog-email').text('Debes leer y aceptar nuestra política de privacidad');
                $('#aviso-nls-blog-email').show();
                return false;
            }
        );
        // Suscribete newsletter modal
        $('form[id=form-nls-blog-suscribete-modal]').submit(
            function (){
                if(document.getElementById('amf-input-email_209_modal').value === ""){
                    $('#aviso-nls-blog-email-modal').text('El correo electrónico es necesario.');
                    $('#aviso-nls-blog-email-modal').show();
                    return false;
                }
                if (document.getElementById('nls-form-acepto-modal').checked === true) {
                    $('form[id=form-nls-blog-suscribete-modal]').attr('action', '/addNewsletterMember');
                    return true;
                }
                $('#aviso-nls-blog-email-modal').text('Debes leer y aceptar nuestra política de privacidad');
                $('#aviso-nls-blog-email-modal').show();
                return false;
            }
        );
        // Cerrar modal newsletter
        $('#close-modal-nls').click(
            function () {
                $('#modal-nls').hide();
                $('.shadow-modal-nls').hide();
            }
        )
        $('#linkPromo').click(
            function () {
                $('.shadow-modal-nls').show();
                $('#modal-nls').show();
            }
        )
        // Crear comentario blog
        $('form[name=appbundle_comentarioBlog]').submit(
            function () {
                if(document.getElementById('appbundle_comentarioBlog_email').value === ""){
                    $('#aviso-nls-comentario-email').text('El correo electrónico es necesario.');
                    $('#aviso-nls-comentario-email').show();
                    return false;
                }
                if (document.getElementById('nls-form-comentario-acepto').checked === true) {
                    return true;
                }
                $('#aviso-nls-comentario-email').text('Debes leer y aceptar nuestra política de privacidad');
                $('#aviso-nls-comentario-email').show();
                return false;
            }
        )
    }
);

function controlcookies() {
    // si variable no existe se crea (al clicar en Aceptar)
    localStorage.controlcookie = (localStorage.controlcookie || 0);

    localStorage.controlcookie++; // incrementamos cuenta de la cookie
    $('.gali-cookie-message--hidden').hide()
}
