var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie","mm.foundation","ngAutocomplete"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,t,r,n,o){return e.$on("$stateChangeStart",function(){return e.isLogged=!0,o("token")||o("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t){return t.otherwise(function(e){var t;return t=e.get("$state"),t.go("index")}),e.state("index",{url:"/",views:{"":{templateUrl:"partials/home.html",controller:"HomeController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,t){return t.isAuthorize()}]}}).state("users.profile",{url:"/profile"}).state("structures",{url:"/structures",templateUrl:"partials/structures.html",controller:"StructuresController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"SkillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"AssetsController"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000/api",{url:function(t){return e+"/"+t}}}),app.controller("AssetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData","$state","$modal",function(e,t,r,n){return{user:{},token:null,needsLogin:!1,setSession:function(t){return this.user=t,this.token=t.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var n;return n=this,this.needsLogin=!0,e("token")||e("mail")?t.checkUser().then(function(){return this.needsLogin=!1},function(e){return 401===e?(n.destroySession(),r.go("index").then(function(){return r.reload()})):void 0}):r.go("index")},showLogin:function(){return this.login=n.open({templateUrl:"partials/login.html",controller:"LoginController",windowClass:"tiny"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(){return this.register=n.open({templateUrl:"partials/register.html",controller:"RegisterController",windowClass:"tiny"}),this.register.result.then(function(e){return $scope.selected=e})},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){return e.remove("token"),e.remove("email")}}}]),app.controller("HomeController",["$scope","leafletData","authService","Organisations","$modal",function(e,t,r,n,o){return e.open=function(){return r.showLogin()},e.organisations=n,e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.showMapView=function(){return e.mapView.active=!0,e.listView.active=!1},e.showListView=function(){return e.listView.active=!0,e.mapView.active=!1},e.showModal=function(t){var r;return e.selected=t.target.feature.properties,r=o.open({templateUrl:"partials/modal.html",windowClass:"large",scope:e})},$("#map").parents().height("100%"),L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",angular.extend(e,{defaults:{tileLayer:"https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,locate:!0,path:{weight:10,color:"#800000",opacity:1},center:{lat:48.8,lng:2.3,zoom:10}}}),n.getOrganizations().then(function(r){return e.organisations=r,t.getMap("map").then(function(t){var n,o,i,a,s;for(n=new L.MarkerClusterGroup({polygonOptions:{fillColor:"#3887be",color:"#3887be",weight:2,opacity:1,fillOpacity:.3}}),a=L.mapbox.featureLayer(),o=0,i=r.length;i>o;o++)s=r[o],s.properties["marker-color"]="#f86767";return a.setGeoJSON(r),a.eachLayer(function(t){return t.bindPopup(t.feature.properties.name),t.on("mouseover",function(){return t.openPopup()}),t.on("mouseout",function(){return t.closePopup()}),t.on("click",function(t){return e.showModal(t)}),n.addLayer(t)}),t.addLayer(n)})})}]),app.controller("LoginController",["$scope","$modalInstance","authService","userData","$state",function(e,t,r,n,o){return e.cancel=function(){return r.hideLogin()},e.login=function(e,t){return e.$invalid?void 0:n.login(t).then(function(e){return r.setSession(e),o.go("index").then(function(){return r.hideLogin(),o.reload()})},function(e){return t.error=e})}}]),app.controller("MapController",["$scope","leafletData","$modal","authService",function(e,t,r,n){return e.open=function(){return n.showLogin()}}]),app.directive("map",["leafletData","$timeout","Organisations","$modal",function(){return{restrict:"E",link:function(){}}}]),app.controller("ModalController",["$scope","leafletData","$modal",function(e,t,r){return e.items=["item1","item2","item3"],e.open=function(){var t;return t=r.open({templateUrl:"myModalContent.html",scope:e,resolve:{items:function(){return e.items}}}),t.result.then(function(t){e.selected=t},function(){return $log.info("Modal dismissed at: "+new Date)})}}]),app.controller("NavBarController",["$scope","leafletData","$modal","authService","$state",function(e,t,r,n,o){return $(document).foundation(),e.openLogin=function(){return n.showLogin()},e.openRegister=function(){return n.showRegister()},e.logout=function(){return console.log("go"),n.destroySession(),o.go("index").then(function(){return o.reload()})}}]),app.factory("Organisations",["$http","$q","appConfig","ipCookie",function(e,t,r){return{getOrganizations:function(){var n;return n=t.defer(),e({method:"GET",url:r.url("organizations")}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise}}}]),app.controller("RegisterController",["$scope","$modalInstance","authService","userData",function(e,t,r,n){return e.type=!1,e.autocomplete={},e.cancel=function(){return r.hideRegister()},e.register=function(t,o){var i;return i=e.autocomplete.details.geometry.location,o.coordinates={lt:i.D,lg:i.k},t.$invalid?void 0:n.create(o).then(function(){return r.hideRegister()},function(){return o.error="email Already use"})},e.typeChange=function(t){return e.type="Organization"===t.type?!1:!0}}]),app.controller("SkillsController",["$scope","leafletData",function(){}]),app.controller("StructuresController",["$scope","leafletData",function(){}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,t,r,n){return{login:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("sessions/login"),data:n}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},checkUser:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t){return o.resolve(t)}).error(function(e,t){return o.reject(t)}),o.promise},create:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("users"),data:n}).success(function(e,t){return o.resolve(t)}).error(function(e,t){return o.reject(t)}),o.promise},update:function(o){var i;return i=t.defer(),e({method:"PUT",url:r.url("users"),params:{id:o._id},data:o,headers:{token:n("token"),email:n("email")}}).success(function(e,t){return i.resolve(t)}).error(function(e,t){return i.reject(t)}),i.promise},"delete":function(){var n;return n=t.defer(),e({method:"DELETE",url:r.url("users"),params:{id:user._id},data:user}).success(function(e,t){return n.resolve(t)}).error(function(e,t){return n.reject(t)}),n.promise}}}]);