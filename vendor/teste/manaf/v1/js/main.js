
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
})

//Menu Mobile Device
$(function() {
    var $menuleft = $('nav#menuleft'),
        $menuright = $('nav#menuright'),
        $html = $('html, body');

//Left Menu Panel        

    $menuleft.mmenu({
        dragOpen: true

    });

    $menuleft.find( 'li > a' ).on(
        'click',
        function( e )
        {
            var href = $(this).attr( 'href' );

            //  if the clicked link is linked to an anchor, scroll the page to that anchor 
            if ( href.slice( 0, 1 ) == '#' )
            {
                $menuleft.one(
                    'closed.mm',
                    function()
                    {
                        setTimeout(
                            function()
                            {
                                $html.animate({
                                    scrollTop: $( href ).offset().top
                                }); 
                            }, 10
                        );  
                    }
                );
            }
        }
    );

//Right Menu Panel

    $menuright.mmenu({
       "slidingSubmenus": false,
       "offCanvas": {
          "position": "right"
       }
    });
});


//Booking Steps

$(function() {
    $('#rootwizard').bootstrapWizard({

        onNext: function(tab, navigation, index) {
            //if(index==4) {
              //  $('.finish').addclass('show');
                // verif name
               /* if(!$('#name').val()) {
                    alert('oups');
                    $('#name').focus();
                    return false;
                }*/
          //  }
            
           
            // $('#tab3').html('Hello, ' + $('#name').val());
         
            
        }, onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#rootwizard').find('.bar').css({width:$percent+'%'});

            //console.log($current);

        $('.finish').hide();
            if($current==4) {
                 $('.finish').show();
            } else {
                $('.finish').hide();
            } 

        }, onFinish:function(tab, navigation, index) {

        


        }

     });

});

//Cartes listes

$(function(){
    $('form.formbookin').click(function(){
        if($('#optionscarte1').is(":checked")){
            $('.liste-cartes').show();
        } else {
            $('.liste-cartes').hide();
        } 

    });

});


