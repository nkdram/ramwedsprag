
'use strict';
angular.module('main').directive('socialFeed', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

            element.socialfeed({
                // FACEBOOK
                facebook:{
                    accounts: ['@ramwedspragatha'],  //Array: Specify a list of accounts from which to pull wall posts
                    limit: 10,                                   //Integer: max number of posts to load
                    access_token: '1233971053335053|b740f18b768c655c90e8604885adad11'  //String: "APP_ID|APP_SECRET"
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
                    accounts: ['#ramwedspragatha'],                //Array: Specify a list of accounts from which to pull posts
                    limit: 10,                                  //Integer: max number of posts to load
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
                //media_min_width: 300,                           //Integer: Only get posts with images larger than this value
                update_period: 5000,                            //Integer: Number of seconds before social-feed will attempt to load new posts.
                template: "/assets/modules/home/views/socila-template.html",
               /* template_html:                                  //String: HTML used for each post. This overrides the 'template' filename option
                    '<article class="twitter-post"> \
                    <h4>{{=it.author_name}}</h4><p>{{=it.text}}  \
                    <a href="{{=it.link}}" target="_blank">read more</a> \
                    </p> \
                    </article>',*/
                //date_format: "ll",                              //String: Display format of the date attribute (see http://momentjs.com/docs/#/displaying/format/)
                date_locale: "en",                              //String: The locale of the date (see: http://momentjs.com/docs/#/i18n/changing-locale/)
                moderation: function(content) {                 //Function: if returns false, template will have class hidden
                    return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
                },
                callback: function() {                          //Function: This is a callback function which is evoked when all the posts are collected and displayed
                    console.log("All posts collected!");
                }
            });
        }
    };
});

