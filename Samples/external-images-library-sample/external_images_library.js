window.ExternalImagesLibrary = (function() {
    var externalLibrary;
    var imageSelectCallback;
    var cancelCallback;

    var close = function() {
        externalLibrary.hide();
    };

    var cancelAndClose = function() {
        close();
        cancelCallback();
    };

    var initLibrary = function() {
        $('body').append('\
                <div id="externalImagesLibrary" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                    <div style="margin: 10px;">\
                    <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px;">\
                        <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                            <div>\
                               <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                    <span>×</span>\
                                </button>\
                                <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">External Images Library</h4>\
                            </div>\
                        </div>\
                        <div style="padding: 15px;">\
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                        src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/9091542014595406.png">\
                            </div>  \
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                        src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/95981542014634835.png">\
                            </div>\
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                        src="https://my.stripo.email/content/guids/CABINET_0397152026e82dd10a59009fd4c00284/images/53971542021195762.png">\
                            </div>\
                        </div>\
                    </div>\
                </div>');
        externalLibrary = $('#externalImagesLibrary');
        externalLibrary.find('.close').click(cancelAndClose);
        externalLibrary.find('.thumbnail').click(function(e) {
            var url = $(e.currentTarget).find('img').attr('src');
            var exampleOfCallbackImageObject = {
                originalName: '9091542014595406.png',
                resolution: "600 x 410 px",
                size: "169.20 kb",
                url: url
            };
            imageSelectCallback(exampleOfCallbackImageObject);
            close();
        });
    };

    var renderLibrary = function() {
        if (!externalLibrary) {
            initLibrary();
        }
        externalLibrary.show();
    };


    return {
        openLibrary: function(onImageSelectCallback, onCancelCallback) {
            imageSelectCallback = onImageSelectCallback;
            cancelCallback = onCancelCallback;
            renderLibrary();
        }
    };
})();