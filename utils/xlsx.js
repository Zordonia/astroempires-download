define([
    'xlsx',
    'lodash'
], function (
    XLSX,
    _
) {
    var self = this;

    self.convertTableToWorksheet = function convertTableToWorksheet(table) {
        return {
            ws: XLSX.utils.json_to_sheet(table.table),
            name: table.serverName + ':' + table.qs.view
        };
    };

    self.createWorkbookWithWorksheets = function createWorkbookWithWorksheets(worksheets) {
        var wb = XLSX.utils.book_new();
        _.forEach(worksheets, function forEachWorksheet(wsDefinition) {
            var ws = wsDefinition.ws,
                ws_name = wsDefinition.name;
            XLSX.utils.book_append_sheet(wb, ws, ws_name);
        });
        return wb;
    };

    self.convertTablesToWorkbook = function convertTablesToWorkbook(tables) {
        var worksheets = _.map(tables, self.convertTableToWorksheet);
        return self.createWorkbookWithWorksheets(worksheets);
    };
    
    self.writeWorkbookToFile = function writeWorkbookToFile(wb, file, options) {
        return XLSX.writeFile(wb, file.name, options);
    };

    return self;
});