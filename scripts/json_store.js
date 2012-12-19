/**
 * Created with JetBrains WebStorm.
 * User: s308847714
 * Date: 18/12/12
 * Time: 13:08
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    infuser.defaults.templateUrl = "templates";
    console.log('just febore pageinit');
    $(document).bind('pagecreate', function(){
        $.mobile.autoInitializePage = false;
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        console.log("entered mobileinit");
    });

    var Model = function () {
        this.items = ko.observable(null);
        this.chosenItemData = ko.observable();
        this.state = ko.observable('items');

        this.goToItemDetails = function (item) {
            location = location + '#/details/' + item.id;
        };
    };
    window.currentModel = new Model();
    ko.applyBindings(window.currentModel);

    var app = $.sammy(function () {
        this.get('#/', function (context) {
            this.load('data/items.json').then(function (items) {
                $.each(items, function (i, item) {
                    context.log(item.title, '-', item.artist);
                });
                currentModel.state(window.templates.items);
                currentModel.items(items);
            })
        });
        this.get('#/details/:id', function (context) {
            var con = context;
            $(currentModel.items()).each(function (index, item, context) {
                console.log(con);
                if (item.id.toString()== con.params.id){
                    currentModel.chosenItemData(item);
                    currentModel.state(window.templates.itemDetail);
                }
            });
        });
    });

    $(function () {
        app.run('#/');
    })
})(jQuery);