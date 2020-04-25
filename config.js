define([
    'lodash'
], function (
    _
) {
    var self = this,
        sectionViews = [
            'level',
            'economy',
            'fleet',
            'technology',
            'experience'
        ],
        nonSectionViews = [
            'bases',
            'npc'
        ];
    self.sections = [{
        type: 'Players',
        id: 'ply',
        views: _.clone(sectionViews)
    }, {
        type: 'Guilds',
        id: 'guilds',
        views: _.clone(sectionViews)
    }];

    self.views = _.clone(nonSectionViews);

    self.urlSuffix = 'astroempires.com/ranks.aspx';


    self.servers = [{
        id: 'antares'
    }];

    return self;
});