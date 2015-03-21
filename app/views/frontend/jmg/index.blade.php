<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />
        <meta name="author" content="www.pl.com" />
        <title>Accueil | Prestige Limousine</title>
        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon">
        <link rel="icon" href="frontend/img/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="frontend/img/favicon.png" type="image/png">


        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                    <!--[if lt IE 9]>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <!--bootstrap switch-->
        {{ HTML::style('/js/libs/bootstrap-switch-master/dist/css/bootstrap3/bootstrap-switch.min.css?'.time()) }}
        <!-- Latest compiled and minified CSS Bootstrap -->
        {{ HTML::style('frontend/css/bootstrap.min.css?'.time()) }}
        {{ HTML::style('frontend/css/bootstrap.min.css?'.time()) }}
                                                                                                                                                                                                                                                                                                                                                 <![endif]-->
        <!-- CSS FONTS-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,300,400,600,700,800" rel="stylesheet" type="text/css" />

        {{ HTML::style('js/libs/datepicker/datepicker.css?'.time()) }}
        {{ HTML::style('frontend/css/animate.css?'.time()) }}
        {{ HTML::style('frontend/css/font.css?'.time()) }}
        {{ HTML::style('frontend/css/jquery.mmenu.all.css?'.time()) }}
        {{ HTML::style('frontend/'.$company->theme.'/css/main.css?'.time()) }}
        {{ HTML::style('css/theme-default/font-awesome.min.css?'.time()) }}
        {{ HTML::style('css/theme-default/libs/jquery-ui/jquery-ui-boostbox.css?'.time()) }}
        {{ HTML::style('css/theme-default/libs/fullcalendar/fullcalendar.css?'.time()) }}
        <!--TOASTER-->
        {{ HTML::style('css/theme-default/libs/toastr/toastr.css?'.time()) }}
        <!--Jtables css -->
        {{ HTML::style('css/theme-default/libs/DataTables/jquery.dataTables.css?'.time()) }}
        {{ HTML::style('css/theme-default/libs/DataTables/TableTools.css?'.time()) }}
        <!--wizard  css -->
        {{ HTML::style('css/theme-default/libs/wizard/wizard.css?'.time()) }}
        <!--custom  css -->
        {{ HTML::style('css/custom.css?'.time()) }}
        <!--jtable-->
        {{ HTML::style('js/libs/jtable/themes/lightcolor/gray/jtable.css?'.time()) }}
        <!--datepicker-->
        {{ HTML::style('js/libs/clock/dist/bootstrap-clockpicker.min.css?'.time()) }}
        {{ HTML::style('js/libs/clock/assets/css/github.min.css?'.time()) }}
        <!--Loader-->
        {{ HTML::style('css/loader.css?'.time()) }}
        <!-- Theme PL -->
        {{ HTML::style('frontend/'.$company->theme.'/css/theme.css?'.time()) }}
        <!-- TIME-->
        {{ HTML::style('js/libs/clock/dist/bootstrap-clockpicker.min.css?'.time()) }}
        {{ HTML::style('js/libs/clock/assets/css/github.min.css?'.time()) }}
    </head>
    <body>
        <div id="page">
            <nav class="navbar navbar-fixed-top navmodel mm-fixed-top" role="navigation">
                <div class="container menu-mobile hidden-lg">
                    <div class="col-xs-2 col-md-2" style="padding: 0;">
                        <a href="#menuleft" class="btn-menu-left"><i class="fa fa-bars"></i></a>
                    </div>
                    <div class="col-xs-8 col-md-8">
                        <a class="navbar-brand text-center" href="index.html"><h1 class="logo">Prestige Limousine</h1></a>
                    </div>
                    <div class="col-xs-2 col-md-2" style="padding: 0;">
                        <a href="#menuright" class="btn-menu-right"><i class="fa fa-user"></i></a>
                    </div>
                </div>
                <div class="container menu-desktop hidden-xs hidden-sm hidden-md">
                    <div class="navbar-header">
                                                    <!--<a class="navbar-brand" href="index.html">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </a>-->
                    </div>
                    <div class="collapse navbar-collapse top-menu" id="navbar-collapse1">
                        <ul class="nav navbar-nav">
                            <li><a href="#section1">ACCUEIL </a></li>
                            <!--method to check reservation api status-->
                            {{ $company->reservation_status() }}
                            @if($company->reservation_status)
                            <li><a href="#section2">RÉSERVATION</a></li>
                            @endif
                            <li><a href="#section3">NOS PRESTATIONS</a></li>
                            <li><a href="#section4">APP CHAUFFER</a></li>
                            <li><a href="#section5">NOUS CONTACTER</a></li>
                            <li class="dropdown pl30 authentication-control"> <!--data-toggle="dropdown"-->
                                @if(count($user) && $user->active == 1)
                                <a data-toggle="dropdown" class="navbar-profile dropdown-toggle text-bold item" style="cursor: pointer">SE DECONNECTER <i class="fa fa-fw fa-power-off"></i></a>
                                @else
                                <a href="#section6" class="navbar-profile dropdown-toggle text-bold item" style="cursor: pointer">SE CONNECTER
                                    <i class="fa fa-fw fa-power-off text-danger"></i>

                                    <!--<img class="img-circle" src="http://www.codecovers.eu/assets/img/modules/boostbox/avatar1.jpg?1401441850" alt="">-->
                                </a>
                                 @endif
                                <ul class="dropdown-menu animation-slide options ml30">
                                    <li><a href="profile">My profile</a></li>
                                      @if(count($user) > 0 && $user->admin == true)
                                    <li><a href="admin">Admin</a></li>
                                      @endif
                                      @if(count($user->Customer) > 0  && $user->Customer->active == true)
                                    <li><a class="booking">Bookings</a></li>
                                      @endif
                                      @if(count($user->Driver) > 0  && $user->Driver->active == true)
                                    <li><a class="booking">Trips</a></li>
                                      @endif
                                    <li class="divider"></li>
                                    <li><a href="#section1" class="logout"><i class="fa fa-fw fa-power-off text-danger"></i> Logout</a></li>
                                </ul><!--end .dropdown-menu -->
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div id="content" class="content" data-spy="scroll" data-target=".navmodel" data-offset="150">
                <section id="section1" class="section">
                    <div class="container">
                        <div class="intro-block text-center">
                            <h1>{{ $company->name }}</h1>
                            <p>{{ $company->subtitle }}</p>
                            <br>
                             @if($company->reservation_status)
                            <a href="#section2" class="btn btnwhite intro-bookin">Réservation</a>
                             @endif
                        </div>
                    </div>

                                            <!-- 					<div id="carousel-home" class="carousel slide" data-ride="carousel">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Indicators
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div> -->
                </section>

                @if($company->reservation_status)
                <section id="section2" class="section">

                    <div id="rootwizard">
                        <div class="navbar text-center">
                            <div class="navbar-inner container">
                                <div class="">
                                    <h3 class="section-title">RESERVATION </h3>
                                    <div id="bar" class="progress progress-striped active">
                                        <div class="bar"></div>
                                    </div>
                                    <ul id="reservation">
                                        <li><a href="#tab1" data-toggle="tab">QUAND</a></li>
                                        <li><a href="#tab2" class="li_tarif" data-toggle="tab">OU</a></li>
                                        <li><a href="#tab3" data-toggle="tab">TARIF</a></li>
                                        <li><a href="#tab4" data-toggle="tab">OPTIONS</a></li>
                                        <li><a href="#tab5" data-toggle="tab">TOTAL</a></li>
                                        <li><a href="#tab6" data-toggle="tab">PAIEMENT</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="container">
                            <div class="tab-content">
                                <div class="tarif_loader">
                                    <div id="block_1" class="barlittle"></div>
                                    <div id="block_2" class="barlittle"></div>
                                    <div id="block_3" class="barlittle"></div>
                                    <div id="block_4" class="barlittle"></div>
                                    <div id="block_5" class="barlittle"></div>
                                    <h4 class="pt20 pl15"><strong>Please wait...</strong></h4>
                                </div>
                                <div class="tab-pane" id="tab1">



                                    <div class="form-group pb30">
                                        <label for="departing_date" class="col-sm-4 control-label">Période de départ</label>
                                        <div class="col-sm-8">
                                            <div class="date input-group control-width-small" id="departing_date_ctrl">
                                                <span class="input-group-addon add-on h34">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                <input size="16" type="text" id="departing_date" class="form-control control-width-small add-on h33" value="{{ date('d-m-Y') }}">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="time" class="col-sm-4 control-label">Heure de départ</label>
                                        <div class="col-sm-8">
                                            <div class="input-group time control-width-small">
                                                <span class="input-group-addon h34">
                                                    <span class="glyphicon glyphicon-time"></span>
                                                </span>
                                                <input type="text" name="time" class="form-control control-width-small h33" value="09:30">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="tab-pane" id="tab2">
                                    <form class="form-horizontal form-bordered form-banded form-validate trip" onsubmit="return false;" role="form">
                                        <div class="form-group">
                                            <label for="inputtime" class="col-sm-4 control-label">Type de Prestaition</label>
                                            <div class="col-sm-8">
                                                <div class="btn-group" data-toggle="buttons" id="trip_method">
                                                    <label class="btn btn-primary btn-outline btn-rounded active"><input type="radio" data-value="CLASSIQUE" name="options" id="option1">Trajet classique</label>
                                                    <label class="btn btn-primary btn-outline btn-rounded"><input type="radio" data-value="HEURE" name="options" id="option2">Mise à disposition à l'HEURE</label>
                                                    <label class="btn btn-primary btn-outline btn-rounded"><input type="radio" data-value="KMS" name="options" id="option2"> Mise à disposition au KM</label>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label for="departing" class="col-sm-4 control-label">Votre adresse de départ</label>
                                            <div class="col-sm-8">

                                                <input type="text" class="form-control" name="departing" id="departing" required placeholder="Votre adresse de départ" required>
                                            </div>
                                        </div>


                                        <div class="form-group arrival_group">
                                            <label for="arrival" class="col-sm-4 control-label">Votre adresse d’arrivée</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="arrival" id="arrival" placeholder="Votre adresse d’arrivée">
                                            </div>
                                        </div>

                                        <div class="form-group trip_value_estimation">
                                            <label for="estimation" class="col-sm-4 control-label">Estimation</label>
                                            <div class="col-sm-8">
                                                <div class="form-control-static fl pl10" style="width: 460px;">
                                                    <div id="trip-value-estimation" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    </div>
                                                </div>

                                                <label id="trip-value-estimation-value" class="control-label custom_form_input_slider w100 pl15 fr"></label>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label for="inputnumero" class="col-sm-4 control-label">N° de vol</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" id="inputnumero" placeholder="N° de vol">
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="tab-pane" id="tab3">
                                    <p class="text-center offer_text">Choisissez votre prestation</p>
                                    <div class="col-sm-12 col-md-12" id="offers-container">
                                        <div class="col-md-4 offer-ui-example" style="display: none; ">
                                            <div class="box box-type-pricing">
                                                <div class="box-body text-center style-inverse" style="min-height: 255px;">
                                                    <p class="opacity-100" style="padding-top: 10px;"><em class="title" style="font-size: 18px;">Rame aute irure dolor in reprehenderit pariatur.</em></p>
                                                    <div class="price">
                                                        <span class="text-lg price"></span>
                                                    </div>

                                                </div>
                                            </div><!--end .box -->
                                        </div>
                                    </div>


                                    <div class="col-sm-12 col-md-12 nofication" style="display: none;">
                                        <div class="box-body text-center style-inverse" style="min-height: 255px;">
                                            <h4 class="text">Aucune prestation disponible pour le  moment, voullez essayer another type de tarif, SVP...</h4>
                                            <div class="col-xs-6 fr p0">
                                                <button type="button" class="btn btn-support5 fr" id="change_tarig" onclick="$('.li_tarif').click();">Changer Tarif</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane cars-tab hi" id="tab4">
                                    <p class="text-center">Choisissez votre voiture</p>
                                </div>
                                <div class="tab-pane" id="tab5">
                                    <div class="col-sm-12 col-md-12 payment" style="display: none">
                                        <h4><strong>Paiement Card</strong></h4>
                                        <div class="row">
                                            <div class="payment-by-card-container">
                                                <div class="card-wrapper"></div>
                                                <div class="card-form active">
                                                    <div class="form-container active">
                                                        <form id="mastercard" class="form-validate card" action="" novalidate="novalidate">
                                                            <div class="form-group fl">
                                                                <input placeholder="Card number" class="form-control" type="text" id="number" name="number" required>
                                                                <input placeholder="Full name" class="form-control" type="text" id="name" name="name" required>
                                                                <input placeholder="MM/YY" class="form-control" type="text" id="expiry" name="expiry" required>
                                                                <input placeholder="CVC" class="form-control" type="text" id="cvc" name="cvc" required>
                                                                <button class="btn btn-primary" id="validate-card"><i class="fa fa-key"></i> Validate</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-12 payment-confirm" style="display: none">
                                        <h4><strong>Confirm Payment</strong></h4><div class="card-status">Visa Validation Status: <span class="ico-card-status"></span></div>
                                        <div class="row">
                                            <div class="col-xs-10 payement-column-header-style"><p><strong>Product Details</strong></p><span class="payment-item-details"></span></div>
                                            <div class="col-xs-2 payement-column-header-style"><p><strong>Total</strong></p><span class="payment-item-total fr"></span></div>

                                            <div class="col-xs-10 payement-column-header-style"></div>
                                            <div class="col-xs-2 payement-column-header-style">

                                                <p><strong>SUB</strong><span class="payment-sub-total fr"></span></p>
                                                <p><strong>TVA</strong><span class="payment-tva fr"></span></p>
                                                <p><strong>TOTAL</strong><span class="payment-total fr"></span></p>
                                            </div>



                                            <div class="col-xs-12 pt15">
                                                <button type="button" class="btn btn-inverse fr" id="pay">Confirm Payement</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-12">
                                        <h4><strong>Récapitulatif</strong></h4>
                                        <div class="row">

                                            <div class="col-xs-2"><p><strong>Type Traject</strong></p><span class="traject-type"></span></div>
                                            <div class="col-xs-2"><p><strong>Date départ:</strong></p><span class="departing-datetime"></span></div>
                                            <div class="col-xs-3"><p><strong>Departing Adress</strong></p><span class="departing-adress"></span></div>
                                            <div class="col-xs-3 arrival"><p><strong>Arrival Address:</strong></p><span class="arrival-address"></span></div>
                                            <div class="col-xs-2"><p><strong>Calculation:</strong></p><span class="calculation-method"></span>
                                            </div>
                                        </div>
                                        <div class="row mt20">
                                            <div class="col-xs-6"><p><strong>Voiture</strong>&nbsp;<p class="car_name"></p></br><img class="car_preview" src="img/cars/bwm_530d.png" alt="bwm" /></div>
                                            <div class="col-xs-6"><p><strong>Details</strong></p></br>
                                                <ul class="details">

                                                </ul>

                                            </div>

                                        </div>
                                        <div class="col-sm-12 col-md-12 mt20">
                                            <div class="col-xs-6"></div>
                                            <div class="col-xs-2"></div>
                                            <div class="col-xs-1"></div>
                                            <div class="col-xs-3 tva"><div class="label">TVA</div><div class="value"></div></div>
                                        </div>
                                        <div class="col-sm-12 col-md-12 mt20">
                                            <div class="col-xs-6"></div>
                                            <div class="col-xs-2"></div>
                                            <div class="col-xs-1"></div>
                                            <div class="col-xs-3 sub-total"><div class="label">SUB TOTAL</div><div class="value"></div></div>
                                        </div>
                                        <div class="col-sm-12 col-md-12 mt20">
                                            <div class="col-xs-6"></div>
                                            <div class="col-xs-2"></div>
                                            <div class="col-xs-1"></div>
                                            <div class="col-xs-3 total"><div class="label">TOTAL</div><div class="value"></div></div>
                                        </div>
                                        <div class="col-sm-12 col-md-12 mt20">
                                            <div class="col-xs-6"></div>
                                            <div class="col-xs-6 fr p0">
                                                <button type="button" class="btn btn-inverse fr" id="confirm_order">CONFIRM</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-pane" id="tab6">
                                    <div class="text-center booking-complete success" style="display: none;">
                                        <div class="header-msg">
                                            <h3>Your book has been booked suceesfully </h3><img src="frontend/{{$company->theme.'/img/icons/success-tick.png' }}" alt="success">
                                        </div>
                                        <div>
                                            <h4>You can find your booking an details on your dashboard, by going to the CONNECTION >> Profile or click <a href="/profile">here</a></h4>
                                            <h5>If you need an invoice document click, <a class="invoive_link">here</a></h5>
                                        </div>
                                    </div>
                                    <div class="text-center booking-complete warning" style="display: none;">
                                        <div class="header-msg">
                                            <h3>The payement trassaction for you booking as not been complete, please try again later... </h3><img src="frontend/{{$company->theme.'/img/icons/warning-tick.png' }}" alt="success">
                                        </div>

                                    </div>


                                    <div class="text-center booking-complete">
                                        <button type="button" class="btn btn-support5 blue reservation">FAIRE UN NOUVELLE RESÈRVATION</button></p>
                                    </div>

                                </div>


                                <ul class="pager wizard">
                                    <li class="finish"><a href="javascript:;">RESERVER</a></li>
                                    <li class="next"><a href="javascript:;">SUIVANT</a></li>
                                    <!-- <button type="submit" class="btn btn-default">Sign in</button> -->
                                </ul>
                            </div>
                        </form>
                        </div>

                    </div>
                </section>
                @endif
                <section id="section3" class="section">
                    <div class="navbar bgwhite text-center">
                        <h3 class="section-title">NOS PRESTATIONS</h3>
                    </div>
                    <div class="container">
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <div class="presta-block">
                                <div class="presta-img">
                                    <img src="frontend/{{$company->theme}}/media/m1.jpg" alt="...">
                                </div>
                                <div class="presta-content hide">
                                    <h2><i class="fa fa-history"></i><h2>
                                            <h3>TITRE SERVICE</h3>
                                            <p>Quam ob rem ut
							riores sunt submittere
							se debent in amicitia,
							sic quodam.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <div class="presta-block">
                                <div class="presta-img">
                                    <img src="frontend/{{$company->theme}}/media/m2.jpg" alt="...">
                                </div>
                                <div class="presta-content hide">
                                    <h2><i class="fa fa-thumbs-o-up"></i><h2>
                                            <h3>TITRE SERVICE</h3>
                                            <p>Quam ob rem ut
							riores sunt submittere
							se debent in amicitia,
							sic quodam.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                            <div class="presta-block">
                                <div class="presta-img">
                                    <img src="frontend/{{$company->theme}}/media/m3.jpg" alt="...">
                                </div>
                                <div class="presta-content hide">
                                    <h2><i class="fa fa-globe"></i><h2>
                                            <h3>TITRE SERVICE</h3>
                                            <p>Quam ob rem ut
							riores sunt submittere
							se debent in amicitia,
							sic quodam.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="section4" class="section hidden-xs">
                    <div class="navbar bgwhite text-center">
                        <h3 class="section-title">NOTRE APPLI</h3>
                    </div>
                    <div class="container">
                        <div class="col-xs-12 col-sm-8 col-md-7">
                            <br>
                            <br>
                            <h2>DECOUVREZ NOTRE APPLI</h2>
                            <br><br>
                            <p class="lead">Et interdum acciderat, ut siquid in penetrali
						secreto nullo citerioris vitae ministro
						praesente paterfamilias uxori susurrasset.</p>
                            <br>
                            <p class="lead">Amphiarao referente aut Marcio,
						quondam vatibus inclitis !</p>
                            <br>
                            <div class="dl-app">
                                <a href="#" class="apple text-center"><img src="frontend/{{$company->theme}}/img/app-apple.png" alt="apple" ""></a>
                                <a href="#" class="adroid text-center"><img src="frontend/{{$company->theme}}/img/app-android.png" alt="android"></a>
                                <a href="#" class="windows text-center"><img src="frontend/{{$company->theme}}/img/app-windows.png" alt="windows"></a>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="section5" class="section">
                    <div class="navbar bgwhite text-center">
                        <h3 class="section-title">NOUS CONTACTER</h3>
                    </div>
                    <div id="map"></div>
                </section>
                <section id="section6" class="section login h500p">
                    <div class="navbar bgwhite text-center">
                        <h3 class="section-title">SE CONNECTER</h3>
                    </div>
                    <div class="col-md-12 login_wrapper" style="background-color: white;">
                        <div class="col-md-4">
                        </div>
                        <div class="col-md-4 login">
                            <div class="box-body box-centered style-inverse authentication_ctrl">
                                <h2 class="text-light">Sign in to your account</h2>
                                <br>
                                <form onsubmit="return false;" class="authentication" accept-charset="utf-8" method="post">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                            <input type="text" class="form-control" id="username" name="username" placeholder="Username" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-6 text-left">
                                            <div class="remember">

                                                <input type="checkbox" id="remember" value="default-inverse1"> Remember me
                                            </div>
                                            <div class="remember">

                                                <button type="button" class="btn btn-primary btn-outline btn-xs register_btn">Register</button>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 text-right">
                                            <button class="btn btn-primary" type="submit"><i class="fa fa-key"></i> Sign in</button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div class="box-body box-centered style-inverse register_control" style="display: none;">
                                <h2 class="text-light">Create your Account</h2>
                                <br>
                                <form onsubmit="return false;" class="register" accept-charset="utf-8" method="post">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                            <input type="text" class="form-control" id="r_username" name="r_username" placeholder="Username" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                            <input type="text" class="form-control" id="r_password" name="r_password" placeholder="Password" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">@</span>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="email" required>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xs-6 text-right fr">
                                            <button class="btn btn-primary" type="submit"><i class="fa fa-key"></i> Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="box-body box-centered style-inverse register_finnish_ctrl" style="display:none;">
                                <h2 class="text-light text">Registation Successfull</h2>
                                <br>
                                <div class="row" style=" text-align: center">

                                    <button class="btn btn-primary show_authentication_ctrl" type="submit"><i class="fa fa-key"></i> Login</button>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                </section>

                <footer class="footer">
                    <div class="container">
                        <div class="col-xs-12 col-md-3 foot">
                            <form class="form-horizontal" role="form">
                                <select class="form-control">
                                    <option>Français</option>
                                    <option>Anglais</option>
                                </select>
                            </form>
                            <br>
                            <small>
							© Prestige.
                            </small>
                        </div>
                        <div class="col-xs-12 col-md-3 foot">
                            <ul>
                                <li><a href="account.html">> Mon compte</a></li>
                                <li><a href="creataccount.html">> Créer un compte</a></li>
                                <li><a href="#section2">> Réservation</a></li>

                            </ul>
                        </div>
                        <div class="col-xs-12 col-md-3 foot">
                            <ul>
                                <li><a href="#">> FAQ</a></li>
                                <li><a href="#">> Mentions légales</a></li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-md-3 foot">
                            <p class="text-right">Rejoignez-nous sur</p>
                            <ul class="social-icons text-left">

                                <li>
                                    <a class="facebook" href="#"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li>
                                    <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a>
                                </li>
                                <li>
                                    <a class="google" href="#"><i class="fa fa-google-plus"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <nav id="menuleft" class="navmodel hidden-lg">
            <ul>
                <li><h4 class="menu-title">MENU</h4></li>
                <li><a href="#section1" data-number="1">Accueil</a></li>
                <li><a href="#section2" data-number="2">Réservation</a></li>
                <li><a href="#section3" data-number="3">Nos prestations</a></li>
                <!-- <li><a href="#section4" data-number="4">Notre appli</a></li> -->
                <li><a href="#section5" data-number="5">Nous contacter</a></li>
            </ul>
        </nav>
        <nav id="menuright" class="navmodel hidden-lg">
            <ul class="login-link-block">
                <li><a href="createaccount.html" class="btnwhite">CREER UN COMPTE</a></li>
                <li><a href="login.html" class="btnwhite">SE CONNECTER</a></li>
            </ul>
        </nav>

      {{HTML::script('js/libs/jquery/jquery-1.11.0.min.js')}}
      {{HTML::script('js/libs/jquery-ui/jquery-ui.min.js')}}
      {{HTML::script('js/libs/jtable/jquery.jtable.js')}}
      {{HTML::script('js/core/BootstrapFixed.js')}}
      {{HTML::script('js/libs/spin.js/spin.min.js')}}
      {{HTML::script('js/libs/bootstrap/bootstrap.min.js')}}
      {{HTML::script('frontend/js/jquery.bootstrap.wizard.min.js')}}
      {{HTML::script('frontend/js/jquery.mmenu.min.all.js')}}
      {{HTML::script('js/libs/jquery-validation/dist/jquery.validate.min.js')}}
      {{HTML::script('js/libs/bootstrap/bootstrap.min.js')}}
      {{HTML::script('js/libs/bootstrap-switch-master/dist/js/bootstrap-switch.min.js')}}
      {{HTML::script('frontend/js/paraxify.min.js')}}
      {{HTML::script('js/libs/slimscroll/jquery.slimscroll.min.js')}}
      {{HTML::script('js/libs/jquery-knob/jquery.knob.js')}}
      {{HTML::script('js/libs/jtable/jquery.jtable.js')}}
      {{HTML::script('js/core/BootstrapFixed.js')}}
      {{HTML::script('js/libs/toastr/toastr.min.js')}}
      {{HTML::script('js/libs/jquery-validation/dist/jquery.validate.min.js')}}
      {{HTML::script('js/libs/bootstrap/bootstrap.min.js')}}
      {{HTML::script('js/libs/bootstrap-switch-master/dist/js/bootstrap-switch.min.js')}}
      {{HTML::script('http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places')}}
        <!--MASTER CARD FORM-->
      {{HTML::script('js/libs/card-master/lib/js/card.js')}}
         {{HTML::script('frontend/'.$company->theme.'/js/authentication.js')}}
      {{HTML::script('frontend/'.$company->theme.'/js/booking.js')}}
      {{HTML::script('frontend/'.$company->theme.'/js/main.js')}}
      {{HTML::script('frontend/'.$company->theme.'/js/front.js')}}
      {{HTML::script('js/libs/datepicker/bootstrap-datepicker.js')}}
      {{HTML::script('js/core/utils.js')}}
        <!--DATE PICKER-->
      {{HTML::script('js/libs/clock/dist/bootstrap-clockpicker.min.js')}}
    </body>
</html>

