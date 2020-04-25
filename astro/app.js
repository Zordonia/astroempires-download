define([
    'lodash',
    'request-promise',
    'utils/parser',
    'utils/xlsx',
    'utils/express',
    'config',
    'express'
], function (
    _,
    rp,
    parser,
    xlsx,
    expressUtils,
    config,
    express
) {
    var AstroEmpires = function AstroEmpires(app) {
        var self = this,
            CONSTANTS = {
                VIEW: 'view',
                BASE: '/astroempires'
            },
            router = express.Router(),
            requestPromises = [],
            createRequest = function createRequest(baseUrl, qs, serverName) {
                function requestFn(persist) {
                    return rp.get({
                        url: baseUrl,
                        qs: qs,
                        serverName: serverName,
                        rejectUnauthorized: false
                    }).then(function (response) {
                        var json = parser.parse(response).json;
                        json = _.last(json);
                        json.qs = qs;
                        json.baseUrl = baseUrl;
                        return json
                    }).catch(function (err) {
                        err.qs = qs;
                        err.baseUrl = baseUrl;
                        return err;
                    }).then(function (finalRes) {
                        if (_.isArray(persist)) {
                            persist.push(finalRes);
                        } else {
                            persist = finalRes;
                        }
                        return persist;
                    });
                }
                requestPromises.push(requestFn);
                return requestFn;
            },
            craeteViewRouter = function (baseUrl, route, qs, serverName) {
                var requestFn = createRequest(baseUrl, qs, serverName);
                router.get(route, (req, res) => {
                    requestFn()
                        .then(function (response) {
                            expressUtils.convertAndRespond(req, res, response, serverName);
                        });
                });
            };

        self.configureExpressRoutes = function configureExpressRoutes() {
            _.forEach(config.servers, function setUpServerRoutes(server) {
                var serverName = server.id,
                    baseUrl = 'https://' + serverName + '.' + config.urlSuffix,
                    routePrefix = '/' + serverName;
                
                _.forEach(config.views, function forEachView(view) {
                    var route = routePrefix + '/' + view,
                        qs = {};
                    qs[CONSTANTS.VIEW] = view;
                    craeteViewRouter(baseUrl, route, qs, serverName);
                });

                _.forEach(config.sections, function forEachSection(section) {
                    var routeSectionPrefix = routePrefix + '/' + _.toLower(section.type);
                    _.forEach(section.views, function forEachSectionView(view) {
                        var route = routeSectionPrefix + '/' + view,
                            qs = {};
                        qs[CONSTANTS.VIEW] = section.id + '_' + view;
                        craeteViewRouter(baseUrl, route, qs, serverName);
                    });
                });
                router.get(routePrefix + '/all', (req, res) => {
                    var promiseChain = undefined;
                    _.forEach(requestPromises, function mapRequestPromises(requestFn) {
                        if (promiseChain) {
                            promiseChain = promiseChain.then(function (response) {
                                return requestFn(response);
                            })
                        } else {
                            promiseChain = requestFn([]);
                        }
                    });
                    promiseChain
                        .then(function (response) {
                            expressUtils.convertAndRespond(req, res, response, serverName);
                        });
                });
            });
            app.use(CONSTANTS.BASE, router);
        };

        return self;
    };

    return AstroEmpires;
});
