import config from 'basePath/config/global';

export default class ImageEditor {
    constructor(locale = 'en') {
        this.locale = locale == 'uk' ? 'en' : locale;
        // ----- YS -----
        // the dirty hack, due to the fact that adobe does not return the new translations of words,
        // after changing the language in the configuration.
        // ------YS -----


        const head = $('head');
        const scriptId = 'esd-aviary-script';

        if (!head.find(`#${scriptId}`).length) {
            const scriptUlr = 'https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js';
            const editorScript = $(`<script type="text/javascript" id="${scriptId}" src="${scriptUlr}"></script>`);
            head.append(editorScript);
        }
    }

    openEditor(imgId, imgSrc, saveCallback, closeCallback) {
        if (!this.editor) {
            this.editor = new Aviary.Feather({
                theme: 'light',
                language: this.locale,
                apiKey: config.aviaryApiKey,
                onLoad: () => this.onLoad(imgId, imgSrc, saveCallback, closeCallback)
            });
        } else {
            this.onLoad(imgId, imgSrc, saveCallback, closeCallback);
        }

    }

    onLoad(imgId, imgSrc, saveCallback, closeCallback) {
        this.editor.launch({
            image: imgId,
            url: imgSrc,
            onSave: (imageID, newURL) => {
                this.editor.close();
                saveCallback(imageID, newURL);
            },
            onError: (errorObj) => {
                console.log('errorObj', errorObj)
            },
            onClose: () => {
                closeCallback();
            }
        });
        return false;
    }

    destroy() {
        $('#esd-aviary-script').remove();
        $('link[src*="feather"]').remove();
        $('script[src*="feather"]').remove();
    }

}
