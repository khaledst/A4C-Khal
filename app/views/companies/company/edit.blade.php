{{HTML::script('js/core/breadcrumb.js')}}
{{HTML::script('js/entities/companies/company/edit.js')}}
@if($mode=='edit')
<script>
    var company_id = parseInt('{{$company->id}}');
</script>
@endif
<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/companies" class="active">Mes Societés</a></li>
        @if($mode=='edit')
        <li><a class="active">{{ $company->name}}</a></li>
        @else
        <li><a class="active">New</a></li>
        @endif
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>{{ $company->name  }}<small></small></h3>
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
                        @if($auth->is_admin() && strlen($company->mangopay_user_id) > 0)
                        <li class="" data-tab="mangopay-account"><a><i class="fa fa-edit"></i> MangoPay Account</a></li>
                        @endif
                @else
                        <li class="active" data-tab="edit-profile"><a><i class="fa fa-inbox"></i>New Company</a></li>

                @endif
                    </ul>
                </div>
                <!-- END PROFILE TABS -->
                <div class="tab-content" data-tabs="tabs">
                    <!-- START PROFILE OVERVIEW -->
              @if($mode =='edit')
                    <div class="tab-pane active" id="overview">
                        <div class="box-tiles style-white">
                            <div class="row">

                                <!-- START PROFILE SIDEBAR -->
                                <div class="col-sm-3 style-inverse profile">
                                    <div class="holder picture">

                                            @if(strlen($company->img) > 0)
                                        <img class="img-rounded img-responsive img_preview img" onload="set_preview_img_class(this);" src="{{ $company->img.'?'.time() }}" alt="my_pic">
                                            @else
                                        <img class="img-rounded img-responsive img_preview img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                            @endif
                                        <input type="text" value="75" class="upload_status">
                                    </div>
                                    <div class="stick-bottom-left">
                                        <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Contact me"><i class="fa fa-envelope"></i></a>
                                        <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Follow me"><i class="fa fa-twitter"></i></a>
                                        <a class="btn btn-inverse btn-equal" data-toggle="tooltip" data-placement="top" data-original-title="Personal info"><i class="fa fa-facebook"></i></a>

                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">{{ $company->name }}</span>
                                        </p>
                                    </div>
                                    <div class="box-body-darken style-inverse">
                                        <ul class="nav nav-pills nav-stacked nav-transparent">
                                            <li><a href="#"><span class="badge pull-right">42</span>Trips</a></li>
                                        </ul>
                                    </div>
                                    <div class="box-body style-inverse">
                                        <p class="text-support5-alt">
                                            <span class="text-sm">Stats</span>
                                            <span class="badge pull-right"></span>
                                        </p>

                                    </div>
                                </div><!--end .col-sm-3 -->
                                <!-- END PROFILE SIDEBAR -->
                                <!-- START PROFILE CONTENT -->
                                <div class="col-sm-9">

                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <p class="lead">{{ $company->name}}</p>
                                                <p>{{ $company->description}}</p>
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

                                                            Activity
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
                                <form data-id="{{ $company->id }}" data-mode="{{ $mode }}" data-role="{{ $auth->role() }}" class="form-horizontal form-bordered form-banded form-validate company" onsubmit="return false;" role="form" novalidate="novalidate">
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="first_name" class="control-label pl15">Nom</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" name="name" id="name" class="form-control" value="{{ $company->name }}" placeholder="Nom de la Societé" required>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="country" class="control-label pl15">Country</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <select name="country_id" id="country_id" data-selected="{{ $company->country_id }}" class="form-control" required>
                                                <option value="PT">Portugal</option>
                                                <option value="TN">Tunisie</option>
                                                <option value="FR">France</option>
                                                <option value="GB">Angleterre</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="CH">Swisse</option>
                                            </select>
                                        </div>

                                        <div class="col-lg-2 bg-gray p0" style="padding: 0px;">
                                            <div class="img_edit_wrapper">

                                                @if(strlen($company->img) > 0)
                                                <img class="img-rounded img-responsive img_edit img" src="{{ $company->img.'?'.time() }}" alt="my_pic">
                                                @else
                                                <img class="img-rounded img-responsive img_edit img" src="img/no_image.jpg?{{time()}}" alt="my_pic">
                                                @endif
                                            </div>
                                            <input type="file" class="input_file_img_preview hide"></input>
                                            <input type="text" value="75" class="upload_status">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-group fl">
                                            <div class="col-lg-2">
                                                <label for="address" class="control-label pl15">Address</label>
                                            </div>
                                            <div class="col-lg-3">
                                                <input type="text" name="address" id="address" class="form-control" placeholder="ex. Paris" value="{{ $company->address }}" required>
                                            </div>

                                            <div class="col-lg-1 bg-gray">
                                                <label for="address_number" class="control-label pl15"> Nº</label>
                                            </div>
                                            <div class="col-lg-1">
                                                <input type="text" name="address_number" id="address_number" class="form-control" value="{{ $company->address_number }}" placeholder="Número Address" required>
                                            </div>
                                            <div class="col-lg-1 bg-gray">
                                                <label for="address_number" class="control-label pl15"> Postal Code</label>
                                            </div>
                                            <div class="col-lg-2">
                                                <input type="text" name="address_code_postal" id="address_code_postal" class="form-control" value="{{ $company->address_code_postal }}" placeholder="EX: 1200 GENEVE" required>
                                            </div>
                                            <div class="col-lg-2" style="padding: 0px;"></div>
                                        </div>
                                    </div>
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="domain" class="control-label pl15">Domain</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-globe"></i></span>
                                                <input type="text" name="domain" id="domain" class="form-control" value="{{ $company->domain }}" placeholder="ex. www.mydomain.com" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="email" class="control-label pl15">Email</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                                <input type="email" name="email" id="email" class="form-control" value="{{ $company->email }}" placeholder="Email" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2" style="padding: 0px;"></div>
                                    </div>


                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="phone1" class="control-label pl15">Phone 1</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                                <input type="tel" name="phone1" id="phone1" class="form-control" value="{{ $company->phone1 }}" placeholder="Phone" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="phone2" class="control-label pl15">Phone 2</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                                <input type="tel" name="phone2" id="phone2" class="form-control" value="{{ $company->phone2 }}" placeholder="Phone" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2" style="padding: 0px;"></div>
                                    </div>
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="trade_register_number" class="control-label pl15">Trade Number</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-signal"></i></span>
                                                <input type="tel" name="trade_register_number" id="trade_register_number" value="{{ $company->trade_register_number }}" class="form-control" placeholder="Trade license number" required>
                                            </div>
                                        </div>
                                         <div class="col-lg-1">
                                            <label for="trade_register_number" class="control-label pl15">TVA</label>
                                        </div>
                                        <div class="col-lg-1">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-signal"></i></span>
                                                <input type="number" name="tva" id="tva" value="{{ $company->tva }}" max="100" min="0" step="0.1" class="form-control" placeholder="TVA" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="driver_licence_number" class="control-label pl15">Trade Register Date</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="date input-group" id="trade_register_date_ctrl" data-date-format="dd-mm-yyyy" data-date="{{ ($company->trade_register_date != null) ? date('d-m-Y', strtotime($company->trade_register_date)) : date('d-m-Y') }}">
                                                <span class="input-group-addon add-on">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                                <input size="16" type="text" id="trade_register_date" class="form-control add-on" value="{{ ($company->trade_register_date != null) ? date('d-m-Y', strtotime($company->trade_register_date)) : date('d-m-Y') }}">
                                            </div>
                                        </div>
                                    </div>

                                   @if($mode=='edit' && count($master_company))
                                      @if($company->is_mangopay())
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="mangopay_user_id" class="control-label pl15">MangoPay ID</label>
                                        </div>
                                        <div class="col-lg4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-money"></i></span>
                                                <input type="text" disabled="disabled" name="mangopay_user_id" id="mangopay_user_id" class="form-control" value="{{ $company->mangopay_user_id }}" placeholder="Enter your mangopay ID">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="check-active" class="control-label pl15">Active</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="checkbox" name="check-active" data-value="{{$company->active}}" id="check-active" checked>
                                        </div>
                                    </div>
                                      @else
                                       @if(strlen($master_company->mangopay_user_id) > 0 || ($master_company->id == $company->id))
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="mangopay_user_id" class="control-label pl15">MangoPay ID</label>
                                        </div>
                                        <div class="col-lg4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-money"></i></span>
                                                <input type="text" disabled="disabled" name="mangopay_user_id" id="mangopay_user_id" class="form-control" value="{{ $company->mangopay_user_id }}" placeholder="Enter your mangopay ID">
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <button type="button" class="btn btn-primary" onclick="create_mangopay('{{ $company->id }}');">Create MangoPay Account</button>
                                        </div>
                                        <div class="col-lg-2 bg-gray">
                                            <label for="check-active" class="control-label pl15">Active</label>
                                        </div>
                                        <div class="col-lg-2">
                                            <input type="checkbox" name="check-active" data-value="{{$company->active}}" id="check-active" checked>
                                        </div>
                                    </div>
                                       @endif
                                   @endif
                                @else
                                    <div class="form-group fl">
                                        <div class="col-lg-2 bg-gray">
                                            <label for="check-active" class="control-label pl15">Active</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <input type="checkbox" name="check-active" data-value="{{$company->active}}" id="check-active" checked>
                                        </div>
                                    </div>
                                 @endif
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="theme" class="control-label pl15">Theme</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-paint"></i></span>
                                                <input type="text" name="theme" id="theme" class="form-control" value="{{ $company->theme }}" placeholder="Enter a site theme for this company" required>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <label for="root_path" class="control-label pl15">Path</label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="fa fa-paint"></i></span>
                                                <input type="text" name="root_path" id="root_path" class="form-control" value="{{ $company->root_path }}" placeholder="Enter a root path">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div class="col-lg-2">
                                            <label for="subtitle" class="control-label pl15">Subtitle Front</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <textarea rows="3" class="form-control" placeholder="add a subtitle here" name="subtitle" id="subtitle">{{ $company->subtitle}}</textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-2">
                                            <label for="description" class="control-label pl15">Description</label>
                                        </div>
                                        <div class="col-lg-10">
                                            <textarea rows="3" class="form-control" placeholder="add a description here" name="description" id="description">{{ $company->description}}</textarea>
                                        </div>
                                    </div>

                                    <div class="form-footer fr">
                                        <button type="submit" class="btn btn-primary submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div><!--end .box-body -->
                        <!--end .tab-pane -->
                        <!-- END PROFILE EDITOR -->
                 @if($auth->is_admin() && $company->is_mangopay())
                        <div class="tab-pane" id="mangopay-account">


                            <div class="box-body style-white">
                                <div class="well mangopay-comments mh70">
                                    <span class="label label-success"><i class="fa fa-comment"></i></span>
                                    <span>No Comments</span>
                                    <div class="fr">
                                        <button type="button" class="btn btn-rounded btn-default clean-comments">Clean</button>
                                    </div>
                                </div>
                                <form data-id="{{ $mangopay_user->Id }}" data-mode="{{ $mode }}" data-role="{{ $auth->role() }}" class="form-horizontal form-bordered form-banded form-validate mangopay" onsubmit="return false;" role="form" novalidate="novalidate">
                                    <div class="form-group fl">
                                        <div class="col-lg-2">
                                            <label for="name" class="control-label pl15">Mango Name</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" name="Name" id="Name" class="form-control" placeholder="ex. Paris" value="{{ $mangopay_user->Name }}" required>
                                        </div>

                                        <div class="col-lg-2 bg-gray">
                                            <label for="address_number" class="control-label pl15"> ID</label>
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" name="Id" id="Id" class="form-control" value="{{ $mangopay_user->Id }}" disabled="disabled" required>
                                        </div>
                                        <div class="col-lg-2">
                                            <button type="button" class="btn btn-primary" onclick="edit_mangopay('{{ $company->id }}');">Edit MangoPay Account</button>
                                        </div>
                                    </div>
                                </form>
                                <div class="col-lg-12 mt20">
                                    <ul class="nav nav-tabs tabs-transparent mangopay-tabs" data-toggle="mangopay-tabs">
                                        <li class="active" onclick="bind_wallets('{{ $company->id }}');" data-tab="my-wallets"><a><i class="fa fa-edit"></i> My Wallets</a></li>
                                        <li class="" data-tab="my-bank-accounts"><a><i class="fa fa-edit"></i> Bank Accounts</a></li>
                                    </ul>

                                </div>
                                <div class="col-lg-12">
                                    <div class="tab-content" data-tabs="mangopay-tabs">
                                        <div class="tab-pane active" id="my-wallets">
                                            <div class="box-body style-white">
                                                <div class="col-lg-12 mt20">
                                                    <button type="button" class="btn btn-primary create_wallet">Create Wallet</button>

                                                    <form data-owner="{{ $mangopay_user->Id }}" data-mode="new" class="form-horizontal form-bordered form-banded form-validate wallet" style="display: none;" onsubmit="return false;" role="form" novalidate="novalidate">
                                                        <div class="form-group fl">
                                                            <div class="col-lg-2">
                                                                <label for="tag" class="control-label pl15">Name</label>
                                                            </div>
                                                            <div class="col-lg-4">
                                                                <input type="text" name="taf" id="tag" class="form-control" maxlength="255" placeholder="ex. Collect Wallet 1" value="" required>
                                                            </div>
                                                            <div class="col-lg-2 bg-gray">
                                                                <label for="currency" class="control-label pl15">Customers Collect</label>
                                                            </div>
                                                            <div class="col-lg-4">
                                                                <select name="currency" id="currency" data-selected="EUR" class="form-control" required>
                                                                    <option value="EUR">EUR</option>
                                                                    <option value="CHF">CHF</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group fl">
                                                            <div class="col-lg-2 bg-gray">
                                                                <label for="address_number" class="control-label pl15">Customers Collect</label>
                                                            </div>
                                                            <div class="col-lg-4">
                                                                <input type="checkbox" name="check-customers-collect" data-value="0" id="check-customers-collect" checked>
                                                            </div>

                                                            <div class="col-lg-2 percentage_collect_active" style="display: none">
                                                                <label for="name" class="control-label pl15">Pecentage Collected</label>
                                                            </div>
                                                            <div class="col-lg-4 percentage_collect_active" style="display: none">
                                                                <div class="input-group bg-gray">
                                                                    <div class="form-control-static">
                                                                        <div id="percentage-collected" data-value="5" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                                            <div id="percentage-collected"></div>
                                                                        </div>
                                                                    </div>
                                                                    <span class="input-group-addon" id="step-percentage-collected"></span>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 percentage_collect_inactive">

                                                            </div>

                                                        </div>
                                                        <div class="form-group fl">
                                                            <div class="col-lg-2">
                                                                <label for="description" class="control-label pl15">Description</label>
                                                            </div>
                                                            <div class="col-lg-10">
                                                                <textarea rows="3" maxlength="255" class="form-control" placeholder="Add a Description here" name="description" id="description"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-footer fr">
                                                            <button type="submit" class="btn btn-primary submit">Save</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-lg-12 mt20">
                                                    <div id="wallets"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="my-bank-accounts">
                                            <div class="col-lg-12 mt20">
                                                <button type="button" class="btn btn-primary create_bank_account">Create Bank Account</button>

                                                <form data-owner="{{ $mangopay_user->Id }}" data-mode="new" class="form-horizontal form-bordered form-banded form-validate account" style="display: none;" onsubmit="return false;" role="form" novalidate="novalidate">
                                                    <div class="form-group fl">
                                                        <div class="col-lg-2">
                                                            <label for="Tag" class="control-label pl15">Name</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="Tag" id="Tag" class="form-control" maxlength="255" placeholder="ex. NAME" value="" required>
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="currency" class="control-label pl15">Customers Collect</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <select name="Type" id="Type" class="form-control" required>
                                                                <option value="IBAN">IBAN</option>
                                                                <option value="GB">GB</option>
                                                                <option value="US">US</option>
                                                                <option value="CA">CA</option>
                                                                <option value="OTHER">OTHER</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group fl">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="OwnerName" class="control-label pl15">Account Owner Name</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="OwnerName" id="OwnerName" class="form-control" maxlength="255" placeholder="ex. Oscar Mateus" value="" required>
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="OwnerAddress" class="control-label pl15">Account Owner Address</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="OwnerAddress" id="OwnerAddress" class="form-control" maxlength="255" placeholder="ex. Rue de la fontaine, nº7 ESCH SUR ALZETTE, 1200 LUXEMBOURG" value="" required>
                                                        </div>
                                                    </div>
                                                    <!--ACCOUNT TYPE IBAN-->
                                                    <div class="form-group fl" data-type="IBAN">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="IBAN" class="control-label pl15">IBAN</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="IBAN" id="IBAN" class="form-control" maxlength="30" placeholder="ex. GR16 0110 1250 0000 0001 2300 695" value="" required>
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="OwnerAddress" class="control-label pl15">BIC</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="BIC" id="BIC" class="form-control" maxlength="255" placeholder="ex. DEUTDEFF" value="" required>
                                                        </div>
                                                    </div>
                                                    <!--ACCOUNT TYPE GB-->
                                                    <div class="form-group fl dnone" data-type="GB">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="AccountNumber" class="control-label pl15">AccountNumber</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="AccountNumber" id="AccountNumber" class="form-control" maxlength="255" placeholder="ex. 1234567889" value="">
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="SortCode" class="control-label pl15">SortCode</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="SortCode" id="SortCode" class="form-control" maxlength="6" placeholder="ex. 123456">
                                                        </div>
                                                    </div>
                                                    <!--ACCOUNT TYPE US-->
                                                    <div class="form-group fl dnone" data-type="US">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="AccountNumber" class="control-label pl15">AccountNumber</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="number" name="AccountNumber" id="AccountNumber" class="form-control" maxlength="255" placeholder="ex. 1231234324" value="">
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="ABA" class="control-label pl15">ABA</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="number" name="ABA" id="ABA" class="form-control" maxlength="9" placeholder="ex. 123456789" value="">
                                                        </div>
                                                    </div>
                                                    <!--ACCOUNT TYPE CA-->
                                                    <div class="form-group fl dnone" data-type="CA">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="BankName" class="control-label pl15">Bank Name</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="text" name="BankName" id="BankName" class="form-control" maxlength="50" placeholder="ex. Equitable Bank " value="">
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="InstitutionNumber" class="control-label pl15">Institution Number</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="number" name="InstitutionNumber" id="InstitutionNumber" class="form-control" maxlength="4" placeholder="ex. 1234" value="">
                                                        </div>
                                                    </div>
                                                    <div class="form-group fl dnone" data-type="CA">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="BranchCode" class="control-label pl15">BranchCode</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="number" name="BranchCode" id="BranchCode" class="form-control" maxlength="5" placeholder="ex. 1231234324" value="">
                                                        </div>
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="AccountNumber" class="control-label pl15">AccountNumber</label>
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <input type="number" name="AccountNumber" id="AccountNumber" class="form-control" maxlength="20" placeholder="ex. 123456789" value="" required>
                                                        </div>
                                                    </div>
                                                    <!--ACCOUNT TYPE OTHER-->
                                                    <div class="form-group fl dnone" data-type="OTHER">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="Country" class="control-label pl15">Country</label>
                                                        </div>
                                                        <div class="col-lg-10">
                                                            <select name="Country" id="Country" class="form-control" required>
                                                                <option value="PT">Portugal</option>
                                                                <option value="TN">Tunisie</option>
                                                                <option value="FR" selected>France</option>
                                                                <option value="GB">Angleterre</option>
                                                                <option value="LU">Luxembourg</option>
                                                                <option value="CH">Swisse</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group fl dnone" data-type="OTHER">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="BIC" class="control-label pl15">BIC</label>
                                                        </div>
                                                        <div class="col-lg-10">
                                                            <input type="number" name="BIC" id="BIC" class="form-control" maxlength="8" placeholder="ex. DEUTDEFF" value="" required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group fl dnone" data-type="OTHER">
                                                        <div class="col-lg-2 bg-gray">
                                                            <label for="BIC" class="control-label pl15">Account Number</label>
                                                        </div>
                                                        <div class="col-lg-10">
                                                            <input type="number" name="AccountNumber" id="AccountNumber" class="form-control" min="8" maxlength="255" placeholder="ex. 123456789" value="" required>
                                                        </div>
                                                    </div>

                                                    <div class="form-footer fr">
                                                        <button type="submit" class="btn btn-primary submit">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-lg-12 mt20">
                                                <div id="bank_accounts"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    {{HTML::script('js/entities/companies/company/mangopay.js')}}
                 @endif
                    </div><!--end .tab-content -->
                </div><!--end .box -->
            </div>
        </div>
    </div>
    </div>
</section>

