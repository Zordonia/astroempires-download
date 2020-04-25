define([
    'tmp',
    'moment'
], function (
    tmp,
    moment
) {
    var self = this,
        CONSTANTS = {
            TIMESTAMP_FORMAT: 'YYYYMMDDHHmm'
        }

    self.createTempFile = function createTempFile(prefix, postfix) {
        return tmp.fileSync({
            prefix: prefix + '-T' + moment().format(CONSTANTS.TIMESTAMP_FORMAT),
            postfix: '.' + postfix
        });
    };

    return self;
});