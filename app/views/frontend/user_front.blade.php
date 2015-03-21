<!-- BEGIN CONTENT-->
<section id="section7" class="section" style="height: 100%;">

    <div class="navbar bgwhite text-center"> 
        <h3 class="section-title">WELCOME, {{ $user->Fullname }}</h3>
    </div>

    <div class="dashboard_loader">
        <div id="block_1" class="barlittle"></div>
        <div id="block_2" class="barlittle"></div>
        <div id="block_3" class="barlittle"></div>
        <div id="block_4" class="barlittle"></div>
        <div id="block_5" class="barlittle"></div>
    </div>
    <div class="container">
        <div class="col-sm-12 col-md-12">
         @if(count($user) > 0 && $user->admin == true)
            <div class="col-md-4 admin-dash">
                <div class="box box-type-pricing">
                    <div class="box-body text-center style-inverse" style="min-height: 255px;">
                        <p class="opacity-100" style="padding-top: 10px;"><em class="title" style="font-size: 18px;">ADMIN</em></p>
                        <div class="price">
                            <span class="text-lg price"></span>
                        </div>
                    </div>
                </div><!--end .box -->
            </div>
        @endif
         @if(count($user->Driver) > 0  && $user->Driver->active == true)
            <div class="col-md-4 driver-dash">
                <div class="box box-type-pricing">
                    <div class="box-body text-center style-inverse" style="min-height: 255px;">
                        <p class="opacity-100" style="padding-top: 10px;"><em class="title" style="font-size: 18px;">DRIVERS DASHBOARD</em></p>
                        <div class="price">
                            <span class="text-lg price"></span>
                        </div>
                    </div>
                </div><!--end .box -->
            </div>
        @endif
        @if(count($user->Customer) > 0 && $user->Customer->active == true)
            <div class="col-md-4 customer-dash">
                <div class="box box-type-pricing">
                    <div class="box-body text-center style-inverse" style="min-height: 255px;">
                        <p class="opacity-100" style="padding-top: 10px;"><em class="title" style="font-size: 18px;">CUSTOMER DASHBOARD</em></p>
                        <div class="price">
                            <span class="text-lg price"></span>
                        </div>
                    </div>
                </div><!--end .box -->
            </div>
        @endif
        </div>
    </div>
</section>
</div>
<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->    
     {{HTML::script('frontend/'.$company->theme.'/js/front.js')}}
