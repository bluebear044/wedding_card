    /*global angular */
    /* ng-include를 통한 페이지 삽입 시 삽입 페이지의 자바스크립트를 로딩시키기 위해서 'ngLoadScript' 모듈 생성
    삽입 페이지에서는 자바스크립트 태그안에 text/javascript-lazy 라고 명시 해줘야 함
    */
    (function (ng) {
      'use strict';
      var app = ng.module('ngLoadScript', []);
      app.directive('script', function() {
        return {
          restrict: 'E',
          scope: false,
          link: function(scope, elem, attr) {
            if (attr.type === 'text/javascript-lazy') {
              var code = elem.text();
              var f = new Function(code);
              f();
            }
          }
        };
      });
    }(angular));

    // create the module and name it myApp
    var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize','ngLoadScript']);

    // configure our routes
    myApp.config(function($routeProvider) {
        $routeProvider

            // route for the main page
            .when('/main', {
                templateUrl : 'app/partials/main.html',
                controller  : 'mainController'
            })

            // route for the map page
            .when('/map', {
                templateUrl : 'app/partials/map.html',
                controller  : 'mapController'
            })

            // route for the contact page
            .when('/photo', {
                templateUrl : 'app/partials/photo.html',
                controller  : 'photoController'
            })

            .otherwise({
                    redirectTo: '/main'
            });
    });

    // Message Setting
    var siteTitle = '모바일 청첩장';
    var menuName01 = '처음으로';
    var menuName02 = '오시는길';
    var menuName03 = '갤러리';

    var kakaoKey = 'YOUR_APP_KEY';
    var kakoLinkText = '모바일 청첩장입니다.';
    var kakoLinkImage = 'http://dn.api1.kage.kakao.co.kr/14/dn/btqaWmFftyx/tBbQPH764Maw2R6IBhXd6K/o.jpg';
    var kakoLinkUrl = 'http://192.168.0.5:7000/';

    // create the controller and inject Angular's $scope
    myApp.controller('mainController', function($scope, $location) {
        // create a message to display in our view
        $scope.siteTitle = siteTitle;
        $scope.menuName01 = menuName01;
        $scope.menuName02 = menuName02;
        $scope.menuName03 = menuName03;
        $scope.kakaoKey = kakaoKey;
        $scope.kakoLinkText = kakoLinkText;
        $scope.kakoLinkImage = kakoLinkImage;
        $scope.kakoLinkUrl = kakoLinkUrl;

        $scope.companyName = 'BLueBear, Inc.';
        $scope.companyAddress = '서울특별시 중랑구';
        $scope.companyMail = 'abc@abc.com';

        $scope.invitationSubject = '청첩장 제목';
        $scope.invitationContents = '가장 찬란한 날에<br />가장 아름다운 모습이,<br />영원하도록..';
        
        $scope.bridegroomTel = '01012345678';
        $scope.brideTel ='01012345678';

        //ng-class를 위한 커스텀 함수
        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) == path) {
                return true
            } else {
                return false;
            }
        }

    });

    myApp.controller('mapController', function($scope) {

        $scope.menuName = menuName02;
        $scope.addresss = '명동대성당 : 서울특별시 중구 명동2가 1-1';

        $scope.subwayList = [
                                      {text:'<span class="badge">5</span><span class="badge">10</span><span class="badge">15</span>1호선'},
                                      {text:'<span class="badge">5</span><span class="badge">10</span><span class="badge">15</span>2호선'},
                                      {text:'<span class="badge">5</span><span class="badge">10</span><span class="badge">15</span>3호선'}
                                    ];

        $scope.busList = [
                                      {text:'<span class="badge">60-1</span><span class="badge">60-2</span><span class="badge">60-3</span>간선버스'},
                                      {text:'<span class="badge">100</span>지선번스'},
                                      {text:'<span class="badge">120</span>광역버스'}
                                    ];

    });

    myApp.controller('photoController', function($scope) {

        $scope.menuName = menuName03;
        $scope.albumList = [
                                      {name:'img_01', src:'album/IMG_1.JPG'},
                                      {name:'img_02',src:'album/IMG_2.JPG'},
                                      {name:'img_03',src:'album/IMG_3.JPG'},
                                      {name:'img_04',src:'album/IMG_4.JPG'},
                                      {name:'img_05',src:'album/IMG_5.JPG'},
                                      {name:'img_06',src:'album/IMG_6.JPG'}
                                    ];

    });