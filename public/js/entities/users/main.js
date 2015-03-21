/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    set_users_table();

    $(".new").click(function () {

        $.get("users/-1/edit", { mode: 'new' }).done(function (data) {
            $("#content").html(data);

        })


    })
})
var table = null;



function set_users_table() {


    $('#users').jtable({
        title: 'users',
        actions: {
            listAction: 'users'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {
            id: {
                key: true
            },
            title: {
                title: 'Full Name',
                width: '40%',
                display: function (data) {
                    return data.record.Fullname;
                }
            }
        },

        selectionChanged: function () {
           
            selected_row = $('#users').jtable('selectedRows').data('record');
            $.get("users/" + selected_row.id + "/edit").done(function (data) {
                $("#content").html(data);

            })

        }
    });


    $("#users").jtable('load');


}

