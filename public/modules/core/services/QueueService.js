'use strict';

angular.module('core').factory('QueueService', function ($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);

        queue.on('progress', function (event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function () {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});

angular.module('core').animation('.slide-animation', function ($window) {
    return {
        enter: function (element, done) {
            var startPoint = $window.innerWidth * 0.5,
                tl = new TimelineLite();

            tl.fromTo(element.find('.bg'), 1, { alpha: 0}, {alpha: 1})
                .fromTo(element.find('.xlarge'), 1, { left: startPoint, alpha: 0}, {left: 50, alpha: 1, ease: Ease.easeInOut})
                .fromTo(element.find('.title'), 3, { left: startPoint, alpha: 0}, {left: 50, alpha: 1, ease: Ease.easeInOut})
                .fromTo(element.find('.subtitle'), 3, { left: startPoint, alpha: 0}, {left: 50, alpha: 1, ease: Ease.easeInOut, onComplete: done});

        },

        leave: function (element, done) {
            var tl = new TimelineLite();

            tl.to(element, 1, {alpha: 0, onComplete: done});
        }
    };
});

angular.module('core').directive('bgImage', function ($window) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
            console.log(element);
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        };

        /*var windowElement = angular.element($window);
        windowElement.resize(resizeBG);*/

        angular.element($window).bind('resize', function(){

            resizeBG();

            // manuall $digest required as resize event
            // is outside of angular
            scope.$digest();
        });


        element.bind('load', function () {
            resizeBG();
        });
    }
});
