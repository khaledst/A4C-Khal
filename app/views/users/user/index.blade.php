<section>
    <ol class="breadcrumb">
        @if($auth->is_admin())
        <li><a href="/company">Accueil</a></li>
        <li><a href="/{{ strtolower($workflow) }}" class="active">{{ $workflow }}</a></li>
        @endif
        @if($mode=='edit')
        <li><a class="active">{{ $user->Fullname}}</a></li>
        @else
        <li><a class="active">New</a></li>
        @endif
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>{{ $user->Fullname}}<small></small></h3>
    </div>
    <div class="section-body">
        <div class="col-lg-12">
            <div class="box style-transparent">

                <!-- START PROFILE TABS -->
                <div class="box-head">
                    <ul class="nav nav-tabs tabs-transparent tabs" data-toggle="tabs">

                @if($mode == 'edit')
                        <li class="active" data-tab="overview"><a><i class="fa fa-inbox"></i> Overview</a></li>
                        <li class="" data-tab="edit-profile"><a><i class="fa fa-edit"></i> User details</a></li>
                        @if($user->is_driver())
                        <li class="" data-tab="edit-driver-profile"><a><i class="fa fa-edit"></i> Driver details</a></li>
                        @endif
                        @if($auth->is_admin())
                        <li class="" data-tab="mango"><a><i class="fa fa-edit"></i>Mango Account</a></li>
                        @endif
                @else
                        <li class="active" data-tab="edit-profile"><a><i class="fa fa-inbox"></i>New User</a></li>

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

                                            @if(strlen($user->img) > 0)
                                        <img class="img-rounded img-responsive img_preview img" onload="set_preview_img_class(this);" src="{{$user->img}}" alt="my_pic">
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
                                            <span class="text-sm">Name</span>
                                        </p>
                                    </div>
                                    <div class="box-body-darken style-inverse">
                                        <ul class="nav nav-pills nav-stacked nav-transparent">
                                            <li><a href="#"><span class="badge pull-right">42</span>Trips</a></li>
                                        </ul>
                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Age</span>
                                            <span class="badge pull-right">{{ $user->get_age()}}</span>
                                        </p>

                                    </div>
                                </div><!--end .col-sm-3 -->
                                <!-- END PROFILE SIDEBAR -->
                                <!-- START PROFILE CONTENT -->
                                <div class="col-sm-9">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">

                                                    @if($user->is_customer() || $user->is_driver())
                                                <div class="col-lg-12">
                                                    <div class="box box-tiles style-support3">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="box-body-darken small-padding style-support3">
                                                                    <div class="btn-group changeview" data-toggle="buttons">
                                                                        <label class="btn btn-sm btn-support3 active">
                                                                            <input type="radio" name="calendarMode" value="month">Month
                                                                        </label>
                                                                        <label class="btn btn-sm btn-support3">
                                                                            <input type="radio" name="calendarMode" value="agendaWeek">Week
                                                                        </label>
                                                                        <label class="btn btn-sm btn-support3">
                                                                            <input type="radio" name="calendarMode" value="agendaDay">Day
                                                                        </label>
                                                                    </div>
                                                                    <div class="btn-group pull-right">
                                                                        <button id="calender-prev" type="button" class="btn btn-sm btn-equal btn-support3"><i class="fa fa-chevron-left"></i></button>
                                                                        <button id="calender-next" type="button" class="btn btn-sm btn-equal btn-support3"><i class="fa fa-chevron-right"></i></button>
                                                                    </div>
                                                                </div>
                                                                <div class="force-padding">
                                                                    <h1 class="text-light selected-day">Sunday</h1>
                                                                    <h3 class="text-light selected-date">01 May 2016</h3>
                                                                    <br><br>
                                                                    <ul class="list-events list-group">
                                                                        <li class="list-group-header">
                                                                            <h4 class="text-light"><i class="fa fa-plus-circle fa-fw"></i> Create Events (Soon)</h4>
                                                                        </li>
                                                                                                                                                    <!--<li class="list-group-item ui-draggable" style="top: 0px; left: 0px; z-index: auto;">
                                                                                                                                                                                                                                        <span>Call clients for follow-up</span>
                                                                                                                                                                                                                                    </li>
                                                                                                                                                                                                                                    <li class="list-group-item ui-draggable" style="top: 0px; left: 0px; z-index: auto;">
                                                                                                                                                                                                                                        <span>Schedule meeting</span>
                                                                                                                                                                                                                                    </li>
                                                                                                                                                                                                                                    <li class="list-group-item ui-draggable" style="top: 0px; left: 0px; z-index: auto;">
                                                                                                                                                                                                                                        <span>Upload files to server</span>
                                                                                                                                                                                                                                    </li>
                                                                                                                                                                                                                                    <li class="list-group-item ui-draggable">
                                                                                                                                                                                                                                        <span>Book flight for holiday</span>
                                                                                                                                                                                                                                    </li>-->
                                                                    </ul>
                                                                </div>
                                                            </div><!--end .col-md-3 -->
                                                            <div class="col-md-9 style-white">
                                                                <div id="calendar" class="fc fc-ltr">

                                                                </div>
                                                            </div><!--end .col-md-9 -->
                                                        </div><!--end .row -->
                                                    </div><!--end .box -->
                                                </div>
                                                        @else
                                                            Activity
                                                        @endif
                                            </div><!--end .table-responsive -->
                                        </div><!--end .col-sm-8 -->
                                    </div><!--end .row -->
                                </div><!--end .col-sm-9 -->
                                <!-- END PROFILE CONTENT -->
                            </div><!--end .row -->
                        </div><!--end .box-body -->
                    </div>
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
                                <form data-mode="{{ $mode }}" data-role="{{ $auth->role() }}" data-id="{{ $user->id }}" class="form-horizontal form-bordered form-banded form-validate user" id="offer" onsubmit="return false;" role="form" novalidate="novalidate">
                                    <div class="form-group fl">
                                        <div class="col-lg-1">
                                            <label for="first_name" class="control-label pl15">Titre</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <select name="title" id="title" class="form-control" required>
                                                <option value="2">Monsieur</option>
                                                <option value="1">Madamme</option>
                                                <option value="1">Engénieur</option>
                                                <option value="1">Architect</option>
                                                <option value="1">Doctor</option>
                                            </select>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="email" class="control-label pl15">Email</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon">@</span>
                                                <input type="text" id="email" name="email" class="form-control" value="{{ $user->email}}" placeholder="Type the Email">
                                            </div>
                                        </div>

                                        <div class="col-lg-2 p0" style="padding: 0px;">
                                            <div class="img_edit_wrapper">

                                                @if(strlen($user->img) > 0)
                                                <img class="img-rounded img-responsive img_edit img" src="{{$user->img}}" alt="my_pic">
                                                @else
                                                <img class="img-rounded img-responsive img_edit img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                                @endif
                                            </div>
                                            <input type="file" class="input_file_img_preview hide"></input>
                                            <input type="text" value="75" class="upload_status">
                                        </div>

                                    </div>
                                    <div class="form-group fl">

                                        <div class="col-lg-1 bg-gray">
                                            <label for="first_name" class="control-label pl15">Prénom</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="first_name" id="first_name" class="form-control" value="{{ $user->first_name}}" placeholder="Prenon" required>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="last_name" class="control-label pl15">Nom</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="last_name" id="last_name" class="form-control" value="{{ $user->last_name}}" placeholder="Nom" required>
                                        </div>

                                        <div class="col-lg-2">

                                        </div>
                                    </div>

                                    <div class="form-group fl">

                                        <div class="col-lg-1 bg-gray">
                                            <label for="username" class="control-label pl15">Username</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                                <input type="text" id="username" value="{{ $user->username}}" name="username" class="form-control" placeholder="Type the Username">
                                            </div>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="password" class="control-label pl15">Password</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                                <input type="password" id="password" name="password" class="form-control" placeholder="Type a Password">
                                            </div>
                                        </div>

                                        <div class="col-lg-2">

                                        </div>
                                    </div>

                                    <div class="form-group fl">

                                        <div class="col-lg-1 bg-gray">
                                            <label for="phone" class="control-label pl15">Phone</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                                <input type="tel" id="phone" value="{{ $user->phone}}" name="phone" class="form-control" placeholder="Type the Phone">
                                            </div>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="mobile" class="control-label pl15">Mobile</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-mobile"></i></span>
                                                <input type="tel" id="mobile" name="mobile" class="form-control" placeholder="Type a mobile">
                                            </div>
                                        </div>
                                        <div class="col-lg-2">

                                        </div>
                                    </div>

                                    <div class="form-group fl">

                                        <div class="col-lg-1 bg-gray">
                                            <label for="country_id" class="control-label pl15">Pays</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <select name="title" id="country_id" class="form-control" required>
                                                <option value="FR">France</option>
                                                <option value="CH">Swisse</option>
                                                <option value="GB">UK</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="PT">Portugal</option>
                                            </select>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="address" class="control-label pl15">Address</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" name="address" id="address" class="form-control" value="{{ $user->address}}" placeholder="address" required>
                                        </div>
                                        <div class="col-lg-1 bg-gray">
                                            <label for="address_number" class="control-label pl15">Porte</label>
                                        </div>
                                        <div class="col-lg-1">
                                            <input type="text" name="address_number" id="address_number" class="form-control" value="{{ $user->address_number}}" placeholder="Nº" required>
                                        </div>
                                        <div class="col-lg-1 bg-gray">
                                            <label for="address_number" class="control-label pl15">Code Postal</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <input type="text" name="address_code_postal" id="address_code_postal" class="form-control" value="{{ $user->address_code_postal}}" placeholder="Code Postal" required>
                                        </div>
                                    </div>

                                        @if($auth->is_super_admin() == true)
                                    <div class="form-group fl">
                                        <div class="col-lg-2 bg-gray">
                                            <label for="company_id" class="control-label pl15">Societé</label>
                                        </div>
                                        <div class="col-lg-4">
                                              <select name="company_id" data-selected="{{ $user->company_id }}" id="company_id" class="form-control" required>
                                          @foreach ($companies as $company)
                                                @if($user->company_id == $company->id)
                                                <option value="{{$company->id}}" selected>{{$company->name}}</option>
                                                @else
                                                <option value="{{$company->id}}">{{$company->name}}</option>
                                                @endif
                                          @endforeach
                                            </select>
                                        </div>
                                        <div class="col-lg-6">
                                        </div>

                                    </div>
                                        @endif
                                        @if($auth->admin)
                                    <div class="form-group fl">
                                        <div class="col-lg-2 bg-gray">
                                            <label for="check-active" class="control-label pl15">Active</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-active" data-value="{{ $user->active}}" id="check-active" checked>
                                        </div>

                                        <div class="col-lg-2 bg-gray">
                                            <label for="check-admin" class="control-label pl15">Admin</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-admin" data-value="{{ $user->admin}}" id="check-admin" checked>
                                        </div>
                                    </div>

                                    <div class="form-group fl">

                                        <div class="col-lg-2 bg-gray">
                                            <label for="first_name" class="control-label pl15">Customer</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-customer" data-value="{{ ($user->Customer == null) ?  0 : $user->Customer->active }}" id="check-customer" checked>
                                        </div>

                                        <div class="col-lg-2 bg-gray">
                                            <label for="last_name" class="control-label pl15">Driver</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-driver" data-value="{{ ($user->Driver == null) ? 0 : $user->Driver->active }}" id="check-driver" checked>
                                        </div>
                                    </div>
                                        @endif
                                    <div class="form-footer fr">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        @if($user->is_driver())
                        <div class="tab-pane" id="edit-driver-profile">
                            <div class="box-body style-white">
                                <div class="well">
                                    <span class="label label-success"><i class="fa fa-comment"></i></span>
                                    <span>No Comments</span>
                                </div>
                                <form data-mode="{{ $mode }}" data-role="{{ $auth->role() }}" data-id="{{ $user->driver->id }}" class="form-horizontal form-bordered form-banded form-validate driver-form" onsubmit="return false;" role="form" novalidate="novalidate">
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="first_name" class="control-label pl15">License Number</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon">N</span>
                                                <input type="text" id="license_number" name="license_number" class="form-control" value="{{ $user->driver->license_number }}" placeholder="Type the license number">
                                            </div>
                                        </div>

                                        <div class="col-lg-2 bg-gray">
                                            <label for="email" class="control-label pl15">Expiration Date</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="date input-group" id="license_expiration_ctrl" data-date-format="dd-mm-yyyy" data-date="{{ ($user->driver->license_expiration != null) ? date('d-m-Y', strtotime($user->driver->license_expiration)) : date('d-m-Y') }}">
                                                <span class="input-group-addon add-on">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                <input size="16" type="text" id="license_expiration" class="form-control add-on" value="{{ ($user->driver->license_expiration != null) ? date('d-m-Y', strtotime($user->driver->license_expiration)) : date('d-m-Y') }}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                          
                                            <label for="cars" data-FR ="" class="control-label pl15">Cars</label>
                                        </div>
                                      
                                        <div class="col-lg-10" id="cars">
                                               @foreach ($cars as $car)
                                                 @if($user->Driver->CheckCar($car->id))
                                                    <label data-id="{{$car->id}}" class="btn checkbox-inline btn-checkbox-default active fl mr20">
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

                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label class="control-label pl15">Working Days/Hours</label>
                                        </div>
                                        <div class="col-lg-10">
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
                        </div><!--end .box -->
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
    </div>
</section>

<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->
{{HTML::script('js/core/breadcrumb.js')}}
<script>
    var is_driver = false;
    var is_customer = false;
    var customer_id = null;
    var driver_id = null;
</script>
@if($user->is_customer())
<script>
     is_driver = false;
     is_customer = true;
    var customer_id = "{{ $user->Customer->id }}";
</script>
@endif
@if($user->is_driver())
{{HTML::script('js/core/timesheet.js')}}
<script>
     is_driver = true;
    is_customer = false;
    var driver_id = "{{ $user->Driver->id }}";
</script>
@endif
@if($auth->is_admin())
<script>
    var  is_admin = true;
</script>
@else
<script>
    var  is_admin = false;
</script>
@endif

{{HTML::script('js/entities/users/user/edit.js')}}
{{HTML::script('js/entities/users/user/events.js')}}