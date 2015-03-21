<html>
    <head>

        <!-- BEGIN STYLESHEETS -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,300,400,600,700,800" rel="stylesheet" type="text/css" />
        <link type="text/css" rel="stylesheet" href="../../../css/theme-default/bootstrap.css?1403937764" />
        <link type="text/css" rel="stylesheet" href="../../../css/theme-default/boostbox.css?1403937765" />
        <link type="text/css" rel="stylesheet" href="../../../css/theme-default/boostbox_responsive.css?1403937765" />
        <link type="text/css" rel="stylesheet" href="../../../css/theme-default/font-awesome.min.css?1401481653" />
        <link type="text/css" rel="stylesheet" href="../../..css/custom.css?1403937893" />

        <script type="text/javascript">

         
            function print_hide(btn) {
         

               btn.style.display='none'
                setTimeout(function () {

                    javascript: window.print();
                }, 200);

                return false;
            }

        </script>
    </head>

    <body style="background-color: white">
        <div class="section-body">

            <div class="btn-group" style=" cursor: pointer;">
                <a class="btn btn-primary" onclick="print_hide(this);"><i class="fa fa-print"></i> Print</a>
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




    </body>
</html>