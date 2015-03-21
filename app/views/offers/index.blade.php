<!-- BEGIN CONTENT-->
<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/offers" class="active">Mes Tarifs</a></li>
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>Mes Tarifs<small></small></h3>
    </div>
    <div class="section-body">

        <button type="button" data-action="new" class="btn btn-inverse new" style="float:right">Créer une nouvelee Tarife</button>
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-bordered">

                    <div class="box-body no-padding table-responsive">
                        <div id="offers"></div>
                    </div><!--end .box-body -->
                </div><!--end .box -->
            </div><!--end .col-lg-12 -->
        </div>


        <!-- END DATATABLE 2 -->
    </div>
</section>


<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->
{{HTML::script('js/entities/offers/main.js')}}
{{HTML::script('js/core/breadcrumb.js')}}