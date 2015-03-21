<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Dashboard de la company</title>

        <!-- BEGIN META -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="your,keywords">
        <meta name="description" content="Short explanation about this website">
        <!-- END META -->
        <!-- BEGIN STYLESHEETS -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,300,400,600,700,800" rel="stylesheet" type="text/css" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/bootstrap.css?1403937764" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/boostbox.css?1403937765" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/boostbox_responsive.css?1403937765" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/font-awesome.min.css?1401481653" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/jquery-ui/jquery-ui-boostbox.css?1403937766" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/fullcalendar/fullcalendar.css?1403937766" />
        <!--TOASTER-->
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/toastr/toastr.css?1403937766" />
        <!--Jtables css -->
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/DataTables/jquery.dataTables.css?1403937875" />
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/DataTables/TableTools.css?1403937875" />
        <!--wizard  css -->
        <link type="text/css" rel="stylesheet" href="css/theme-default/libs/wizard/wizard.css?1403937893" />
        <!--custom  css -->
        <link type="text/css" rel="stylesheet" href="css/custom.css?1403937893" />
        <!--jtable-->
        <link type="text/css" rel="stylesheet" href="js/libs/jtable/themes/lightcolor/gray/jtable.css?<?echo time()?>" />
        <!--datepicker-->
        <link type="text/css" rel="stylesheet" href="js/libs/clock/dist/bootstrap-clockpicker.min.css?<?echo time()?>" />
        <link type="text/css" rel="stylesheet" href="js/libs/clock/assets/css/github.min.css?<?echo time()?>" />
        <!--bootstrap switch-->
        <script type="text/javascript" src=""></script>
        <link type="text/css" rel="stylesheet" href="js/libs/bootstrap-switch-master/dist/css/bootstrap3/bootstrap-switch.min.css?<?echo time()?>" />
        <!--date picker switch-->
        {{ HTML::style('js/libs/datepicker/datepicker.css?'.time()) }}
        <!-- END STYLESHEETS -->
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
                    <!--[if lt IE 9]>                                                                                                                                                                                                                             <script type="text/javascript" src="{{ URL::asset('js/libs/utils/respond.min.js?1401481651') }}"></script>
                                                                                                                                                                                                                                                                                                    <![endif]-->
    </head>

    <body>

       
        <!-- BEGIN HEADER-->
        <header id="header">
            <!-- BEGIN NAVBAR -->
            <nav class="navbar navbar-default" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <a class="btn btn-transparent btn-equal btn-menu" href="javascript:void(0);"><i class="fa fa-bars fa-lg"></i></a>
                    <div class="navbar-brand">
                        <a class="main-brand" href="/company">
                            <h3 class="text-light text-white"><span>App<strong>4</strong>Chauffeur </span><i class="fa fa-fighter-jet fa-fw"></i></h3>
                        </a>
                    </div><!--end .navbar-brand -->
                    <a class="btn btn-transparent btn-equal navbar-toggle" data-toggle="collapse" data-target="#header-navbar-collapse"><i class="fa fa-wrench fa-lg"></i></a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="header-navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="/company"><i class="fa fa-home fa-lg"></i></a></li>
                    </ul><!--end .nav -->
                    <ul class="nav navbar-nav navbar-right">
                        <li><span class="navbar-devider"></span></li>                                                                                                                               
                        <li><span class="navbar-devider"></span></li>
                        <li class="dropdown">
                            <a href="javascript:void(0);" class="navbar-profile dropdown-toggle text-bold" data-toggle="dropdown">

                                <i class="fa fa-fw fa-angle-down"></i> <img class="img-circle" src="{{ URL::asset('img/avatar1.jpg?1401481655') }}" alt="3" /></a>
                            <ul class="dropdown-menu animation-slide">
                                <li><a href="/"><i class="fa fa-arrow-left"></i> Website</a></li>
                                <li><a onclick="logout()"><i class="fa fa-fw fa-power-off text-danger"></i> Logout</a></li>

                            </ul><!--end .dropdown-menu -->
                        </li><!--end .dropdown -->
                    </ul><!--end .nav -->
                </div><!--end #header-navbar-collapse -->
            </nav>
            <!-- END NAVBAR -->
        </header>
        <!-- END HEADER-->
        <!-- BEGIN BASE-->
        <div id="base">

            <!-- BEGIN SIDEBAR-->
            <div id="sidebar">
                <div class="sidebar-back"></div>
                <div class="sidebar-content">
                    <div class="nav-brand">
                        <a class="main-brand" href="/company">
                            <h3 class="text-light text-white"><span>App<strong>4</strong>Chauffeur </span><i class="fa fa-renren fa-fw"></i></h3>
                        </a>
                    </div>

                    <!-- BEGIN MAIN MENU -->
                    <ul class="main-menu">
                        <!-- Menu Dashboard -->
                    @if($user->admin == 1)
                        <li>
                            <a href="/my_company" class="active">
                                <i class="fa fa-home fa-fw"></i><span class="title">Ma Socité</span>
                            </a>
                        </li>
                         @if(Auth::user()->is_super_admin())
                        <li>
                            <a href="/companies">
                                <i class="fa fa-home fa-fw"></i><span class="title">Societés</span>
                            </a>
                        @endif
                        <li>
                            <a href="/myprofile">
                                <i class="fa fa-home fa-fw"></i><span class="title">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="/agenda">
                                <i class="fa fa-calendar-o fa-fw"></i><span class="title">Mon agenda</span>
                            </a>
                        </li>
                        <li>
                            <a href="/users">
                                <i class="fa fa-user fa-fw"></i><span class="title">Mes Utilizateurs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/customers">
                                <i class="fa fa-user fa-fw"></i><span class="title">Mes clients</span>
                            </a>
                        </li>
                        <li>
                            <a href="/documents">
                                <i class="fa fa-barcode fa-fw"></i><span class="title">Mes factures | Docs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/payments">
                                <i class="fa fa-credit-card fa-fw"></i><span class="title">Mes paiements</span>
                            </a>
                        </li>
                        <li>
                            <a href="/offers">
                                <i class="fa fa-puzzle-piece fa-fw"></i><span class="title">Mes prestations</span>
                            </a>
                        </li>
                        <li>
                            <a href="/drivers">
                                <i class="fa fa-users fa-fw"></i><span class="title">Mes chauffeurs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/bookings">
                                <i class="fa fa-users fa-fw"></i><span class="title">Bookings</span>
                            </a>
                        </li>
                        <li>
                            <a href="/amenities">
                                <i class="fa fa-users fa-fw"></i><span class="title">Extras</span>
                            </a>
                        </li>
                        <li>
                            <a href="/cars">
                                <i class="fa fa-truck fa-fw"></i><span class="title">Mes véhicules</span>
                            </a>
                        </li>


                    @else
                        @if(count($user) && $user->active == 1)
                        <li>
                            <a href="/myprofile" class="active">
                                <i class="fa fa-home fa-fw"></i><span class="title">Profile</span>
                            </a>
                        </li>
                        @endif
                    @endif
                    </ul><!--end .main-menu -->
                    <!-- END MAIN MENU -->
                </div>
            </div><!--end #sidebar-->
            <!-- END SIDEBAR -->
            <div id="content">
                <section>
                    <ol class="breadcrumb">
                        <li><a href="/">Home</a></li>
                    </ol>
                    <div class="section-header">
                        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i> Home <small></small></h3>
                    </div>
                    <div class="section-body">


                    </div>
                </section>
            </div>
        </div>



        <!--DEFAULT-->
      {{HTML::script('js/libs/jquery/jquery-1.11.0.min.js')}}
      {{HTML::script('js/libs/jquery/jquery-migrate-1.2.1.min.js')}}
      {{HTML::script('js/libs/jquery-ui/jquery-ui.min.js')}}
      {{HTML::script('js/core/BootstrapFixed.js')}}
      {{HTML::script('js/libs/bootstrap/bootstrap.min.js')}}
      {{HTML::script('js/libs/spin.js/spin.min.js')}}
      {{HTML::script('js/libs/moment/moment.min.js')}}
      {{HTML::script('js/libs/flot/jquery.flot.min.js')}}
      {{HTML::script('js/libs/toastr/toastr.min.js')}}
      {{HTML::script('js/libs/flot/jquery.flot.time.min.js')}}f
      {{HTML::script('js/libs/flot/jquery.flot.resize.min.js')}}
      {{HTML::script('js/libs/flot/jquery.flot.orderBars.js')}}
      {{HTML::script('js/libs/flot/jquery.flot.pie.js')}}
      {{HTML::script('js/libs/jquery-knob/jquery.knob.js')}}
      {{HTML::script('js/libs/sparkline/jquery.sparkline.min.js')}}
      {{HTML::script('js/libs/slimscroll/jquery.slimscroll.min.js')}}
      {{HTML::script('js/core/demo/DemoCharts.js')}}
      {{HTML::script('js/core/utils.js')}}
      {{HTML::script('js/core/App.js')}}
      {{HTML::script('js/core/demo/Demo.js')}}
        <!-- FORM VALIDATE-->
      {{HTML::script('js/libs/jquery-validation/dist/jquery.validate.min.js')}}
        <!--SWITCH ON OFF-->
      {{HTML::script('js/libs/bootstrap-switch-master/dist/js/bootstrap-switch.min.js')}}
        <!--NOTY-->
      {{HTML::script('js/libs/toastr/toastr.min.js')}}
        <!--TABLES-->
      {{HTML::script('js/libs/jtable/jquery.jtable.js')}}
        <!--CLOCK-->
      {{HTML::script('js/libs/clock/dist/bootstrap-clockpicker.min.js')}}
        <!--DATEPICKER-->
      {{HTML::script('js/libs/datepicker/bootstrap-datepicker.js')}}
        <!--dashboard-->
      {{HTML::script('js/ui_entities/dashboard/main.js')}}
      {{HTML::script('http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places')}}
        <!--CALENDAR-->
      {{HTML::script('js/libs/fullcalendar/fullcalendar.min.js')}}
      {{HTML::script('js/libs/moment/moment.min.js')}}
      
      <!--init user profile -->
      @if($user->admin == 0)
         <script> view('myprofile/dashboard'); </script> 
      @endif
    </body>
</html>