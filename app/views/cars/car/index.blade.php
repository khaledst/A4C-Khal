<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/cars" class="active">Mes Voitures</a></li>
        @if($mode=='edit')
        <li><a class="active">{{ $car->brand.' '.$car->model}}</a></li>
        @else
        <li><a class="active">New</a></li>
        @endif
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>{{ $car->brand.' '.$car->model}}<small></small></h3>
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
                        <li class="active" data-tab="edit-profile"><a><i class="fa fa-inbox"></i>New Offer</a></li>
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
                                    @if($car->img != null)
                                        <img class="img-rounded img-responsive img_preview img" onload="set_preview_img_class(this);" src="{{$car->img.'?'.time()}}" alt="my_pic">
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
                                            <li><a href="#"><span class="badge pull-right">42</span>Trips</a></li>
                                        </ul>
                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">KMS</span>
                                            <span class="badge pull-right">{{ $car->kms}}</span>
                                        </p>

                                    </div>




                                </div><!--end .col-sm-3 -->
                                <!-- END PROFILE SIDEBAR -->
                                <!-- START PROFILE CONTENT -->
                                <div class="col-sm-9">

                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <p class="lead">{{ $car->brand.' '.$car->model }}</p>
                                                <p>{{ $car->description }}</p>
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
                                <form data-mode="{{ $mode }}" data-id="{{ $car->id }}" data-role="{{ $auth->role() }}" data-company="{{ $car->company_id }}" class="form-horizontal form-bordered form-banded form-validate car" action="" role="form" novalidate="novalidate">
                                    <div class="form-group fl">
                                        <div class="col-lg-1">
                                            <label for="brand" class="control-label">Brand</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="brand" id="brand" value="{{ $car->brand }}" class="form-control" placeholder="Brand" required>
                                        </div>

                                        <div class="col-lg-1  bg-gray">
                                            <label for="model" class="control-label">Model</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="model" id="model" value="{{ $car->model }}" class="form-control" placeholder="Model" required>
                                        </div>

                                        <div class="col-lg-2 p0" style="padding: 0px;">
                                            <div class="img_edit_wrapper">

                                                @if(strlen($car->img) > 0)
                                                <img class="img-rounded img-responsive img_edit img" src="{{$car->img.'?'.time()}}" alt="my_pic">
                                                @else
                                                <img class="img-rounded img-responsive img_edit img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                                @endif
                                            </div>
                                            <input type="file" class="input_file_img_preview hide"></input>
                                            <input type="text" value="75" class="upload_status">
                                        </div>
                                    </div>
                                    <div class="form-group fl">
                                        <div class="col-lg-1">
                                            <label for="number" class="control-label">Number</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="number" id="number" value="{{ $car->number }}" class="form-control" placeholder="Number" required>
                                        </div>

                                        <div class="col-lg-1  bg-gray">
                                            <label for="kms" class="control-label">KMS</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" name="kms" id="kms" value="{{ $car->kms }}" class="form-control" placeholder="KMS" required>
                                        </div>

                                        <div class="col-lg-2 p0" style="padding: 0px;">


                                        </div>
                                    </div>

                                        @if($auth->is_super_admin() == true)
                                    <div class="form-group fl">
                                        <div class="col-lg-1 bg-gray">
                                            <label for="company_id" class="control-label">Societé</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <select name="company_id" data-selected="{{ $car->company_id }}" id="company_id" class="form-control" required>
                                          @foreach ($companies as $company)
                                                @if($car->company_id == $company->id)
                                                    <option value="{{$company->id}}" selected>{{$company->name}}</option>
                                                @else
                                                    <option value="{{$company->id}}">{{$company->name}}</option>
                                                @endif
                                          @endforeach
                                            </select>
                                        </div>

                                        <div class="col-lg-1 bg-gray">
                                            <label for="check-active" class="control-label">Active</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-active" data-value="{{ $car->active}}" id="check-active" checked>
                                        </div>
                                        <div class="col-lg-2" style="padding: 0px;">


                                        </div>
                                    </div>
                                        @else
                                    <div class="form-group fl">
                                        <div class="col-lg-1 bg-gray">
                                            <label for="check-active" class="control-label pl15">Active</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <input type="checkbox" name="check-active" data-value="{{ $car->active}}" id="check-active" checked>
                                        </div>

                                        <div class="col-lg-2" style="padding: 0px;">


                                        </div>
                                    </div>
                                    @endif
                                    <div class="form-group">
                                        <div class="col-lg-1">
                                            <label for="check-active" class="control-label">Description</label>
                                        </div>
                                        <div class="col-lg-9">
                                            <textarea rows="3" class="form-control" placeholder="add a description here" name="description" id="description">{{ $car->description}}</textarea>
                                        </div>
                                        <div class="col-lg-2" style="padding: 0px;">
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
{{HTML::script('js/entities/cars/car/edit.js')}}
{{HTML::script('js/core/breadcrumb.js')}}