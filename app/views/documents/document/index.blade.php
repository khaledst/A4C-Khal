<section>
    <ol class="breadcrumb">
        <li><a href="/company">Accueil</a></li>
        <li><a href="/documents" class="active">My Invoices | Documents</a></li>
        @if($mode=='edit')
        <li><a class="active">{{ $document->id }}</a></li>
        @else
        <li><a class="active">New</a></li>
        @endif
    </ol>
    <div class="section-header">
        <h3 class="text-standard"><i class="fa fa-fw fa-arrow-circle-right text-gray-light"></i>{{$document->id}} <small></small></h3>
    </div>
    <div class="section-body">
        <div class="col-lg-12">
            <div class="box box-printable style-transparent">
                <div class="box-head">
                    <div class="tools">
                        <div class="btn-group">
                            <a class="btn btn-primary" onclick="print_doc({{$document->invoice->id}})"><i class="fa fa-print"></i> Print</a>
                        </div>
                    </div>
                </div>
                <div class="box-body style-white">
                    <!-- START INVOICE HEADER -->
                    <div class="row">
                        <div class="col-xs-8">
                            <h1 class="text-light"><i class="fa fa-microphone fa-fw fa-2x text-support3"> </i>Chauffeur <strong class="text-support3">Prestige</strong></h1>
                        </div>
                        <div class="col-xs-4 text-right">
                            <h1 class="text-light text-gray-light">Invoice</h1>
                        </div>
                    </div>
                    <!-- END INVOICE HEADER -->
                    <br>
                    <!-- START INVOICE DESCRIPTION -->
                    <div class="row">
                        <div class="col-xs-4">
                            <h4 class="text-light">Prepared by</h4>
                            <address>
                                <strong>{{ $document->company->name }}</strong><br>
										{{ $document->company->get_document_contact_details() }}
                            </address>
                        </div><!--end .col-md-4 -->
                        <div class="col-xs-4">
                            <h4 class="text-light">Prepared for</h4>
                            <address>
                                <strong>{{ $document->customer->FullName }}</strong><br>
										{{ $document->customer->get_document_contact_details() }}
                            </address>
                        </div><!--end .col-md-4 -->
                        <div class="col-xs-4">
                            <div class="well">
                                <div class="clearfix">
                                    <div class="pull-left">
                        INVOICE NO :
                                    </div>
                                    <div class="pull-right">
                                    {{  $document->id  }}
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="pull-left">
                                INVOICE DATE :
                                    </div>
                                    <div class="pull-right">
                                        {{  $document->created }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!--end .row -->
                    <!-- END INVOICE DESCRIPTION -->
                    <br>
                    <!-- START INVOICE PRODUCTS -->
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th style="width:60px" class="text-center">QTY</th>
                                    <th class="text-left">DESCRIPTION</th>
                                    <th style="width:140px" class="text-right">Client</th>
                                    <th style="width:90px" class="text-right">TOTAL H.T</th>
                                </tr>
													</thead>
                                <tbody>
                                     <tr>
                                     @foreach ($document->invoice->itens as $iten)
                                        <td class="text-center">{{ $iten->quantity }}</td>
                                        <td>{{ $iten->title }}</td>
                                        <td class="text-right">{{ $iten->customer }}</td>
                                        <td class="text-right">€ {{ number_format($iten->sub_total,2) }}</td>
                                     @endforeach
                                    </tr>
                                <tr>
                                    <td colspan="2" rowspan="4">
                                        <h3 class="text-light opacity-50">Invoice notes</h3>
                                     
                                    </td>
                                    <td class="text-right"><strong>Subtotal</strong></td>
                                    <td class="text-right">€ {{ number_format($document->invoice->sub_total, 2) }}</td>
                                </tr>

                                <tr>
                                    <td class="text-right hidden-border"><strong>Taxes</strong></td>
                                    <td class="text-right hidden-border">{{$document->invoice->tva}} %</td>
                                </tr>
                                <tr>
                                    <td class="text-right ft12"><strong class="text-lg text-support3">Total</strong></td>
                                    <td class="text-right ft12"><strong class="text-lg text-support3">€ {{ number_format($document->invoice->total, 2) }}</strong></td>
                                </tr>
													</tbody>
                            </table>
                        </div><!--end .col-md-12 -->
                    </div><!--end .row -->
                    <!-- END INVOICE PRODUCTS -->
                </div><!--end .box-body -->
            </div>
        </div>
    </div>
</section>

<script>


    function print_doc(id)
    {
          window.open('/documents/booking/' + id + '/pdf', '_blank');
    }
</script>
<!-- END CONTENT -->
<!-- BEGIN JAVASCRIPT -->
