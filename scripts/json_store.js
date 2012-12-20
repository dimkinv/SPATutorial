/**
 * Created with JetBrains WebStorm.
 * User: s308847714
 * Date: 18/12/12
 * Time: 13:08
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    infuser.defaults.templateUrl = "templates";

    var Model = function () {
        this.items = ko.observable(null);
        this.items.subscribe(function () {
            console.log('listview refreshed');
        });

        this.chosenItemData = ko.observable();
        this.state = ko.observable(window.templates.items);

        this.goToItemDetails = function (item) {
            location.hash = 'home/details/' + item.id;
        };

        this.afterRenderTemplate = function (elements) {
            switch (window.currentModel.state()) {
                case window.templates.items:
                    $('#itemsList').listview();
                    break;
                case window.templates.itemDetail:
                    $('#itemsDesc').collapsibleset();
                    break;
            }
        };
    };

    Path.map('#home').to(function () {
        currentModel.state(window.templates.items);
        currentModel.items(window.dummyData);
    });
    Path.map('#home/details/:id').to(function () {
        var self = this;
        $(currentModel.items()).each(function (index, item) {
            if (item.id.toString() == self.params['id']) {
                currentModel.chosenItemData(item);
                currentModel.state(window.templates.itemDetail);
            }
        });
    });

    Path.root('#home');

    $(function () {
        window.currentModel = new Model();
        ko.applyBindings(window.currentModel);
        Path.listen();
    })
})(jQuery);

window.dummyData = [
    {
        "id":1,
        "title":"The Door",
        "artist":"Religious Knives",
        "image":"http://ecx.images-amazon.com/images/I/51og8BkN8jL._SS250_.jpg",
        "large_image":"http://ecx.images-amazon.com/images/I/51og8BkN8jL._SS500_.jpg",
        "price":9.98,
        "url":"http://www.amazon.com/Door-Religious-Knives/dp/B001FGW0UQ/?tag=quirkey-20"
    },
    {
        "id":2,
        "title":"Album",
        "artist":"Girls",
        "image":"http://ecx.images-amazon.com/images/I/51hDxOeIeML._SS250_.jpg",
        "large_image":"http://ecx.images-amazon.com/images/I/51hDxOeIeML._SS500_.jpg",
        "price":13.98,
        "url":"http://www.amazon.com/gp/product/B002GNOMJE?ie=UTF8&tag=quirkeycom-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B002GNOMJE"
    },
    {
        "id":3,
        "title":"Bitte Orca",
        "artist":"The Dirty Projectors",
        "image":"http://z2-ec2.images-amazon.com/images/P/B0026T4RTI.01._SS250_.jpg",
        "large_image":"http://z2-ec2.images-amazon.com/images/P/B0026T4RTI.01._SS500_.jpg",
        "price":13.98,
        "url":"http://www.amazon.com/Bitte-Orca-Dirty-Projectors/dp/B0026T4RTI/ref=pd_sim_m_12?tag=quirkey-20"
    },
    {
        "id":4,
        "title":"The Pains of Being Pure at Heart",
        "artist":"The Pains of Being Pure at Heart",
        "image":"http://z2-ec2.images-amazon.com/images/P/B001LGXIDS.01._SS250_.jpg",
        "large_image":"http://z2-ec2.images-amazon.com/images/P/B001LGXIDS.01._SS500_.jpg",
        "price":13.99,
        "url":"http://www.amazon.com/Pains-Being-Pure-Heart/dp/B001LGXIDS/ref=pd_sim_m_44?tag=quirkey-20"
    }
];