window.ExternalFilesLibrary = (function() {
    let externalLibrary;
    let fileSelectCallback;
    let cancelCallback;

    let close = function() {
        externalLibrary.hide();
    };
    let cancelAndClose = function() {
        close();
        cancelCallback();
    };

    let initLibrary = function() {
        $('body').append(`
                <div id="externalFileLibrary" class="modal fade in" role="dialog" tabindex="-1" style="background-color: rgba(0,0,0,.5)">
                    <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div  class="modal-header">
                            <div>
                               <button aria-label="Close" class="close" type="button">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 class="modal-title">External File Library</h4>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div style="display: inline-block; min-width: 154px; cursor: pointer; text-align: center" class="thumbnail">
                                <span urlFile="https://www.youtube.com/1">File link 1</span>
                            </div>
                            <div style="display: inline-block; min-width: 154px; cursor: pointer; text-align: center" class="thumbnail">
                                <span urlFile="ftps://lkjhgfd">File link 2</span>
                            </div>
                            <div style="display: inline-block; min-width: 154px; cursor: pointer; text-align: center" class="thumbnail">
                                <span urlFile="ftp://tyhujiop">File link 3</span>
                            </div>
                        </div>
                    </div>
                </div>`);
        externalLibrary = $('#externalFileLibrary');
        externalLibrary.find('.close').click(cancelAndClose);
        externalLibrary.find('.thumbnail').click(function(e) {
            const exampleOfCallbackUrlFile = $(e.currentTarget).find('span').attr('urlFile');
            fileSelectCallback(exampleOfCallbackUrlFile);
            close();
        });
    };

    let renderLibrary = function() {
        if (!externalLibrary) {
            initLibrary();
        }
        externalLibrary.show();
    };


    return {
        openLibrary(onFileSelectCallback, onCancelCallback) {
            fileSelectCallback = onFileSelectCallback;
            cancelCallback = onCancelCallback;

            renderLibrary();
        }
    };
})();