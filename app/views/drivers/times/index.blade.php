<!-- BEGIN CONTENT-->
<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/drivers">Mes chauffeurs</a></li>
        <li class="active">Times</li>
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i> {{ $driver->user->first_name.' '.$driver->user->last_name }}<small></small></h3>
    </div>
    <div class="section-body">
        <div class="fl">
            <button type="button" data-action="timesheet-week-work" class="btn btn-inverse">work week</button>
            <button type="button" data-action="timesheet-week-end" class="btn btn-inverse">week end</button>
            <button type="button" data-action="timesheet-week-all" class="btn btn-inverse">all week</button>

        </div>
        <div class="fr">
            <button type="button" class="btn btn-inverse" data-action="save" style=" width:150px;  float:right">Save</button>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-bordered">

                    <div class="box-body no-padding table-responsive">
                        <div id="timesheet">

                        </div>
                    </div><!--end .box -->
                </div><!--end .col-lg-12 -->
            </div>
        </div>
    </div>
</section>


<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->
{{HTML::script('js/entities/driver/times.js')}}
{{HTML::script('js/core/breadcrumb.js')}}
<!--APP INIT-->
<script>{{ $load_time_table }}</script> 