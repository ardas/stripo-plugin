var notifications = {
    autoCloseTimeout: 4000,
    container: '.notification-zone',
    error: function (text, id, params) {
        this.showNotification(this.getErrorNotification.bind(this), text, id, params);
    },
    warn: function (text, id, params) {
        this.showNotification(this.getWarningNotification.bind(this), text, id, params);
    },
    info: function (text, id, params) {
        this.showNotification(this.getInfoNotification.bind(this), text, id, params);
    },
    success: function (text, id, params) {
        this.showNotification(this.getSuccessNotification.bind(this), text, id, params);
    },
    loader: function (text, id, params) {
        this.showNotification(this.getLoaderNotification.bind(this), text, id, params);
    },
    hide: function (id) {
        var toast = $('#' + id, this.container);
        toast.effect('fade', 600, function () {
            toast.remove()
        })
    },
    showNotification: function (notificationGetter, text, id, params) {
        params = Object.assign({autoClose: true, closeable: true}, params || {});
        if (!id || !$('#' + id).length) {
            var toast = notificationGetter(text, id, !params.closeable);
            $(this.container).append(toast);
            toast.effect('slide', {direction: 'down'}, 300);
            if (params.autoClose) {
                setTimeout(function () {
                    toast.effect('fade', 600, function () {
                        toast.remove()
                    })
                }, this.autoCloseTimeout);
            }
        }
    },
    getErrorNotification: function (text, id, nonclosable) {
        return this.getNotificationTemplate('alert-danger', text, id, nonclosable);
    },
    getWarningNotification: function (text, id, nonclosable) {
        return this.getNotificationTemplate('alert-warning', text, id, nonclosable);
    },
    getInfoNotification: function (text, id, nonclosable) {
        return this.getNotificationTemplate('alert-info', text, id, nonclosable);
    },
    getSuccessNotification: function (text, id, nonclosable) {
        return this.getNotificationTemplate('alert-success', text, id, nonclosable);
    },
    getLoaderNotification: function (text, id) {
        var notification = $('\
            <div class="alert alert-info" role="alert">\
    		    <div style="width:auto; margin-right: 15px; float: left !important;">\
                    <div style="width:20px;height:20px;border-radius:50%;box-shadow:1px 1px 0px #31708f;\
                        animation:cssload-spin 690ms infinite linear"></div>\
                </div>' + text + '\
            </div>');
        id && notification.attr('id', id);
        return notification;
    },
    getNotificationTemplate: function (classes, text, id, nonclosable) {
        var notification = $('\
                  <div class="alert alert-dismissible ' + classes + (nonclosable ? ' nonclosable' : '') + '" role="alert">\
                        ' + (nonclosable ? '' :
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>') +
                            text +
                '</div>');
        id && notification.attr('id', id);
        return notification;
    }
};