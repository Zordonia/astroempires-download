define([
    'jsdom',
    'jquery',
    'html-table-to-json',
    'lodash'
], function (
    jsdom,
    jquery,
    HtmlTableToJson,
    _) {
    var self = this;

    function convertTablesToJson(document) {
        var tableToJson = HtmlTableToJson.parse(document),
            results = tableToJson.results,
            headers = tableToJson.headers;
        return _.map(headers, function map(value, idx) {
            return {
                header: value,
                table: results[idx]
            };
        });
    };

    self.parse = function (html) {
        const { JSDOM } = jsdom;

        var dom = new JSDOM(html);

        return {
            html: dom,
            json: convertTablesToJson(html),
            $: jquery(dom.window)
        };

    };


    return self;

});
