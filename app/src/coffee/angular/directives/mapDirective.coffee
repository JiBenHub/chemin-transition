app.directive 'map', (leafletData, $timeout, Organisations, $modal) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
    
    
#L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
        #
        #mapboxTiles = L.tileLayer 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        #attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        #}

        #locate = false
        #
        #$('#map').parents().height('100%')
        #    
        #map = L.mapbox.map 'map', 'tonylucas.l5j344b8'
        #
        #map.addLayer mapboxTiles
        #
        #map.locate {setView: true, maxZoom: 10} if locate
        #map.setView([48.8, 2.3], 10) if !locate  
        #
        #

        #showModal = (e) ->
        #    console.log e.target
        #    modalInstance = $modal.open
        #        templateUrl: 'partials/modal.html'
        #        controller: 'homeController'
        #        resolve:
        #            selected: ->
        #                return "coucou"
        #        windowClass: 'large'
        #        
        
        #onLocationFound = (e) ->
        #    
        #    clusterGroup = new L.MarkerClusterGroup
        #        polygonOptions: 
        #            fillColor: '#3887be'
        #            color: '#3887be'
        #            weight: 2
        #            opacity: 1
        #            fillOpacity: 0.3
        #    
        #    
        #    myLayer = L.mapbox.featureLayer()
        #    
        #    for org in Organisations
        #        org.properties['marker-color'] = '#f86767'
        #      
        #    myLayer.setGeoJSON Organisations
        #    
        #    myLayer.eachLayer (layer) ->
        #        layer.bindPopup layer.feature.properties.name
        #        layer.on 'mouseover', (e) -> layer.openPopup()
        #        layer.on 'mouseout', (e) -> layer.closePopup()
        #        layer.on 'click', (e) ->
        #            showModal(e)
        #        clusterGroup.addLayer layer
        #        
        #    
        #    map.addLayer clusterGroup           
           
                            
            #markers = new L.MarkerClusterGroup()
            
            #geojson = 
            #    type: 'FeatureCollection'
            #    features: []
            #
            #angular.forEach Organisations, (org) ->
            #    geojson.features.push
            #      type: 'Feature'
            #      properties:
            #        title: org.name
            #        'marker-color': '#f86767'
            #        'marker-size': 'large'
            #      geometry:
            #        type: 'Point'
            #        coordinates: [
            #            org.latlng.lng
            #            org.latlng.lat
            #        ]

            #myLayer.setGeoJSON geojson
            #
            #
            #myLayer.on 'ready', (e) ->
            #  clusterGroup = new (L.MarkerClusterGroup)
            #  e.target.eachLayer (layer) ->
            #    clusterGroup.addLayer layer
            #  map.addLayer clusterGroup
              
              
              
              
                #m = new L.Marker org.latlng, name: org.name
                #markers.addLayer m
                #m.on 'mouseover', onMarkerHover
            #map.addLayer markers
            

        #onMarkerHover = (e) ->
        #    m = e.target
        #    m.bindPopup("<strong>" + m.options.name + "</strong><br><img src='http://placehold.it/250x180'>").openPopup()
        
    
        #onLocationError = (e) ->
        #    alert e.message
        #
        #map.on 'locationfound', onLocationFound
        #map.on 'locationerror', onLocationError
        #
        #onLocationFound() if !locate
