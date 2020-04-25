define([
    'utils/xlsx',
    'utils/file',
    'lodash'
], function (
    xlsx,
    fileUtil,
    _
) {
    var self = this;

    self.convertAndRespond = function convertAndRespond(req, res, response, prefix) {
        var transResponse = response,
            file;
        if (!_.isArray(transResponse)) {
            transResponse = [transResponse];
        }
        switch (req.query.type) {
            case 'csv':
            case 'xlsx':
                transResponse = xlsx.convertTablesToWorkbook(transResponse);
                file = fileUtil.createTempFile(prefix, req.query.type);
                xlsx.writeWorkbookToFile(transResponse, file);
                res.download(file.name);
                break;
            case 'json':
            default:
                res.send(transResponse);
                break;
        }
    };
    return self;
});