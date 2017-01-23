
'use strict';
angular.module('main').directive('socialIcon', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

            element.jsSocials({
                url: "http://www.ramwedspragatha.com",
                text: "Ram Weds Pragatha , Jan 30th - Arunachalam Mahal, Madurai",
                showCount: true,
                showLabel: false,
                shareIn: "popup",
               /* shares: [ "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
                 */
                shares: [{
                    share: "facebook"
                }, {
                    share: "twitter"
                },{
                    share: "googleplus",
                    logo:"fa fa-google-plus-square"
                },{
                    share: "pinterest"
                },
                    {
                        share:"email",
                        logo:"fa fa-envelope-o"
                    },
                    {
                        share:"whatsapp",
                        logo:"fa fa-phone"
                    }]
            });
        }
    };
});

