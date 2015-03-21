/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    mango_authenticate();

})
var mango_pay_auth = null;
function mango_authenticate() {

    $.ajax({
        url: "https://api.sandbox.mangopay.com/v2/oauth/token",
        type: 'POST',
        data: { 'grant_type': 'client_credentials' },
        crossdomain: true,
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Authorization': 'Basic ZnJlbmNoY29ubmVjdGlvbjIwMTU6NUNzSEtaR0JEeHY3YnR5b2VNWENiTEJLVDU5VnFzSlVNU2VkTFRYaHYxV3ZlcU5CT28=' }
    }).always(function (data) {
        mango_pay_auth = data;


        users();
    });


}

function users() {

    console.log(mango_pay_auth.token_type);
    console.log(mango_pay_auth.access_token);


    $.ajax({
        url: "https://api.sandbox.mangopay.com/v2/users",
        type: 'GET',
        crossdomain: true,
        contentType: 'application/json',
        dataType: 'jsonp',
        headers: { 'Authorization': mango_pay_auth.token_type + ' ' + mango_pay_auth.access_token }
    }).always(function (data) {
        mango_pay_auth = data;


       
    });


}