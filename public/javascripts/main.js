var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie","mm.foundation"]),app.config(["$stateProvider","$urlRouterProvider",function(e,r){return r.otherwise(function(e){var r;return r=e.get("$state"),r.go("map")}),e.state("map",{url:"/",templateUrl:"partials/map.html",controller:"mapController"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,r){return r.isAuthorize()?void 0:e.go("map")}]}}).state("users.profile",{url:"/profile"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000",{url:function(r){return""+e+"/"+r}}}),app.service("authService",["ipCookie","userData","$state","$modal",function(e,r,t,n){return{user:{},token:null,needsLogin:!1,isAuthorize:function(){return e("token")||e("mail")?void 0:(this.needsLogin=!0,!1)},showLogin:function(e){var r;return r=n.open({templateUrl:"partials/login.html",controller:"loginController",size:e}),r.result.then(function(e){return $scope.selected=e}),function(){return $log.info("Modal dismissed at: "+new Date)}}}}]),app.controller("loginController",["$scope",function(){}]),app.controller("mapController",["$scope","leafletData","$modal","authService",function(e,r,t,n){return n.needsLogin&&n.showLogin(100),e.open=function(){return n.showLogin()}}]),app.directive("map",["leafletData",function(){return{restrict:"E",link:function(){var e,r,t,n;return r=L.map("map",{center:"center"}).setView([48.8375,2.3291],14),t='<a href="http://openstreetmap.org">OpenStreetMap</a>',L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; "+t+" Contributors",minZoom:10}).addTo(r),e=function(e){var r,t,n,o,a;return r=e.getBounds(),a=r.getSouthWest(),o=r.getNorthEast(),n=o.lng-a.lng,t=o.lat-a.lat,new L.LatLng(a.lat+t*Math.random(),a.lng+n*Math.random())},n=new L.MarkerClusterGroup,n.initialize,n.addLayer(new L.Marker(e(r))),n.addLayer(new L.Marker(e(r))),n.addLayer(new L.Marker(e(r))),r.addLayer(n),r.on("click",function(e){var t;t=L.marker(e.latlng),markersList.push({latlng:e.latlng}),t.addTo(r)})}}}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,r,t,n){return{login:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("sessions/login"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},checkUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{token:n("token"),mail:n("mail")}}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},create:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("users"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},update:function(n){var o;return o=r.defer(),e({method:"PUT",url:t.url("users"),params:{id:n._id},data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},"delete":function(){var n;return n=r.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise}}}]);