window.ExternalFilesLibrary = (function() {
    var externalLibrary;
    var fileSelectCallback;
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
            <div id="externalFileLibrary" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">External File Library</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div class="thumbnail" urlFile="https://www.youtube.com/1" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            File link 1\
                        </div>\
                        <div class="thumbnail" urlFile="ftps://lkjhgfd" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            File link 2\
                        </div>\
                        <div class="thumbnail" urlFile="ftp://tyhujiop" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            File link 3\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalLibrary = document.getElementById('externalFileLibrary');
        externalLibrary.querySelector('.close').addEventListener('click', cancelAndClose);
        externalLibrary.addEventListener('click', function(e) {
            if (!e.target.matches('.thumbnail')) {
                return;
            }
            const exampleOfCallbackUrlFile = e.target.getAttribute('urlFile');
            fileSelectCallback(exampleOfCallbackUrlFile);
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
        openLibrary: function(onFileSelectCallback, onCancelCallback) {
            fileSelectCallback = onFileSelectCallback;
            cancelCallback = onCancelCallback;

            renderLibrary();
        }
    };
})();
