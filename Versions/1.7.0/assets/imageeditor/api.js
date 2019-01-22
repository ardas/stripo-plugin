import {getStore} from 'reduxPath/store';
import {availableLocales, activeBundle} from 'basePath/i18n/index';
import {getProxyUrl} from 'api/apiRequest';

let pixieEditor;
let localeConfig;
let editorLocale;


export function init(locale = 'en') {
    editorLocale = availableLocales.indexOf(locale) > -1 ? locale : 'en';
    localeConfig = {
        active: editorLocale,
        custom: {
            [`${locale}`]: getLanguageBundle()
        }
    };

    const bodyContainer = $(`body`);
    bodyContainer.find('pixie-editor').remove();
    bodyContainer.prepend('<pixie-editor></pixie-editor>');
    pixieEditor = new Pixie({
        crossOrigin: true,
        urls: {
            assets: `${window.Stripo.bp}assets/imageeditor/`,
        },
        ui: {
            openImageDialog: false,
            mode: 'overlay',
        }
    });
}

export function openEditor(imgId, imgSrc, saveCallback, closeCallback) {
    pixieEditor.setLocale(localeConfig);
    pixieEditor.setConfig('onSave', function (data, name) {
        saveCallback(imgId, data, name);
        pixieEditor.close();
    }.bind(this));
    pixieEditor.setConfig('onClose', function () {
        closeCallback && closeCallback();
    }.bind(this));
    pixieEditor.resetAndOpenEditor('image', createImageSrcProxy(imgSrc));
}

export function destroy() {
    pixieEditor && pixieEditor.close();
    $(`body`).find('pixie-editor').remove();
}

function getLanguageBundle() {
    const languageBundle = {};
    for (let k of Object.keys(activeBundle)) {
        if (k.startsWith('pixie.')) {
            languageBundle[k.replace('pixie.', '')] = activeBundle[k];
        }
    }
    return languageBundle;
}

function createImageSrcProxy(imgSrc) {
    const config = getStore().getState().config;
    const proxyUrl = config.pluginMode ? getProxyUrl() : config.imagesProxy;
    return `${proxyUrl}?url=${imgSrc}`;
}