window.ExternalSmartElementsLibrary = (function() {
    var externalLibrary;
    var dataSelectCallback;
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
            <div id="externalSmartElementsLibrary" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span>×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">External Smart-elements Library</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="display:inline-block; width: 154px; height: 190px; cursor: pointer; margin-right: 10px" class="thumbnail">\
                            <img style="height: 100px;" src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/9091542014595406.png">\
                            <h4>Product 1</h4>\
                            <p>Price: <span>1$</span></p>\
                        </div>  \
                        <div style="display:inline-block; width: 154px; height: 190px; cursor: pointer; margin-right: 10px" class="thumbnail">\
                            <img style="height: 100px;" alt="Product 2" src="https://my.stripo.email/content/guids/CABINET_68e9de9122dfe101e465207065722d54/images/95981542014634835.png">\
                            <h4>Product 2</h4>\
                            <p>Price: <span>2$</span></p>\
                        </div>\
                        <div style="display:inline-block; width: 154px; height: 190px; cursor: pointer; margin-right: 10px" class="thumbnail">\
                            <img style="height: 100px;" alt="Product 3" src="https://my.stripo.email/content/guids/CABINET_0397152026e82dd10a59009fd4c00284/images/53971542021195762.png">\
                            <h4>Product 3</h4>\
                            <p>Price: <span>3$</span></p>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalLibrary = document.getElementById('externalSmartElementsLibrary');
        externalLibrary.querySelector('.close').addEventListener('click', cancelAndClose);
        document.querySelectorAll('.thumbnail')
            .forEach(thumbnail => thumbnail.addEventListener('click', function(e) {
            var exampleOfCallbackObject = {
                title: e.currentTarget.querySelector('h4').innerText,
                price: e.currentTarget.querySelector('span').innerText,
                image: e.currentTarget.querySelector('img').getAttribute('src')
            };
            dataSelectCallback(exampleOfCallbackObject);
            close();
        }));
    };

    var renderLibrary = function() {
        if (!externalLibrary) {
            initLibrary();
        }
        externalLibrary.style.visibility = 'visible';
    };

    return {
        openLibrary: function(onDataSelectCallback, onCancelCallback) {
            dataSelectCallback = onDataSelectCallback;
            cancelCallback = onCancelCallback;
            renderLibrary();
        }
    };
})();
