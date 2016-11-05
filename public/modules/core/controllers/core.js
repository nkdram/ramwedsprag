(function () {
    'use strict';
    angular.module('core').controller('MainCtrl', function ($scope, $timeout, QueueService) {

        console.log('INSIDE MAINCTRL');
        var INTERVAL = 10000,
            slides = [
                {id: "image00", src: "/assets/modules/core/img/Optimized-Heart.JPG", title: 'Our love', subtitle: 'will prove everyone wrong!'},
                {id: "image01", src: "/assets/modules/core/img/Optimized-shoot.JPG", title: 'Can you feel', subtitle: 'the love tonight!'},
                {id: "image02", src: "/assets/modules/core/img/Optimized-Soloram.JPG", title: 'You are the wind', subtitle: 'beneath my wings'},
                {id: "image03", src: "/assets/modules/core/img/Optimized-outdoorlight.JPG", title: 'Anything for you', subtitle: 'even accepting your family'},
                {id: "image04", src: "/assets/modules/core/img/Optimized-flower.JPG", title: 'True love', subtitle: 'a dream within a dream'}
            ];

        function setCurrentSlideIndex(index) {
            $scope.currentIndex = index;
        }

        function isCurrentSlideIndex(index) {
            return $scope.currentIndex === index;
        }

        function nextSlide() {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            $timeout(nextSlide, INTERVAL);
        }

        function setCurrentAnimation(animation) {
            $scope.currentAnimation = animation;
        }

        function isCurrentAnimation(animation) {
            return $scope.currentAnimation === animation;
        }

        function loadSlides() {
            QueueService.loadManifest(slides);
        }

        $scope.$on('queueProgress', function (event, queueProgress) {
            $scope.$apply(function () {
                $scope.progress = queueProgress.progress * 100;
            });
        });

        $scope.$on('queueComplete', function (event, slides) {
            $scope.$apply(function () {
                $scope.slides = slides;
                $scope.loaded = true;

                $timeout(nextSlide, INTERVAL);
            });
        });

        $scope.progress = 0;
        $scope.loaded = false;
        $scope.currentIndex = 0;
        $scope.currentAnimation = 'slide-left-animation';

        $scope.setCurrentSlideIndex = setCurrentSlideIndex;
        $scope.isCurrentSlideIndex = isCurrentSlideIndex;
        $scope.setCurrentAnimation = setCurrentAnimation;
        $scope.isCurrentAnimation = isCurrentAnimation;

        loadSlides();
    });
})();







