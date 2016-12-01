
angular.module('core').service('MetaService', function() {
    var title = 'Ram Weds Pragatha';
    var description = '';
    var keywords = '';
    return {
        set: function(newTitle, newMetaDescription, newKeywords) {
            description = newMetaDescription;
            keywords = newKeywords;
            title = newTitle;
        },
        metaTitle: function(){ return title; },
        metaDescription: function() { console.log(description) ; return description; },
        metaKeywords: function() { console.log(keywords) ; return keywords; }
    }
});