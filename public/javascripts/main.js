var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie"]),app.config(["$stateProvider","$urlRouterProvider",function(e,r){return r.otherwise(function(e){var r;return r=e.get("$state"),r.go("map")}),e.state("map",{url:"/",templateUrl:"partials/map.html",controller:"mapController"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,r){return r.isAuthorize()?void 0:(r.needsLogin=!0,e.go("map"))}]}}).state("users.profile",{url:"/profile"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000",{url:function(r){return""+e+"/"+r}}}),app.service("authService",["ipCookie","userData",function(e,r){return{user:{},token:null,isAuthorize:function(){return!e(token)||!e(mail),r.checkUser().then(function(e){return console.log(e)})}}}]),app.controller("loginController",["$scope",function(){}]),app.controller("mapController",["$scope","leafletData",function(){}]),app.directive("map",["leafletData","$timeout",function(){return{restrict:"E",link:function(){var e,r;return e=L.map("map",{center:"center"}).setView([48.8375,2.3291],14),r='<a href="http://openstreetmap.org">OpenStreetMap</a>',L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; "+r+" Contributors",minZoom:10}).addTo(e)}}}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,r,t,n){return{login:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("sessions/login"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},checkUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{token:n("token"),mail:n("mail")}}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},create:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("users"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},update:function(n){var o;return o=r.defer(),e({method:"PUT",url:t.url("users"),params:{id:n._id},data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},"delete":function(){var n;return n=r.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise}}}]);