/// <reference path="../../js/jquery-2.1.0-vsdoc.js" />
var departing = null;
var arrival = null;
var mode = null;
var picked_offer = null;
var final_trip = null;
var current_booking = null;



$(document).ready(function () {


    var card =  new Card({
            form: document.querySelector('#mastercard'),
            container: '.card-wrapper'
    });


    $('.reservation').click(function(){
        
       set_booking_form();
          $(".payment").slideUp();
          $(".payment-confirm").slideUp();
          //reset form
         $(".ico-card-status").removeClass('active');
         $("#departing").val("");
         $("#arrival").val("");
          current_booking = null;
          picked_offer = null;
          final_trip = null;
         $('#rootwizard').bootstrapWizard('first');


    })

    $("#pay").click(function(){
        $(".tarif_loader").fadeIn();
        $.get('/mangopay/bookings/pay/' + current_booking.id).done(function(result){
            
           var status = JSON.parse(result);
           parse_status(status);

           $('#rootwizard').bootstrapWizard('next');
           if(status.result)
           {  
                $(".booking-complete.success").slideDown();
                $(".booking-complete.warning").slideUp();
                $(".invoive_link").click(function(){
                    window.open('/documents/booking/' + current_booking.id + '/pdf');
                })
           }
           else
           {
                $(".booking-complete.success").slideUp();
                $(".booking-complete.warning").slideDown()

           }
           $(".tarif_loader").fadeOut();
           $('.next').hide();
           $('.finish').hide();

        })

    })

    $("#validate-card").click(function(){
        
        $(".ico-card-status").removeClass('active');
        var card = new Object();
        card.cardName = $("#mastercard").find("#name").val();
        card.cardNumber =  $("#mastercard").find("#number").val().replace(' ',"").replace(' ',"").replace(' ',"")
        card.cardExpirationDate =  $("#mastercard").find("#expiry").val();
        card.Cvx = $("#mastercard").find("#cvc").val();
          $(".tarif_loader").fadeIn();
        if(card.cardName.length > 0 && card.cardNumber.length == 16  && card.cardExpirationDate.length > 0 && card.Cvx.length > 0)
        {
            $("#number").val(""); $("#cvc").val("");
           $.get('mangopay/validatecard/' + current_booking.id, {data: JSON.stringify(card) }).done(function(result){
                 $(".tarif_loader").fadeOut();
            var status = JSON.parse(result);
            parse_status(status);
            if(status.result)
            {
                if(status.data.Status =='VALIDATED')
                {
                    $(".ico-card-status").addClass('active');
                    $('.next').hide();
                    $('.finish').hide();
                    $(".payment").slideUp();
                    $(".payment-confirm").slideDown();

                }
                else
                {
                    
                    toastr.error('BOOKING EXPIRED, PLEASE CONFIRM THE ORDER AGAIN');
                    $(".payment").slideUp();
                    $(".payment-confirm").slideDown();


                }

            }


        })


        }
        else
        {
            toastr.warning('CARD DETAILS ARE NOT VALID; PLEASE VERIFY THE ENTERED DATA');
        }

 
        return false;


    })



 $(".options .booking").click(function(){
     


     if($("#bookings-section").length > 0)
     {
         
          $html = $('html, body');
          $html.animate({ scrollTop: $("#bookings").offset().top - 50 });

     }
     else
     {
         
           $.get("customer/front").done(function (data) {
               
          
                    $("#section2").after(data);
                    set_auth_ui();
                    $html = $('html, body');
                    $html.animate({ scrollTop: $("#bookings-section").offset().top - 50 });
                
            })

     }

     return false;

 })


  set_booking_form();
   
 

})

var wizard  = new Object();
wizard.step2 = false;
wizard.step3 = false;
wizard.step4 = false;
wizard.step5 = false;

function set_booking_form()
{
    wizard.step2 = false;
    wizard.step3 = false;
    wizard.step4 = false;
    wizard.step5 = false;

      //departing date
    $('#departing_date_ctrl').attr("data-date", get_date());
    $('#departing_date_ctrl').datepicker().on('changeDate', function(ev){
   
        data_date  =parse_date_picker2($('#departing_date').val());
        $('#departing_date').val(data_date).change();
    });

    //departing time
    $(".time input").val(get_time()).change().attr("value", get_time());
    $('.time').clockpicker();

    $('#rootwizard').bootstrapWizard({

        onNext: function (tab, navigation, index) {
        
           $(".nofication").slideUp();

            if (index == 2) {
                current_booking = null;
                $('#confirm_order').show();
                var validator = $(".trip").validate();
                validator.form();
                if (validator.errorList.length == 0) 
                {
                    wizard.step2  = true;
                    get_tarifs();
                
                }
                else
                {
                    wizard.step2  = false;;
                    return false;
                }
            }

            if (index == 4) {
                set_booking_details();
            }
          
           
        }, onTabShow: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var percent = (index / total) * 100;
            $('#rootwizard').find('.bar').css({ width: percent + '%' });

            //console.log($current);
            
            $('.finish').hide();
            
            if(index < 4)
            {
                if(wizard.step4 == true)
                   $("#reservation").find("[href='#tab5']").click();

            }
          
            if (index < 2) {
                $('.next').show();
            }



            if (index == 2) {
                if(!wizard.step2)
                    $('#rootwizard').bootstrapWizard('previous');
                else
                    $('.next').hide();
            }
          

          
            if (index >= 3) {
                if(!wizard.step2 &&  !wizard.step3)
                    $('#rootwizard').bootstrapWizard('previous');

                if(index== 3 && wizard.step2)
                    $('.next').show();

            }

            if(index > 4)
            {
                 $('.next').hide();
                 $('.previous').hide();
                 $('.finish').hide();
            }


            
            



        }, onFinish: function (tab, navigation, index) {




        }

    });

      $("#trip-value-estimation").slider({
                        range: "max",
                        min: 1,
                        max: 8,
                        value: 1,
                        step: 0.5,
                        slide: function (event, ui) {

                            $("#trip-value-estimation-value").text(ui.value + ' HOURS').change();
                        }
                    });

    departing = new google.maps.places.Autocomplete(document.getElementById('departing'));
    google.maps.event.addListener(departing, 'place_changed', function () {

      
        if( departing.getPlace() != null)
        {
         var place = departing.getPlace();
         var address = place.formatted_address;

            $("#departing").data("lat", place.geometry.location.lat())
            $("#departing").data("lng", place.geometry.location.lng());
           
         }

     

    });



     set_slider_trip_value();
     $("#trip_method .btn").click(function () {
        
        var value = $(this).find("input").data("value");
         console.log(value);
        switch (value) {
            case 'CLASSIQUE':
                {
                   
                    //hide arrival control
                    $(".arrival_group").slideDown();
                    //show  value
                    $(".trip_value_estimation").slideUp()

                }
                break;
            case 'HEURE':
                {
                   //show arrival controls
                    $(".arrival_group").slideUp();
                    //hide trip estimation
                   
                    set_slider_trip_value();

                     $("#trip-value-estimation").slider({
                        range: "max",
                        min: 1,
                        max: 8,
                        value: 1,
                        step: 0.5,
                        slide: function (event, ui) {

                            $("#trip-value-estimation-value").text(ui.value + ' HOURS').change();
                        }
                    });

                    $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' HOURS');

                     $(".trip_value_estimation").slideDown()

                }
                break;
            case 'KMS':
                {
                   //show arrival controls
                    $(".arrival_group").slideUp();
                    //hide trip estimation
                    $(".trip_value_estimation").slideDown()
                    set_slider_trip_value();


                     $("#trip-value-estimation").slider({
                        range: "max",
                        min: 100,
                        max: 1000,
                        value: 100,
                        step: 50,
                        slide: function (event, ui) {

                            $("#trip-value-estimation-value").text(ui.value + ' KMS').change();
                        }
                    });

                    $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' KMS');


                }
                break;

        }

    });


    arrival = new google.maps.places.Autocomplete(document.getElementById('arrival'));
    google.maps.event.addListener(arrival, 'place_changed', function () {

        var place = arrival.getPlace();
        var address = place.formatted_address;
        $("#arrival").data("lat", place.geometry.location.lat())
        $("#arrival").data("lng", place.geometry.location.lng())
        return false;
    });


   

    //set tryp type
    $("#calc_method").bootstrapSwitch();
    set_switch($("#calc_method"));
   

    ////set switch for calcul mode to KMS or to HOURS



    $("#calc_method").on('switchChange.bootstrapSwitch', function (event, state) {
     

        if (state) {
            $("#trip-value-estimation").slider({
                range: "max",
                min: 1,
                max: 8,
                value: 1,
                step: 0.5,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' HOURS').change();
                }
            });


            $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' HOURS');



        }
        else
            set_slider_trip_value();



    });


     map_init();

     //set master card form

 

}



var tripz = null;
var offers = null;
var interval_place_dectetion = -1;
function get_tarifs()
{
    
    $("#offers-container").fadeOut(200);
    $('.offer_text').hide();
       
    var trip = new Object();
        
    var time = get_date_picker($("#departing_date").val()) + ' ' + $("[name='time']").val() + ':00';
                trip.departing = $("#departing").val();
                trip.departing_time = time;
                trip.calc_method = 1;

            
                trip.value = $("#trip-value-estimation").slider("value");
               
                if($("#trip_method .active").find("input").data("value") == 'CLASSIQUE'){
                    
                    trip.trip_method = 'TAB';


                }
                else
                {  
                
                    trip.trip_method = 'TLD';
                   
                   if($("#trip_method .active").find("input").data("value") == "KMS")
                   {
                        trip.calc_method  = 1;
                        trip.kms  = $("#trip-value-estimation").slider("value");
                   }
                   else
                   {

                        trip.calc_method   = 2;
                      
                        trip.minutes  = $("#trip-value-estimation").slider("value") * 60;
                   }

                }

     trip.origin='frontend';
              
    var method =  trip.trip_method;

               
     var counter = 0;

    if (method == "TAB") {
        trip.arrival = $("#arrival").val();
        trip.alat = arrival.getPlace().geometry.location.lat()
        trip.alng = arrival.getPlace().geometry.location.lng()
    }

    trip.dlat = departing.getPlace().geometry.location.lat()
    trip.dlng = departing.getPlace().geometry.location.lng()
    tripz = trip;

    $(".tarif_loader").fadeIn();

    $.get("drivers/find",{ trip : trip})
    .done(function (data) {
                                var data = JSON.parse(data);
                                offers = data;
                                   $(".tarif_loader").fadeOut();
                                if(data.error != undefined && data.error.length > 0)
                                {


                                 toastr.error('Booking service is not available, please try again later');
                                 $(".tarif_loader").fadeOut();

                                 setTimeout(function(){   
                                         wizard.step3 = false;
                                wizard.step4 = false;
                                wizard.step5 = false;
                                     $("[href='#tab1']").click();
                                 },2000);

                                 return;

                                }
                                if(data.exception)
                                {

                                    toastr.error(data.exception_msg);
                                    $(".tarif_loader").fadeOut();

                                     setTimeout(function(){                                        $("[href='#tab1']").click();
                                     },2000);

                                 return;

                                }

                                Booking = data;
                                offers = Booking.offers;
                                if(offers.length == 0)
                                { $(".tarif_loader").fadeOut();
                                   
                                          toastr.warning('There is no offers at moment please try change the TRIP to another type');
                                          
                                            $(".nofication").slideDown();
                                          

                                }
                                else
                                {
                                    wizard.step3 = true;
                                    $('.offer_text').show();
                                    }
                                //set a new instance of offer to sent when reservation
                               
                                setTimeout(function () {

                                    $(".tarif_loader").fadeOut();

                                    $("#offers-container").find(".offer-ui").remove();
                                    $("#offers-container").fadeIn();


                                    $.each(offers, function (i, offer) {
                                        
                                        offer_Booking = get_booking_offer(Booking);
                                        var existing_offer = $("#offers-container").find(".offer-ui[id=" + offer.id + "]");
                                      
                                        if (existing_offer.length == 0 || existing_offer.length > 0  & existing_offer.attr("id") < 0) {
                                           
                                            var offer_ui_example = $(".offer-ui-example").clone();
                                            offer_ui_example.unbind('mouseover');
                                            offer_ui_example.unbind('mouseout');

                                            offer_ui_example.removeClass("offer-ui-example").addClass("offer-ui");

                                            offer_ui_example.fadeTo("slow", 0);

                                            offer_ui_example.attr("id", offer.id);

                                            offer_ui_example.css("display", "block");
                                            if (offer.id > 0) {

                                                offer_ui_example.find(".box-type-pricing").addClass("style-support4");
                                                offer_ui_example.find(".text-center").removeClass("style-inverse");

                                              
                                            }
                                           offer_ui_example.find(".title").text(offer.title);
                                       

                                            var price = '</span><h2><span class="text-xl price">' + parseFloat(offer.cost).toFixed(2) + '</span>$</h2>';
                                           
                                            switch(parseInt(offer.calc_method))
                                            {
                                                case 1:
                                                {
                                                    var distance = parseFloat((Booking.distance / 1000)).toFixed(2);
                                                    var total =  parseFloat(distance * offer.cost).toFixed(2)
                                                    price = '</span><h2><span class="text-xl price">Est. ' + distance + ' kms | ' + total + ' </span>€</h2>';
                                                
                                                    offer_Booking.kms = distance;
                                                    offer_Booking.total = total;
                                                  
                                                }
                                                break;
                                                case 2:
                                                {
                                                    var minutes  =  parseFloat(Booking.duration / 60).toFixed(2);
                                                    var total =  parseFloat(minutes * offer.cost).toFixed(2)
                                                    price = '</span><h2><span class="text-xl price">Est. ' + minutes + ' minutes | ' + total + ' </span>€</h2>';
                                                    
                                                    
                                                    offer_Booking.minutes = minutes;
                                                    offer_Booking.total = total;
                                                
                                                }
                                                break;
                                                default:
                                                {
                                                    var total = parseFloat(offer.cost).toFixed(2);
                                                    price = '</span><h2><span class="text-xl price">' + total + '</span>$</h2>';

                                                    offer_Booking.total = total;

                                                }
                                                break;

                                            }
                                            //set offer_id
                                            offer_Booking.offer_id = offer.id;

                                            //set trip and cal method 

                                           offer_Booking.trip_method   =  offer.trip_method;
                                           offer_Booking.calc_method = offer.calc_method;
                                           offer_Booking.cost = offer.cost;
                                           offer_Booking.id = offer.id;
                                           offer_ui_example.find(".price").html(price);
                                           offer_Booking.cars = offer.cars;
                                           
                                           offer_ui_example.data("offer", offer_Booking);
                                           console.log(offer_Booking.trip_method);
                                           console.log(offer_Booking.calc_method)
                                          
                                           $("#offers-container").append(offer_ui_example);
                                           
                                           

                                           selected_offer = null;
                                           
                                           
                                           offer_ui_example.click(function(){
                                               
                                                $('.next').click();
                                                selected_offer =  $(this).data("offer");
                                                console.log(selected_offer);

                                                var car = '<div class="col-xs-12 col-sm-4 col-md-4 radio text-center car" style="margin-bottom:40px; cursor:pointer;">';
                                                    car +='<div class="row">';
                                                    car +='<h6 class="fullname">NOM DE LA GAMME</h6>';
                                                    car +='<div class="col-xs-6 col-sm-12">';
                                                    car +='<img  class="img" src="frontend/media/gamme01.jpg" alt="..."></div>';
                                                    car +='<div class="col-xs-6 col-sm-12">';
                                                    car +='<strong class="price-unit"></strong></br>';
                                                    car +='<strong class="price">64€</strong>';
                                                    car +='</div>';
                                                    car +='<a href="">+ Détails</a> </div>';
                                                    car +='<input type="radio" checked></div>';

                                             

                                                var cars_tab = $(".cars-tab");
                                                $(".cars-tab").empty();

                                                $(selected_offer.cars).each(function(i, item){
             
                                                    car = $(car).clone();
                                                    car.find('.fullname').text(item.brand + ' ' +  item.model)
                                                    car.find('.img').attr("src", item.img);
                                                    car.find('.img').attr("alt", item.Fullname);
                
                                                     car.find('[type="radio"]').attr("id", item.id);
                                                   
                                                     selected_offer.car = item;
                                                     var selected_method = parseInt(selected_offer.calc_method);
                                                     switch(selected_method)
                                                     {

                                                         case 1:
                                                         {
                                             
                                                            var price = parseFloat(selected_offer.kms *  selected_offer.cost).toFixed(2);

                                                            car.find('.price-unit').text('Prix par KM :'  + selected_offer.cost);
                                                            car.find('.price').text(price + ' €');
                                                            selected_offer.total_trip_car_cost =  price;
                                                            selected_offer.kms = distance;


                                                         }
                                                         break;
                                                         case 2:
                                                         {

                                                      
                                                            var price_par_minute  = Math.round(selected_offer.cost).toFixed(2);
                                                            var price =  parseFloat(selected_offer.cost* selected_offer.minutes).toFixed(2);
                                                            car.find('.price-unit').text('Prix á la minute :'  + selected_offer.cost);
                                                            car.find('.price').text(price + ' €');

                                                            selected_offer.total_trip_car_cost =  price;
                                                            selected_offer.minutes = minutes;
                                                         }
                                                         break;

                                                         default:
                                                         {
                                                            car.find('.price-unit').text('Prix Fixe');
                                                            var price =  Math.round(selected_offer.total).toFixed(2);
                                                            car.find('.price').text(price + ' €');
                                                            selected_offer.total_trip_car_cost =  price;
                                                         }
                                                         break;
                                                     }
                                                                                                        car.data("offer", selected_offer);                                                    
                                                   car.click(function(){
                                                       $(".cars-tab").find("[type='radio']").prop("checked", false);
                                                       $(".cars-tab").find("[type='radio']").removeAttr("checked");
                                                       $(this).find("[type='radio']").prop("checked", true);


                                                   })

                                                  if(i > 0)
                                                  {
                                                    car.find('[type="radio"]').prop("checked", false);
                                                    car.find("[type='radio']").removeAttr("checked");
                                                  }
                                                     $(".cars-tab").append(car);

                                                })
                                   

                                                $(".cars-tab").find(".radio").removeAttr("checked");

                                               
                                            })
                                        }

                                    });

                                    var offer_uis = $("#offers-container").find(".offer-ui");
                                    var count_ui = offer_uis.length - 1;
                                    var counter = 0;

                                    var interval_show_offers = setInterval(function () {


                                        if (counter <= count_ui) {

                                            $(offer_uis[counter]).fadeTo("slow", 0.6);
                                            
                                        }
                                        else {

                                            
                                            $(".offer-ui").mouseenter(function(){
                                                   
                                                   
                                                 $(".offer-ui").css("opacity", 0.6);
                                                 $(this).fadeTo("fast", 1);
                                                 var selected = $(this);

                                                  setTimeout(function(){
                                                      
                                                       $(".offer-ui").not(selected).css("opacity", 0.6);

                                                  },200)
                                                
                                            })

                                            

                                            clearInterval(interval_show_offers);


                                        }

                                        counter = counter + 1;


                                    }, 400);


                                }, 500);



                            })
    .error(function(){
                                
                                toastr.error('Booking service is not available, please try again later');
                                 $(".tarif_loader").fadeOut();
                                 wizard.step3 = false;
                                wizard.step4 = false;
                                wizard.step5 = false;

                                 setTimeout(function(){   
                                      $("[href='#tab1']").click();
                                 },2000);

                            });

    return false;


}
var Booking = null;
function get_booking_offer(Booking)
{
    var trip = new Object();
                                                           
    trip.departing_time =  Booking.departing_time;
    trip.driver_arrival_time =  Booking.driver_arrival_time;
    trip.arrival_time =  Booking.arrival_time;
                                                           
    trip.departing = Booking.departing;
    trip.dlat = Booking.dlat;
    trip.dlng = Booking.dlng;
    trip.arrival = Booking.arrival;
    trip.alat = Booking.alat;
    trip.alng = Booking.alng;
                                                           
    trip.start_hour  =  Booking.start_hour;
    trip.end_hour  =  Booking.end_hour;
    trip.day  =  Booking.end_dayhour;

    trip.duration  =  Booking.duration;
    trip.distance  =  Booking.distance;

    
    return trip ;                                                    

}


var selected_offer = null;
function set_slider_trip_value() {


    if ($("#calc_method").prop("checked") == false) {
        if ($("#trip_method").val() != "TLD") {


            $("#trip-value-estimation").slider({
                range: "max",
                min: 10,
                max: 200,
                value: 10,
                step: 10,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' KM').change();
                }
            });


        }
        else {
            $("#trip-value-estimation").slider({
                range: "max",
                min: 200,
                max: 2000,
                value: 200,
                step: 50,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' KM').change();
                }
            });

        }

        $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' KM');
    }

}


function map_init()
{ 

    google.maps.event.addDomListener(window, 'load', init);
                var map;
                function init() {
                    var mapOptions = {
                        center: new google.maps.LatLng(48.859747,2.45853),
                        zoom: 14,
                        zoomControl: false,
                        disableDoubleClickZoom: false,
                        mapTypeControl: false,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        },
                        scaleControl: false,
                        scrollwheel: false,
                        panControl: false,
                        streetViewControl: false,
                        draggable : false,
                        overviewMapControl: false,
                        overviewMapControlOptions: {
                            opened: false,
                        },
                        mapTypeId: google.maps.MapTypeId.TERRAIN,
                        styles: [
                {
                  featureType: "landscape",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 65 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "poi",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 51 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road.highway",
                  stylers: [
                    { saturation: -100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road.arterial",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 30 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "road.local",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 40 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "transit",
                  stylers: [
                    { saturation: -100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "administrative.province",
                  stylers: [
                    { visibility: "off" }
                  ]
              /** /
                },{
                  featureType: "administrative.locality",
                  stylers: [
                    { visibility: "off" }
                  ]
                },{
                  featureType: "administrative.neighborhood",
                  stylers: [
                    { visibility: "on" }
                  ]
              /**/
                },{
                  featureType: "water",
                  elementType: "labels",
                  stylers: [
                    { visibility: "on" },
                    { lightness: -25 },
                    { saturation: -100 }
                  ]
                },{
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [
                    { hue: "#ffff00" },
                    { lightness: -25 },
                    { saturation: -97 }
                  ]
                }
              ],
                    }
                    var mapElement = document.getElementById('map');
                    var map = new google.maps.Map(mapElement, mapOptions);
                    var locations = [
            ['Prestige Limousine', '12, Rue Ernest Renann <br />93100 - Montreuil', '06 29 23 54 38', 'piere.dupont@lp.fr', 'undefined', 48.8559983, 2.4588842, 'https://mapbuildr.com/assets/img/markers/ellipse-purple.png']
                    ];
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
                        if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
                        if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
                       if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
                       if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
                        marker = new google.maps.Marker({
                            icon: markericon,
                            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                            map: map,
                            title: locations[i][0],
                            desc: description,
                            tel: telephone,
                            email: email,
                            web: web
                        });
            link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
                 }
             function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
                  var infoWindowVisible = (function () {
                          var currentlyVisible = false;
                          return function (visible) {
                              if (visible !== undefined) {
                                  currentlyVisible = visible;
                              }
                              return currentlyVisible;
                           };
                       }());
                       iw = new google.maps.InfoWindow();
                       google.maps.event.addListener(marker, 'click', function() {
                           if (infoWindowVisible()) {
                               iw.close();
                               infoWindowVisible(false);
                           } else {
                               var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p><p>"+telephone+"<p><a href='mailto:"+email+"' >"+email+"<a></div>";
                               iw = new google.maps.InfoWindow({content:html});
                               iw.open(map,marker);
                               infoWindowVisible(true);
                           }
                    });
                    google.maps.event.addListener(iw, 'closeclick', function () {
                        infoWindowVisible(false);
                    });
             }
            }
}


function get_traject_details(offer)
{
    var traject = new Object();
    traject.type = "";
    traject.description = "";
    traject.method = "";


                   
    if(offer.trip_method == 'TAB')
    {
        traject.type ="Traject Classique";
        traject.description = "Traject depuis " + offer.departing  + "  jusque á " + offer.arrival;
    }
    else
    {
        if(offer.trip_method == 'TZG')
        {
            traject.type ="Traject en zone geographieque";
            traject.description =  traject.type + " depuis " + offer.departing;
        }
        else
        {
            traject.type ="Traject en longue distance"; 
            traject.description =  traject.type + " depuis " + offer.departing;
        }
    }
                    
              

     if(offer.calc_method == 3)
     {
        traject.method  ="Prix fixe " + offer.total;
        traject.description = traject.description + ' | PRIX FIXE';
     }
     else
     {    
        if(offer.calc_method == 1)
        {
            traject.method  ="Mise à disposition au KM " + offer.cost;
            traject.description = traject.description + ' | PRIX Á LA KMS: ' + offer.kms + ' kms'; 
        }
        else
        {
            traject.method  ="Mise à disposition à la minute " + offer.cost;
            traject.description = traject.description + ' | PRIX A LA MINUTE: ' + offer.minutes + ' minutes';
        }
                        
       }

    return traject;

}


function set_booking_details()
{
    
      if($(".cars-tab").find(".radio :checked").length > 0)
     {
                    $('.next').hide();
                    $('.finish').hide();
                  
                    var offer = $(".cars-tab").find(".radio :checked").parent().data("offer")
                    
                    var traject = get_traject_details(offer);
                    var tva =  parseFloat(Booking.tva);
                    var sub_total = parseFloat(offer.total_trip_car_cost);
                    var total =  parseFloat(offer.total_trip_car_cost) * (1 + (Booking.tva / 100));

                    $(".payment-item-details").text(traject.type + ' ->' + traject.description);
                    $(".payment-item-total").text(offer.total_trip_car_cost + '€');


                    $(".payment-tva").text(tva+ '%');
                    $(".payment-sub-total").text(sub_total + '€');
                    $(".payment-total").text(total + ' €');


                    $(".tva .value").text(tva + '%');
                    $(".sub-total .value").text(sub_total  + ' €');
                    $(".total .value").text(total  + ' €');

                    $(".traject-type").text(traject.type);
                    $(".departing-datetime").text(offer.departing_time);
                    $(".departing-adress").text(offer.departing);
                    $(".arrival-address").text(offer.arrival);
                    $(".calculation-method").text(traject.method);

                    var car_id = $(".cars-tab").find(".radio :checked").parent().find("input").attr("id");
                    
                    var selectedcar =$(offer.cars).filter(function(i, item){
                        if(item.id == car_id)
                            return item;
                    });
                   

                    $(".car_name").text(selectedcar[0].brand + ' ' +  selectedcar[0].model);
                    $(".car_preview").attr("src", selectedcar[0].img);
                    $(".car_preview").attr("alt", selectedcar[0].brand + ' ' +selectedcar[0].model);
                  
                    offer.car = car_id;
                   
                    var details = [];
                    var li_detail = $('<li><div class="desc fl"></div> <div class="price fl">Gratuit</div></li>').clone();

                    $(li_detail).find(".desc").text(    traject.description);
                    $(li_detail).find(".price").text(offer.total_trip_car_cost + ' €');
                    details.push(li_detail);
                    $(".details").empty();

                    $(details).each(function(){
                        
                        $(".details").append(this);
                    })

                

                     $("#confirm_order").unbind("click");
                    
                     $("#confirm_order").click(function(){

                           var trip = new Object();
                           trip.departing = offer.departing;
                           trip.dlat = offer.dlat;
                           trip.dlng = offer.dlng;
                           trip.arrival = offer.arrival;
                           trip.alat = offer.alat;
                           trip.alng = offer.alng;
                           trip.duration = offer.duration;
                           trip.minutes = (offer.duration / 60);
                           trip.distance = offer.distance;
                           trip.departing_time = offer.departing_time;
                           trip.arrival_time = offer.arrival_time;
                           trip.trip_method = offer.trip_method;
                           trip.calc_method = offer.calc_method;
                           trip.offer_id = offer.id;
                           trip.car_id = car_id;
                           trip.exception = '';
                           trip.exception_msg =  '';
                            $(".tarif_loader").fadeIn();

                           $.get("bookings/book", { trip: trip } ).done(function(data){
                                
                                 data = JSON.parse(data);
                                 console.log(data);

                                  $(".tarif_loader").fadeOut();

                                 switch(data.exception)
                                 {
                                    //User Exception starts at 0
                                    //User not Logged = 1
                                    //Account not active == 2
                                    case 1:
                                    {
                                          toastr.warning(data.exception_msg);

                                    }
                                    break;

                                    case 2:
                                     {
                                          toastr.warning(data.exception_msg);
                                     }
                                    break;
                                    //Customer exception start at 50 
                                    //Account is not cutomer== 50
                                    case 50:
                                    {
                                          toastr.warning(data.exception_msg);
                                    }
                                    break;                      
                                    //CUSTOMER AGENDA STARTS AT 200
                                    //200 already have a book
                                    case 200:
                                    {
                                          toastr.error(data.exception_msg);
                                          current_booking  = data;
                                    }
                                    break;

                                    //OFFERS EXPETION START at 100
                                    // 105 OFFER NOT AVAILABLE ANYMORE
                                    // 106 NO OFFERS MATCHING THE TRIP
                                    // 110 NO CARS AVAILABLE TO DO OFFER, MENS IN HTE MEAN TIME SOMEONE AS TAKE THE TRIP
                                    // 111 NO DRIVERS AVAILABLE TO DO OFFER, MENS IN HTE MEAN TIME SOMEONE AS TAKE THE TRIP
                                   
                                     case 105:
                                     {
                                          toastr.warning(data.exception_msg);
                                        
                                     }
                                     break;
                                     case 106:
                                     {
                                          toastr.error(data.exception_msg);
                                        
                                     }
                                     break;
                                     case 110:
                                     {
                                          toastr.warning(data.exception_msg);
                                        
                                     }
                                     break;
                                     case 111:
                                     {
                                          toastr.warning(data.exception_msg);
                                        
                                     }
                                     break;
                                    //Bookings Exception starts at 400
                                    //400 -> Success not exception, warning payement 30 minutes
                                    //450 -> Unknow Error

                                     case 400:
                                     { 
                                          toastr.warning('You have about 30 minutes to do the payement');
                                          toastr.success(data.exception_msg);
                                          current_booking = data;
                                          if(data.payment_status)
                                          {
                                               wizard.step4 = true;
                                               $('.next').hide();
                                               $('.payment').show();
                                               
                                               $('#confirm_order').hide();
                                               $('.next').hide();
                                               $('.finish').hide();

                                              
                                          }
                                          else
                                          {
                                              //payement status is not we redirect the user to first ta
                                               toastr.error('Payment Gateway not available, please try again later..');
                                               $('#rootwizard').bootstrapWizard('first');
                                          }

                                     }
                                     break;
                                     case 450:
                                     {
                                       
                                          toastr.error(data.exception_msg);
                                     }
                                     break;

                                     // 500-> User not found || when user not found means database online or problem in connection
                                     // 501-> User has not mangopay account
                                     // 502-> User  has mangopay but is not working, means user as id of mangopay on database but in the mangopay api we dosent exist

                                     case 500:
                                     {
                                          toastr.error(data.status);
                                     }
                                     break;
                                     case 501:
                                     {
                                          toastr.error(data.status);

                                     }
                                     break;
                                     case 502:
                                     {
                                          toastr.error(data.status);

                                     }
                                     break;
                                 }

                            });

                     })
                  }

}