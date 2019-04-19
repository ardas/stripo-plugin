window.ExternalVideosLibrary = (function() {
    var externalLibrary;
    var videoSelectCallback;
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
                <div id="externalVideoLibrary" class="modal fade in" role="dialog" tabindex="-1" style="background-color: rgba(0,0,0,.5)">\
                    <div class="modal-dialog modal-lg" role="document">\
                    <div class="modal-content">\
                        <div  class="modal-header">\
                            <div>\
                               <button aria-label="Close" class="close" type="button">\
                                    <span aria-hidden="true">×</span>\
                                </button>\
                                <h4 class="modal-title">External Videos Library</h4>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div style="display: inline-block; width: 154px; height: 120px; cursor: pointer;" class="thumbnail">\
                                <img style="height: 100px;"\
                                     src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/23121555584914821.png"\
                                     title="Create Easy & Quick Event Reminder Using Template for Food Industry"\
                                     urlVideo="https://www.youtube.com/watch?v=rNmAdmOMp0Y"\
                                     hasButton="true"\
                                />\
                            </div>\
                            <div style="display: inline-block; width: 154px; height: 120px; cursor: pointer;" class="thumbnail">\
                                <img style="height: 100px;"\
                                     src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1641555585106902.png"\
                                     title="How to Get Email Mobile & Browser Preview with Stripo"\
                                     urlVideo="https://www.youtube.com/watch?v=R4NXtC3h598"\
                                     hasButton="true"\
                                />\
                            </div>\
                            <div style="display: inline-block; width: 154px; height: 120px; cursor: pointer;" class="thumbnail">\
                                <img style="height: 100px;"\
                                     src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1881555585513981"\
                                     title="Stripo.email editor"\
                                     urlVideo="https://www.youtube.com/watch?v=ryqOEPk51Lg"\
                                />\
                            </div>\
                            <div style="display: inline-block; width: 154px; height: 120px; cursor: pointer;" class="thumbnail">\
                                <img style="height: 100px;"\
                                     src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/24481555585355917"\
                                     title="How to Add Menu in Email with Stripo"\
                                     urlVideo="https://www.youtube.com/watch?v=XPFWthaa35Q"\
                                />\
                            </div>\
                        </div>\
                    </div>\
                </div>');
        externalLibrary = $('#externalVideoLibrary');
        externalLibrary.find('.close').click(cancelAndClose);
        externalLibrary.find('.thumbnail').click(function(e) {
            var image = $(e.currentTarget).find('img');
            var urlImage = image.attr('src');
            var urlVideo = image.attr('urlVideo');
            var hasCustomButton = image.attr('hasButton');
            var originalName = image.attr('title');
            var exampleOfCallbackVideoObject = {
                originalVideoName: originalName,
                originalImageName: originalName,
                urlImage: urlImage,
                urlVideo: urlVideo,
                hasCustomButton: hasCustomButton
            };
            videoSelectCallback(exampleOfCallbackVideoObject);
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
        openLibrary: function(onVideoSelectCallback, onCancelCallback) {
            videoSelectCallback = onVideoSelectCallback;
            cancelCallback = onCancelCallback;

            renderLibrary();
        }
    };
})();