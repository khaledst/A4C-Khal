<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/offers" class="active">Mes Tarifs</a></li>
        @if($mode=='edit')
        <li><a class="active">{{ $offer->title }}</a></li>
        @else
        <li><a class="active">New</a></li>
        @endif
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>{{ $offer->title }} <small></small></h3>
    </div>
    <div class="section-body">
        <div class="col-lg-12">
            <div class="box style-transparent">

                <!-- START PROFILE TABS -->
                <div class="box-head">
                    <ul class="nav nav-tabs tabs-transparent tabs" data-toggle="tabs">

                @if($mode == 'edit')
                        <li class="active" data-tab="overview"><a><i class="fa fa-inbox"></i> Overview</a></li>
                        <li class="" data-tab="edit-profile"><a><i class="fa fa-edit"></i> Change details</a></li>
                @else
                        <li class="active" data-tab="edit-profile"><a><i class="fa fa-inbox"></i> New Offer</a></li>

                @endif
                    </ul>
                </div>
                <!-- END PROFILE TABS -->
                <div class="tab-content" data-tabs="tabs">
                    <!-- START PROFILE OVERVIEW -->
                @if($mode =='edit' )
                    <div class="tab-pane active" id="overview">
                        <div class="box-tiles style-white">
                            <div class="row">

                                <!-- START PROFILE SIDEBAR -->
                                <div class="col-sm-3 style-inverse profile">
                                    <div class="holder picture">

                                        @if($offer->img != null)
                                        <img class="img-rounded img-responsive img_preview img" onload="set_preview_img_class(this);" src="{{ $offer->img.'?'.time() }}" alt="my_pic">
                                            @else
                                        <img class="img-rounded img-responsive img_preview img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                            @endif
                                        <input type="text" value="75" class="upload_status">
                                        <div class="stick-bottom-left">
                                            <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Contact me"><i class="fa fa-envelope"></i></a>
                                            <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Follow me"><i class="fa fa-twitter"></i></a>
                                            <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Personal info"><i class="fa fa-facebook"></i></a>
                                        </div>
                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Brand Model</span>
                                        </p>
                                    </div>
                                    <div class="box-body-darken style-inverse">
                                        <ul class="nav nav-pills nav-stacked nav-transparent">
                                            <li><a href="#"><span class="badge pull-right">42</span>Booked</a></li>
                                        </ul>
                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Type</span>
                                            <span class="badge pull-right">{{ $offer->get_trip_type() }}</span>
                                        </p>
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Calc Method</span>
                                            <span class="badge pull-right">{{ $offer->get_calc_method() }}</span>
                                        </p>
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Cost </span>
                                            <span class="badge pull-right">{{ $offer->get_cost() }}</span>
                                        </p>
                                    </div>
                                </div><!--end .col-sm-3 -->
                                <!-- END PROFILE SIDEBAR -->
                                <!-- START PROFILE CONTENT -->
                                <div class="col-sm-9">

                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <p class="lead">{{ $offer->title }}</p>
                                                <p>{{ $offer->description}}</p>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="pie-chart flot text-center">
                                                    <div class="chart size-3 v-inline-middle" data-title="Site visits" data-color="#FBEED5,#2E383D" style="padding: 0px; position: relative;"><canvas class="flot-base" width="111" height="111" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 111px; height: 111px;"></canvas><canvas class="flot-overlay" width="111" height="111" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 111px; height: 111px;"></canvas></div>
                                                    <div class="legend v-inline-middle text-left">
                                                        <table style="font-size:smaller;color:#545454">
                                                            <tbody>
                                                            <tr>
                                                                <td class="legendColorBox"><div style="border:1px solid #ccc;padding:1px"><div style="width:4px;height:0;border:5px solid rgb(251,238,213);overflow:hidden"></div></div></td>
                                                                <td class="legendLabel">34% visited</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="legendColorBox"><div style="border:1px solid #ccc;padding:1px"><div style="width:4px;height:0;border:5px solid rgb(46,56,61);overflow:hidden"></div></div></td>
                                                                <td class="legendLabel">66% members</td>
                                                            </tr></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div><!-- Extra row gap-->
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <div class="box tabs-below">

                                                        


                                                    </div>
                                                </div><!--end .table-responsive -->
                                            </div><!--end .col-sm-8 -->
                                        </div><!--end .row -->
                                    </div>
                                </div><!--end .col-sm-9 -->
                                <!-- END PROFILE CONTENT -->
                            </div><!--end .row -->
                        </div><!--end .box-body -->
                    </div><!--end .tab-pane -->
                    @endif
                      @if($mode =='edit' )
                    <div class="tab-pane edit" id="edit-profile">
                        @else
                        <div class="tab-pane active edit" id="edit-profile">
                        @endif
                            <div class="box-body style-white">
                                <div class="well">
                                    <span class="label label-success"><i class="fa fa-comment"></i></span>
                                    <span>No Comments</span>
                                </div>
                                <form data-mode="{{ $mode }}" data-role="{{ $auth->role() }}" data-id="{{ $offer->id }}" class="form-horizontal form-bordered form-banded form-validate offer" data-trip="fixed" id="offer" action="" role="form" novalidate="novalidate">

                                    @if($auth->is_super_admin() == true)
                                    <div class="form-group fl">
                                        <div class="col-lg-3">
                                            <label for="company_id" class="control-label">Company</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select name="company_id" data-selected="{{ $offer->company_id }}" id="company_id" class="form-control" required>
                                            @foreach ($companies as $company)
                                                @if($company->id == $offer->company_id)
                                                <option value="{{$company->id}}" selected>{{$company->name}}</option>
                                                @else
                                                    <option value="{{$company->id}}">{{$company->name}}</option>
                                                @endif
                                            @endforeach
                                            </select>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    @endif
                                    <div class="form-group fl">
                                        <div class="col-lg-3">
                                            <label for="departing" class="control-label">Titre de la Prestation</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" name="title" id="title" value="{{ $offer->title }}" class="form-control" placeholder="Titre de la Tarif" required>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>

                                    <div class="logo">
                                        <div class="img_edit_wrapper">
                                         @if(strlen($offer->img) > 0)
                                            <img class="img-rounded img-responsive img_edit img" src="{{$offer->img.'?'.time()}}" alt="my_pic">
                                                @else
                                            <img class="img-rounded img-responsive img_edit img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                        @endif
                                        </div>

                                    </div>
                                    <input type="file" class="input_file_img_preview hide"></input>
                                    <input type="text" value="75" class="upload_status">

                                    <div class="form-group fl">
                                        <div class="col-lg-3">
                                            <label for="selector" class="control-label">Description</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <textarea class="form-control" name="description" id="description" rows="3" placeholder="Description de la prestation">{{$offer->description}}</textarea>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    <div class="form-group fl">
                                        <div class="col-lg-3">
                                            <label for="selector" class="control-label">Type de Parcours</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select name="trip_method" data-value="{{ $offer->trip_method }}" id="trip_method" class="form-control" required>
                                                <option value="TZG">Trajects en zone geografique connue (KM, Minute) -> une seule Address (Zone A + Radius)</option>
                                                <option value="TAB">Trajects d' une zona A á une zone B (Prix Fixe, KM, Minute) -> (Zone A + Radius | Zone B + Radius)</option>
                                                <option value="TLD">Trajects longue distance (Km, Minute) -> une seule Address (Zone A + Radius)</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    <div class="form-group departing_group">
                                        <div class="col-lg-3">
                                            <label for="departing" class="control-label">Address de la Zone A (Depart)</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" name="departing" id="departing" value="{{ $offer->departing }}" class="form-control" placeholder="Depart" required>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    <div class="form-group departing_group">
                                        <div class="col-lg-3">
                                            <label for="radius-d" class="control-label">Radius</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <div class="form-control-static">
                                                    <div id="radiusd" data-value="{{ $offer->radiusd }}" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                        <div id="radiusd"></div>
                                                    </div>
                                                </div>
                                                <span class="input-group-addon" id="step-radiusd">{{ $offer->radiusd }}</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    <div class="form-group arrival_group">
                                        <div class="col-lg-3">
                                            <label for="arrival" class="control-label">Address de la Zone B (Arrive)</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" name="arrival" value="{{ $offer->arrival }}" id="arrival" class="form-control" placeholder="Arrival">
                                        </div>

                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>

                                    <div class="form-group arrival_group">
                                        <div class="col-lg-3">
                                            <label for="radius-a" class="control-label">Radius</label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <div class="form-control-static">
                                                    <div id="radiusa" data-value="{{ $offer->radiusa }}" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                        <div id="radiusa"></div>
                                                    </div>
                                                </div>
                                                <span class="input-group-addon" id="step-radiusa"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 bbtw">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-3">
                                            <label for="selector" class="control-label">Mode de Cacul</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <select name="calc_method" data-value="{{ $offer->calc_method }}" id="calc_method" class="form-control" required>
                                                <option value="1">KMS</option>
                                                <option value="2">MINUTE</option>
                                                <option value="3">FIXE</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-3">
                                            <label for="arrival" class="control-label">Côut</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <input type="text" name="cost" id="cost" class="form-control" value="{{ $offer->cost }}" placeholder="Côut" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-3">
                                            <label class="control-label">Chauffers élegibles</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <div data-toggle="buttons" id="drivers">
                                        @foreach ($drivers as $driver)
                                         @if($offer->CheckDriver($driver->id))
                                                <label  data-id="{{$driver->id}}"  class="btn checkbox-inline btn-checkbox-default active fl mr20">
                                                   {{ $driver->User->FullName }}
                                                </label>
                                         @else
                                                <label  data-id="{{$driver->id}}"  class="btn checkbox-inline btn-checkbox-default fl mr20">
                                                  {{ $driver->User->FullName  }}
                                                </label>
                                         @endif
                                       @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-sm form-group-md">
                                        <div class="col-lg-3">
                                            <label class="control-label">Voitures élegibles</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <div data-toggle="buttons" id="cars">
                                             
                                               @foreach ($cars as $car)
                                                 @if($offer->CheckCar($car->id))
                                                        <label  data-id="{{$car->id}}"  class="btn checkbox-inline btn-checkbox-default active fl mr20">
                                                           {{ $car->FullName }}
                                                        </label>
                                                 @else
                                                        <label data-id="{{$car->id}}" class="btn checkbox-inline btn-checkbox-default fl mr20">
                                                            {{ $car->FullName }}
                                                        </label>
                                                 @endif
                                               @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-sm form-group-md">
                                        <div class="col-lg-3">
                                            <label class="control-label">Active</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <div data-toggle="buttons" id="status">
                                                <input type="checkbox" name="check-active" data-value="{{ $offer->active}}" id="check-active" checked>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group fl">
                                        <div class="col-lg-3">
                                            <label class="control-label pl15">Availability Days/Hours</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <div class="timesheet-control">
                                                <div class="fl">
                                                    <button type="button" data-mode="collapsed" class="btn btn-inverse btn-timesheet">Show</button>
                                                </div>
                                                <div class="fr">
                                                    <button type="button" class="btn btn-inverse timesheet-clear-all">clear all</button>
                                                    <button type="button" class="btn btn-inverse timesheet-week-work">work week</button>
                                                    <button type="button" class="btn btn-inverse timesheet-week-end">week end</button>
                                                    <button type="button" class="btn btn-inverse timesheet-week-all">all week</button>

                                                </div>
                                            </div>


                                            <div id="timesheet_wrapper" class="collapsed">
                                                <div id="timesheet">

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-footer fr">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div><!--end .box-body -->
                        <!--end .tab-pane -->
                        <!-- END PROFILE EDITOR -->
                    </div><!--end .tab-content -->
                </div><!--end .box -->
            </div>
        </div>
    </div>
</section>
<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->
{{HTML::script('js/core/timesheet.js')}}
{{HTML::script('js/entities/offers/offer/edit.js?time()')}}
{{HTML::script('js/core/breadcrumb.js')}}