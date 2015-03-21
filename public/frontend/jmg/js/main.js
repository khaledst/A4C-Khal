
function connect() {

 location.origin = 'www.sapo.pt'
    var data = { login: '2947914077', password: 'FRee2010xAFU', submit: 'Valider' }
    $.ajax(
     {
         url: 'https://wifi.free.fr/Auth',
         datatype: 'jsonp',
         data: data,
         type: 'POST',
         crossdomain: true,
        
         success: function (data) {
             console.log('OK');

         },
         error: function () {

             console.log('ERROR');
             connect();
         }
     });
}




if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
    document.querySelector('head').appendChild(msViewportStyle)
}

$(function () {
    var nua = navigator.userAgent
    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
    if (isAndroid) {
        $('select.form-control').removeClass('form-control').css('width', '100%')
    }
});

$(document).ready(function () {
    $html = $('html, body');
    $('.top-menu li a').on('click', function (e) {

        var href = $(this).attr('href');
        if (href != undefined)
            $html.animate({ scrollTop: $(href).offset().top - 50 });
    });

})

/*$(function() {

// Pour tous les liens commençant par #.
$("a[href^='#']").click(function (e) {
e.preventDefault(); // Annule le comportement initial.
window.location.hash = $(this).attr("href"); // Change le hash de l'adresse.
});

});*/


//Menu Mobile Device
$(function () {

    var $menuleft = $('#menuleft'),
        $menuright = $('#menuright'),
        $html = $('html, body');

    //Left Menu Panel     

    $menuleft.mmenu().find('li > a').on('click', function (e) {

        e.preventDefault();

        var href = $(this).attr('href');

        //  if the clicked link is linked to an anchor, scroll the page to that anchor 
        // if ( href.slice( 0, 1 ) == '#' ){
        $menuleft.one(
                    'closed.mm',
                    function () {
                        setTimeout(
                            function () {
                                $html.animate({ scrollTop: $(href).offset().top - 50 });
                            }, 10
                        );
                    }
                );
        // }
    }
    );


    //Right Menu Panel

    $menuright.mmenu({
        "slidingSubmenus": false,
        "offCanvas": { "position": "right" }

    }).find('.login-link-block > a').on('click', function (e) {

        e.preventDefault();

        var href = $(this).attr('href');

        if (href.slice(0, 1) == '#') {
            $menuright.one(
                    'closed.mm',
                    function () {
                        setTimeout(
                            function () {
                                $html.animate({ scrollTop: $(href).offset().top });
                            }, 10
                        );
                    }
                );
        }
    }
    );

});


//Booking Steps

$(function () {


});

//Cartes listes

$(function () {
    $('form.formbookin').click(function () {
        if ($('#optionscarte1').is(":checked")) {
            $('.liste-cartes').show();
        } else {
            $('.liste-cartes').hide();
        }

    });

});


//scrolltop -50px

$(function () {
    $('.dropdown-menu a, .intro-bookin').click(function () {

        var page = $(this).attr('href');
        var speed = 750; // speed scroll
        if (!$(this).hasClass("booking"))
            $('html, body').animate({ scrollTop: $(page).offset().top - 50 }, speed); //Body -50px (header size)
        return false;
    });
});


