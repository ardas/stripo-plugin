window.ExternalVideosLibrary = (function() {
    var externalLibrary;
    var videoSelectCallback;
    var cancelCallback;

    var close = function() {
        externalLibrary.style.visibility = 'hidden';
    };
    var cancelAndClose = function() {
        close();
        cancelCallback();
    };

    var initLibrary = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalVideoLibrary" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif; ">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span>×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">External Videos Library</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div class="thumbnail" style="display: inline-block; width: 154px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                 src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/23121555584914821.png"\
                                 title="Create Easy & Quick Event Reminder Using Template for Food Industry"\
                                 urlVideo="https://www.youtube.com/watch?v=rNmAdmOMp0Y"\
                                 hasButton="true"\
                            />\
                        </div>\
                        <div class="thumbnail" style="display: inline-block; width: 154px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                 src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1641555585106902.png"\
                                 title="How to Get Email Mobile & Browser Preview with Stripo"\
                                 urlVideo="https://www.youtube.com/watch?v=R4NXtC3h598"\
                                 hasButton="true"\
                            />\
                        </div>\
                        <div class="thumbnail" style="display: inline-block; width: 154px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                 src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1881555585513981"\
                                 title="Stripo.email editor"\
                                 urlVideo="https://www.youtube.com/watch?v=ryqOEPk51Lg"\
                            />\
                        </div>\
                        <div class="thumbnail" style="display: inline-block; width: 154px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            <img style="height: 100px; margin-left: auto; margin-right: auto; max-width: 100%; display: block; vertical-align: middle;"\
                                 src="https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/24481555585355917"\
                                 title="How to Add Menu in Email with Stripo"\
                                 urlVideo="https://www.youtube.com/watch?v=XPFWthaa35Q"\
                            />\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalLibrary = document.getElementById('externalVideoLibrary');
        externalLibrary.querySelector('.close').addEventListener('click', cancelAndClose);
        externalLibrary.addEventListener('click', function(e) {
            if (!e.target.matches('img')) {
                return;
            }
            var image = e.target;
            var urlImage = image.getAttribute('src');
            var urlVideo = image.getAttribute('urlVideo');
            var hasCustomButton = image.getAttribute('hasButton');
            var originalName = image.getAttribute('title');
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
        externalLibrary.style.visibility = 'visible';
    };


    return {
        openLibrary: function(onVideoSelectCallback, onCancelCallback) {
            videoSelectCallback = onVideoSelectCallback;
            cancelCallback = onCancelCallback;

            renderLibrary();
        }
    };
})();
