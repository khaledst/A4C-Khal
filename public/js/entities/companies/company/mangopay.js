
$(document).ready(function () {

    active_tabs('mangopay-tabs');

    bind_wallets(company_id);

    set_wallet_form();

    set_swicth_create_form();

    set_bank_account_form();

    bind_bankaccounts(company_id)


    $('.clean-comments').click(function () {

        $(this).parent().parent().find('span').remove();

    })
})


function set_bank_account_form() {

    $("#Type").change(function () {
        //hide all typ sections
        $('.account').find("[data-type]").toggle(false);
        $('.account').find("[data-type]").find("input").removeAttr("required");
        // get the selected section
        var selected_section = $(this).val();

        $('.account').find('[data-type = "' + selected_section + '"]').toggle(true);
        $('.account').find('[data-type = "' + selected_section + '"]').find("input").attr("required", "required");

    })


    $(".account").find(".submit").click(function () {


        var validator = $(".account").validate();
        validator.form();
        console.log(validator.errorList.length);
        if (validator.errorList.length == 0) {


            var bank_account = get_bak_account($(".account").find("#Type").val());


            //normal data data
            bank_account.Tag = $(".account").find("#Tag").val();
            bank_account.Type = $(".account").find("#Type").val();
            bank_account.OwnerName = $(".account").find("#OwnerName").val();
            bank_account.OwnerAddress = $(".account").find("#OwnerAddress").val();


            //normal dianmic data form
            switch (bank_account.Type) {

                case 'IBAN':
                    bank_account.IBAN = $(".account").find("[data-type='IBAN']").find("#IBAN").val();
                    bank_account.BIC = $(".account").find("[data-type='IBAN']").find("#BIC").val();
                    break;

                case 'GB':
                    bank_account.AccountNumber = $(".account").find("[data-type='GB']").find("#AccountNumber").val();
                    bank_account.SortCode = $(".account").find("[data-type='GB']").find("#SortCode").val();
                    break;

                case 'US':
                    bank_account.AccountNumber = $(".account").find("[data-type='US']").find("#AccountNumber").val();
                    bank_account.ABA = $(".account").find("[data-type='US']").find("#ABA").val();
                    break;

                case 'CA':
                    bank_account.BankName = $(".account").find("[data-type='CA']").find("#BankName").val();
                    bank_account.InstitutionNumber = $(".account").find("[data-type='CA']").find("#InstitutionNumber").val();
                    bank_account.BranchCode = $(".account").find("[data-type='CA']").find("#BranchCode").val();
                    bank_account.AccountNumber = $(".account").find("[data-type='CA']").find("#AccountNumber").val();
                    break;

                default:
                    bank_account.Country = $(".account").find("[data-type='CA']").find("#Country").val();
                    bank_account.BIC = $(".account").find("[data-type='CA']").find("#BIC").val();
                    bank_account.AccountNumber = $(".account").find("[data-type='CA']").find("#AccountNumber").val();
                    break;

            }

            $.get('mangopay/bank/account/edit/' + company_id, { bank_account: JSON.stringify(bank_account) }).done(function (status) {

                status = JSON.parse(status);
                parse_status(status);

                if (status.result) {
                    $('#bank_accounts').jtable('load');
                }


            }).error(function () {


            });

        }

        return false;
    })

}

function set_swicth_create_form() {

    $(".create_wallet").click(function () {
        $(".wallet").removeAttr("data-id");
        $(".wallet").find("#tag").val('').change();
        $(".wallet").find("#description").val('').change();
        $(".wallet").find("#currency").val('EUR').change();
        $(".wallet").find("#check-customers-collect").prop('checked', 0).change()
        $("#step-percentage-collected").text(5 + ' %').change();
        $("#step-percentage-collected").text(5 + ' %')
        $(".wallet").toggle();
    })

    $(".create_bank_account").click(function () {
        $(".account").removeAttr("data-id");
        $(".account").find("#Tag").val('').change();
        $(".account").find("#Type").val('IBAN').change();
        $(".account").find("#OwnerName").val('').change();
        $(".account").find("#OwnerAddress").val('').change();


        $(".account").toggle();
    })

}

function set_wallet_form() {
    mode = $(".wallet").data("mode");

    $("#check-customers-collect").bootstrapSwitch({

        onSwitchChange: function (event, state) {

            if (state) {
                $('.percentage_collect_active').toggle(true);
                $('.percentage_collect_inactive').toggle(false);
            }
            else {
                $('.percentage_collect_active').toggle(false);
                $('.percentage_collect_inactive').toggle(true);

            }




        }

    });
    set_switch($("#check-customers-collect"));

    $("#check-active").bootstrapSwitch();
    set_switch($("#check-active"));

    $("#percentage-collected").slider({
        range: "max",
        min: 0.1,
        max: 100,
        value: 5,
        step: 0.1,
        slide: function (event, ui) {

            $("#step-percentage-collected").text(ui.value + ' %').change();
        }
    });
    $("#step-percentage-collected").text($("#percentage-collected").slider("value") + ' %');



    $(".wallet").find(".submit").click(function () {


        var validator = $(".wallet").validate();
        validator.form();

        if (validator.errorList.length == 0) {

            var wallet = get_wallet();

            if ($(".wallet").attr("data-id") != undefined)
                wallet.Id = parseInt($(".wallet").attr("data-id"));

            wallet.tag = $(".wallet").find("#tag").val();
            wallet.description = $(".wallet").find("#description").val();
            wallet.currency = $(".wallet").find("#currency").val();
            wallet.customer_collect = ($(".wallet").find("#check-customers-collect").prop("checked")) ? 1 : 0;

            if (wallet.customer_collect == 1)
                wallet.customer_collect_percentage = $("#percentage-collected").slider("value");

            $.get('/mangopay/company/wallets/edit', { wallet: JSON.stringify(wallet) }).done(function (status) {

                status = JSON.parse(status);
                parse_status(status);

                if (status.result) {
                    bind_wallets(company_id);
                }


            }).error(function () {


            })
        }

        return false;
    })

}


function bind_wallets(id) {

    var api = 'mangopay/company/wallets/' + id + '?';

    $('#wallets').jtable({
        title: 'wallets',
        actions: {
            listAction: function (postData, jtParams) {

                return $.Deferred(function ($dfd) {


                    $.ajax({
                        url: api + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                        type: 'GET',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {

                            parse_status(data.Status);
                            add_comment(data.Status.status, data.Status.msg, $('.mangopay-comments'))
                            $dfd.resolve(data);


                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            },
          deleteAction: function (postData) {

                return $.Deferred(function ($dfd) {

                    $.get('/mangopay/wallets/inactive/' + company_id + '/' + postData.Id).done(function (data) {

                        data = JSON.parse(data);
                        parse_status(data);

                        if (data.result)
                            bind_wallets();

                        var result = new Object();
                        result.Result = "OK";
                        $dfd.resolve(result);

                    }).error(function () {
                        $dfd.reject();

                    });
                });
            }
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {
            Id: {
                key: true,
                title: 'Id',
                width: '10%',
                display: function (data) {
                    return data.record.Id;
                }
            },
            Tag: {
                title: 'Name',
                width: '30%',
                display: function (data) {
                    return data.record.Tag;
                }
            },
            CreationDate: {
                title: 'Created',
                width: '20%',
                display: function (data) {

                    var date_creation = new Date(data.record.CreationDate * 1000);
                    return date_creation.toGMTString();
                }
            },
            Type: {
                title: 'Type',
                width: '10%',
                display: function (data) {
                    return data.record.Type;
                }
            },
            Currency: {
                title: 'Currency',
                width: '10%',
                display: function (data) {
                    return data.record.Currency;
                }
            },
            Balance: {
                title: 'Balance',
                width: '20%',
                display: function (data) {
                    return data.record.Balance.Amount + ' ' + data.record.Balance.Currency;
                }
            }

        },

        selectionChanged: function () {

            wallet = $('#wallets').jtable('selectedRows').data('record');
            $(".wallet").attr("data-id", wallet.Id);
            $(".wallet").find("#tag").val(wallet.Tag).change();
            $(".wallet").find("#description").val(wallet.Description).change();
            $(".wallet").find("#currency").val(wallet.Currency).change();
            $(".wallet").find("#check-customers-collect").prop('checked', wallet.customer_collect).change()
            $("#percentage-collected").slider("value", wallet.customer_collect_percentage).change();
            $("#step-percentage-collected").text(wallet.customer_collect_percentage + ' %');
            $(".wallet").toggle(true);
        }

    });

    $('#wallets').jtable('load');


}

function bind_bankaccounts(id) {

    var api = 'mangopay/bankaccounts/company/' + id + '?';

    $('#bank_accounts').jtable({
        title: 'Bank Accounts',
        actions: {
            listAction: function (postData, jtParams) {

                return $.Deferred(function ($dfd) {


                    $.ajax({
                        url: api + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                        type: 'GET',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {

                            parse_status(data.Status);
                            add_comment(data.Status.status, data.Status.msg, $('.mangopay-comments'))
                            $dfd.resolve(data);


                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            },
            deleteAction: function (postData) {

                return $.Deferred(function ($dfd) {


                    $.get('/mangopay/bankaccounts/inactive/' + company_id + '/' + postData.Id).done(function (data) {

                        data = JSON.parse(data);
                        parse_status(data);

                        if (data.result)
                            bind_wallets();

                        var result = new Object();
                        result.Result = "OK";
                        $dfd.resolve(result);

                    }).error(function () {
                        $dfd.reject();

                    });
                });
            }
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {
            Id: {
                key: true,
                title: 'Id',
                width: '10%',
                display: function (data) {
                    return data.record.Id;
                }
            },
            Tag: {
                title: 'Name',
                width: '30%',
                display: function (data) {
                    return data.record.Tag;
                }
            },
            CreationDate: {
                title: 'Created',
                width: '20%',
                display: function (data) {

                    var date_creation = new Date(data.record.CreationDate * 1000);
                    return date_creation.toGMTString();
                }
            },
            Type: {
                title: 'Type',
                width: '10%',
                display: function (data) {
                    return data.record.Type;
                }
            },
            OwnerName: {
                title: 'OwnerName',
                width: '10%',
                display: function (data) {
                    return data.record.OwnerName;
                }
            }

        },

        selectionChanged: function () {

            bank_account = $('#bank_accounts').jtable('selectedRows').data('record');
            //$(".wallet").attr("data-id", wallet.Id);
            //$(".wallet").find("#tag").val(wallet.Tag).change();
            //$(".wallet").find("#description").val(wallet.Description).change();
            //$(".wallet").find("#currency").val(wallet.Currency).change();
            //$(".wallet").find("#check-customers-collect").prop('checked', wallet.customer_collect).change()


            //$("#percentage-collected").slider("value", wallet.customer_collect_percentage).change();
            //$("#step-percentage-collected").text(wallet.customer_collect_percentage + ' %');

            //$(".wallet").toggle(true);
        }

    });

    $('#bank_accounts').jtable('load');


}

function get_wallet() {

    var wallet = new Object();
    wallet.Id = '';
    wallet.tag = null;
    wallet.company_id = company_id;
    wallet.description = null;
    wallet.currency = null;
    wallet.customer_collect = null;
    wallet.customer_collect_percentage = null;
    wallet.active = 1;
    return wallet;

}

function get_bak_account(type) {
    var bank_account = new Object();
    bank_account.company_id = company_id;
    bank_account.Id = null;
    bank_account.Userid = null;
    bank_account.Tag = null;
    bank_account.Type = null;
    bank_account.OwnerName = null;
    bank_account.OwnerAddress = null;
    bank_account.active = 1;

    switch (type) {

        case 'IBAN':
            bank_account.IBAN = null;
            bank_account.BIC = null;
            break;

        case 'GB':
            bank_account.AccountNumber = null;
            bank_account.SortCode = null;
            break;

        case 'US':
            bank_account.AccountNumber = null;
            bank_account.ABA = null;
            break;

        case 'CA':
            bank_account.BankName = null;
            bank_account.InstitutionNumber = null;
            bank_account.BranchCode = null;
            bank_account.AccountNumber = null;
            break;

        default:
            bank_account.Country = null;
            bank_account.BIC = null;
            bank_account.AccountNumber = null;
            break;

    }


    return bank_account;

}