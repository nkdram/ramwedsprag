(function () {
    'use strict';

    angular.module('main').controller('ModalInstanceCtrl', function ($uibModalInstance, items, $scope,uiCalendarConfig, $compile,$location) {
        var $ctrl = this;
        $ctrl.items = items;

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        /* Load Social Feeds */

        $scope.loadFeeds = function () {
            $('.social-feed-container').socialfeed({
                // FACEBOOK
                facebook:{
                    accounts: ['#cricket'],  //Array: Specify a list of accounts from which to pull wall posts
                    limit: 2,                                   //Integer: max number of posts to load
                    access_token: '1233971053335053'  //String: "APP_ID|APP_SECRET"
                },
                // TWITTER
                /*twitter:{
                    accounts: ['#cricket'],                      //Array: Specify a list of accounts from which to pull tweets
                    limit: 2,                                   //Integer: max number of tweets to load
                    consumer_key: 'YOUR_CONSUMER_KEY',          //String: consumer key. make sure to have your app read-only
                    consumer_secret: 'YOUR_CONSUMER_SECRET_KEY' //String: consumer secret key. make sure to have your app read-only
                },*/
                // GOOGLEPLUS
                google:{
                    accounts: ['#cricket'],                //Array: Specify a list of accounts from which to pull posts
                    limit: 2,                                  //Integer: max number of posts to load
                    access_token: 'AIzaSyBdJGomM-tc0aQnk9jEOAaqJD8niysPGeM'//String: G+ access token
                },
                /*// INSTAGRAM
                instagram:{
                    accounts: ['#cricket'],  //Array: Specify a list of accounts from which to pull posts
                    limit: 2,                                   //Integer: max number of posts to load
                    client_id: 'YOUR_INSTAGRAM_CLIENT_ID',       //String: Instagram client id (option if using access token)
                    access_token: 'YOUR_INSTAGRAM_ACCESS_TOKEN' //String: Instagram access token
                },*/
                // GENERAL SETTINGS
                length:400,                                     //Integer: For posts with text longer than this length, show an ellipsis.
                show_media:true,                                //Boolean: if false, doesn't display any post images
                media_min_width: 300,                           //Integer: Only get posts with images larger than this value
                update_period: 5000,                            //Integer: Number of seconds before social-feed will attempt to load new posts.
                template_html:                                  //String: HTML used for each post. This overrides the 'template' filename option
                    '<article class="twitter-post"> \
                    <h4>{{=it.author_name}}</h4><p>{{=it.text}}  \
                    <a href="{{=it.link}}" target="_blank">read more</a> \
                    </p> \
                    </article>',
                //date_format: "ll",                              //String: Display format of the date attribute (see http://momentjs.com/docs/#/displaying/format/)
                date_locale: "en",                              //String: The locale of the date (see: http://momentjs.com/docs/#/i18n/changing-locale/)
                moderation: function(content) {                 //Function: if returns false, template will have class hidden
                    return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
                },
                callback: function() {                          //Function: This is a callback function which is evoked when all the posts are collected and displayed
                    console.log("All posts collected!");
                }
            });
        };

        /* Email Sending */
        $scope.slider = {
            value: 'E',
            options: {
                stepsArray: '30th Jan,29th Jan,28th Jan'.split(',')
            }
        };

        var socket = io.connect();
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
    });
})();