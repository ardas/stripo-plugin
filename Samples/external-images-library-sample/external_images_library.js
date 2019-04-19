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
                <div id="externalImagesLibrary" class="modal fade in" role="dialog" tabindex="-1" style="background-color: rgba(0,0,0,.5)">\
                    <div class="modal-dialog modal-lg" role="document">\
                    <div class="modal-content">\
                        <div  class="modal-header">\
                            <div>\
                               <button aria-label="Close" class="close" type="button">\
                                    <span aria-hidden="true">×</span>\
                                </button>\
                                <h4 class="modal-title">External Images Library</h4>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div style="display:inline-block;width:154px;height:120px;cursor:pointer;" class="thumbnail">\
                                <img style="height: 100px;" src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/9091542014595406.png">\
                            </div>  \
                            <div style="display:inline-block;width:154px;height:120px;cursor:pointer;" class="thumbnail">\
                                <img style="height: 100px;" src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/95981542014634835.png">\
                            </div>\
                            <div style="display:inline-block;width:154px;height:120px;cursor:pointer;" class="thumbnail">\
                                <img style="height: 100px;" src="https://my.stripo.email/content/guids/CABINET_0397152026e82dd10a59009fd4c00284/images/53971542021195762.png">\
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