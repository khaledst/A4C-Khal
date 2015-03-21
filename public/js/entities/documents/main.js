/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {
    set_documents_table();


})
var res = null;
function set_documents_table() {



    $('#documents').jtable({
        title: 'documents',
        actions: {
            listAction: function (postData, jtParams) {

                return $.Deferred(function ($dfd) {
                    var api = 'documents?' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting;

                    $.get(api).done(function (data) {
                     
                        var result = JSON.parse(data);

                        if (result.Records.length > 0)
                            $dfd.resolve(result);
                        else
                            $dfd.resolve(result);

                    }).error(function () {
                        $dfd.reject();
                    })
                });
            }

        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {
            Origin: {
                title: 'Origin',
                width: '5%',
                display: function (data) {
                    return data.record.Origin;
                }
            },
            Entity: {
                title: 'Entity',
                width: '15%',
                display: function (data) {
                    return data.record.Entity;
                }
            },
         
            Type: {
                title: 'Type',
                width: '5%',
                display: function (data) {
                    return data.record.Type;
                }
            },
            creation_Date: {
                title: 'Date Created',
                width: '20%',
                display: function (data) {
                    return data.record.Created;
                }
            },
             Title: {
                title: 'Info',
                width: '50%',
                display: function (data) {
                    return data.record.Title;
                }
            },
            id: {
                title: '',
                width: '5%',
                display: function (data) {
                    return data.record.id;
                }
            }

        },
        selectionChanged: function () {

            selected_row = $('#documents').jtable('selectedRows').data('record');
            view('/documents/' + selected_row.Origin + '/' + selected_row.id);

        }
    });



    $("#documents").jtable('load');


}