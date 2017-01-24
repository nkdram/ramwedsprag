(function () {
    'use strict';

    angular.module('main').controller('ModalInstanceCtrl', function ($uibModalInstance, items, $scope,uiCalendarConfig,
                                                                     $compile,$location,$http) {
        var $ctrl = this;
        $ctrl.items = items;

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        /* Email Sending */
        $scope.slider = {
            value: 'E',
            options: {
                stepsArray: '30th Jan,29th Jan,28th Jan'.split(',')
            }
        };

        var domainName = 'http://' + $location.host() ;
        domainName += $location.port() ?  ":" + $location.port() : '';
        console.log(domainName);
        var socket = new io(domainName);// io(domainName, {}).connect();



        $scope.data ={};

        $scope.sendInvite = function () {
            console.log($scope.data);
            socket.emit("sendEmail", $scope.data);
        };

        socket.on("emailSent", function (data) {
            alert(data.success);
        });

        /* Email Sending */


        /* Events Listing */

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'Hungarian';

        /* event source that contains custom events on the scope */
        $scope.events = [
            {title: 'Reception',start: new Date(2017, 0, 29, 17, 0),end: new Date(2017, 0, 29, 22, 30),allDay: false,className:['reception'],durationEditable :false
                ,startEditable: false },
            {title: 'Wedding',start: new Date(2017, 0, 30, 8, 0),end: new Date(2017, 0, 30, 22, 30),allDay: false, className:[ 'wedding'],durationEditable :false,startEditable: false},
            {title: 'Reception',start: new Date(2017, 0, 29),allDay: true,className:['reception', 'allday'],durationEditable :false,startEditable: false},
            {title: 'Wedding',start: new Date(2017, 0, 30),allDay: true,className:['wedding', 'allday'],durationEditable :false,startEditable: false}
        ];

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
        };


        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar:{
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'agendaWeek,agendaDay'
                },
                defaultView: 'agendaWeek',
                height: '100%',
                editable: true,
                eventClick: $scope.alertOnEventClick,
                eventRender: $scope.eventRender,
                defaultDate : new Date(2017, 0, 29, 17, 0),
                viewRender: function(currentView){
                    var minDate = new Date(2017, 0, 29, 17, 0),
                        maxDate = new Date(2017, 0, 30, 23, 0);

                    var preBtn = $(".fc-prev-button"),nextBtn = $(".fc-next-button");
                    var title = $('.fc-center h2');
                    if(currentView.name === 'agendaDay' && currentView.start === minDate){
                        title.val('RECEPTION');
                    }
                    else if(currentView.name === 'agendaDay' && currentView.start === maxDate){
                        title.val('WEDDING');
                    }
                    // Past
                    if (minDate >= currentView.start && minDate <= currentView.end) {
                        preBtn.prop('disabled', true);
                        preBtn.addClass('fc-state-disabled');
                    }
                    else {
                        preBtn.removeClass('fc-state-disabled');
                        preBtn.prop('disabled', false);
                    }
                    // Future
                    if (maxDate >= currentView.start && maxDate <= currentView.end) {
                        nextBtn.prop('disabled', true);
                        nextBtn.addClass('fc-state-disabled');
                    } else {
                        nextBtn.removeClass('fc-state-disabled');
                        nextBtn.prop('disabled', false);
                    }
                },
                businessHours: {
                    start:'08:00', /* Current Hour/Minute 24H format */
                    end: '23:00', // 5pm? set to whatever
                    dow: [0,1] // Day of week. If you don't set it, Sat/Sun are gray too
                }
            }
        };


        /* event sources array*/
        $scope.eventSources = [$scope.events];


        $scope.addresses = [];
        $scope.credentials = {};
        $scope.initMap = {};
        $scope.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
                'http://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
            ).then(function(response) {
                    $scope.addresses = response.data.results;
                    if($scope.addresses && $scope.addresses.length === 1)
                    {
                        $scope.credentials.addressComponent = $scope.addresses[0];
                    }
                    if($scope.credentials.addressComponent)
                    {
                        $scope.location = $scope.credentials.addressComponent.geometry.location;
                    }
                });
        };

        $scope.loadMap = function () {
            var elem = angular.element(document.querySelector('#way'));
            angular.element(elem).html('');
            $scope.$broadcast('loadMap', $scope.credentials.addressComponent.formatted_address);
        }
    });
})();