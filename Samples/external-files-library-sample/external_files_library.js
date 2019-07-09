window.ExternalFilesLibrary = (function() {
    var externalLibrary;
    var fileSelectCallback;
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
                <div id="externalFileLibrary" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                    <div style="margin: 10px;">\
                    <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px;">\
                        <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                            <div>\
                               <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                    <span aria-hidden="true">×</span>\
                                </button>\
                                <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">External File Library</h4>\
                            </div>\
                        </div>\
                        <div style="padding: 15px;">\
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <span urlFile="https://www.youtube.com/1">File link 1</span>\
                            </div>\
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <span urlFile="ftps://lkjhgfd">File link 2</span>\
                            </div>\
                            <div class="thumbnail" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px;">\
                                <span urlFile="ftp://tyhujiop">File link 3</span>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
        externalLibrary = $('#externalFileLibrary');
        externalLibrary.find('.close').click(cancelAndClose);
        externalLibrary.find('.thumbnail').click(function(e) {
            const exampleOfCallbackUrlFile = $(e.currentTarget).find('span').attr('urlFile');
            fileSelectCallback(exampleOfCallbackUrlFile);
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
        openLibrary: function(onFileSelectCallback, onCancelCallback) {
            fileSelectCallback = onFileSelectCallback;
            cancelCallback = onCancelCallback;

            renderLibrary();
        }
    };
})();