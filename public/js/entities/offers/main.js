/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    set_table_offers();

    $(".new").click(function () {

        $.get("offers/-1/edit", null).done(function (data) {
            $("#content").html(data);

        })


    })
})
var table = null;



function set_table_offers() {


    $('#offers').jtable({
        title: 'Prestations',
        actions: {
            listAction: 'offers'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {
            id: {
                key: true,
                visibility: 'hidden'
            },
            title: {
                title: 'Title',
                width: '35%',
                display: function (data) {
                    return data.record.title;
                }
            },
            trip_method: {
                title: 'TYPE TRIP',
                width: '40%',
                display: function (data) {
                    switch (data.record.trip_method) {
                        case 'TZG':
                            return "TRAJECT EN ZONE GEOGRAFIQUE < 200 KM | ex (ADDRESS A) + Radius";
                        case 'TAB':
                            return "TRAJECT FIXE | (ADDRESS A => ADDRESS B) + Radius";
                        case 'TLD':
                            return "TRAJECT LONGUE DISTANCE > 200 KM | (ADDRESS A) +  RADIUS";
                    }
                }
            },
            cal_method: {
                title: 'CALC BASED ON',
                width: '10%',
                display: function (data) {
                    switch (parseInt(data.record.calc_method)) {
                        case 1:
                            return "KMS " + parseFloat(data.record.cost).toFixed(2) + " €";
                        case 2:
                            return "MINUTE " + parseFloat(data.record.cost).toFixed(2) + " €";
                        case 3:
                            return "FIXE " + parseFloat(data.record.cost).toFixed(2) + " €";
                    }
                }
            },
            radius: {
                title: 'RADIUS',
                width: '15%',
                display: function (data) {
                    switch (parseInt(data.record.calc_method)) {
                        case 1:
                            return 'A-> ' + data.record.radiusd + 'KM';
                        case 2:
                            return 'A-> ' + data.record.radiusd + 'KM';
                        case 3:
                            return 'A-> ' + data.record.radiusd + 'KM | B->' + data.record.radiusa + 'KM';
                    }
                }


            }
        },

        selectionChanged: function () {

            selected_row = $('#offers').jtable('selectedRows').data('record');
            $.get("offers/" + selected_row.id + "/edit").done(function (data) {
                $("#content").html(data);

            })

        }
    });

    $("#offers").jtable('load');


}

