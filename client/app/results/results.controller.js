angular.module('ScoutIOApp')
  .controller('ResultsController', ResultsController);

function ResultsController($state, $http, NgMap, Search, $rootScope) {
  var results = this;

  results.search = {
    placeName: '',
    keywords: '',
    setting: {
      indoor: false,
      outdoor: false
    },
    radius: 5,
    startDate: '',
    endDate: '',
    tag: 'all keywords'
  };

  results.name = "Scout IQ";
  results.map = null;
  results.mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

  results.$http = $http;
  results.$state = $state;
  $rootScope.photos = [];

  results.search.keywords = Search.getLastQuery();
  results.place = null;
  results.currentDate = new Date();
  results.maxDate = new Date(
    results.currentDate.getFullYear(),
    results.currentDate.getMonth(),
    results.currentDate.getDate());
  results.minDate = results.search.startDate;

  results.getByTagOnly = function (query) {
    results.$state.go('results');

    Search.getByTagOnly(query)
      .then(function (response) {
        if (response.data.photos) {
          $rootScope.photos = response.data.photos.photo;
        } else {
          $rootScope.photos = [];
        }

        setMarkers();
      })
  };

  results.advancedSearch = function () {
    if (results.place) {
      results.search.geoCoordinates = results.place.geometry;
      results.search.lat = results.search.geoCoordinates.location.lat();
      results.search.lon = results.search.geoCoordinates.location.lng();
    } else {
      results.search.geoCoordinates = null;
    }

    if (results.search.radius === 0){
      results.search.radius = 2;
    }

    // call the factory function and get the result back
    Search.getAdvanced(results.search)
      .then(function (response) {
        if (response.data.photos) {
          $rootScope.photos = response.data.photos.photo;
        } else {
          $rootScope.photos = [];
        }

        setMarkers();
      })
  };

  var setMarkers = function () {
    NgMap.getMap({id: 'resultsmap'}).then(function (map) {
      results.map = map;

      if (results.map.markers) {
        for (var i = 0; i < results.map.markers.length; i++) {
          results.map.markers[i].setMap(null);
        }
      }

      results.map.markers = [];
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0; i < $rootScope.photos.length; i++) {
        var myLatlng = new google.maps.LatLng($rootScope.photos[i].latitude, $rootScope.photos[i].longitude);
        var marker = new google.maps.Marker({position: myLatlng, photoID: $rootScope.photos[i].id});

        marker.addListener('click', results.toggleBounceClick);
        marker.setMap(results.map);
        results.map.markers.push(marker);

        $rootScope.photos[i].marker = marker;
        marker.photoId = $rootScope.photos[i].id;

        if ($rootScope.photos[i].latitude > -68) {
          bounds.extend(myLatlng);
        }
      }

      results.map.fitBounds(bounds);

      $( "#centerMarkerDiv" ).remove();
      var centerControlDiv = document.createElement('div');
      centerControlDiv.id = "centerMarkerDiv";
      var centerControl = new CenterControl(centerControlDiv, results.map, bounds);

      centerControlDiv.index = 1;
      results.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    });
  };

  function CenterControl(controlDiv, map, bounds) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');

    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '8px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';

    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');

    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '28px';
    controlText.style.paddingLeft = '15px';
    controlText.style.paddingRight = '15px';
    controlText.innerHTML = 'Show All Markers';

    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
      map.fitBounds(bounds);
    });
  }


  results.onMouseEnter = function (e, img) {
    $(".results-photo").removeClass("hovered");
    var el = e.target;
    el.classList.add("hovered");

    results.toggleBounce(img.marker);
  };

  results.onMouseLeave = function (e, img) {
    $(".results-photo").removeClass("hovered");
  };

  results.toggleBounceClick = function () {
    var marker = this;
    var $card = $("#photo-card-" + marker.photoId);
    var $sidebar = $("#results-sidebar-left");

    $(".results-photo").removeClass("hovered");
    $card.addClass("hovered");
    $sidebar.animate ({scrollTop:$sidebar.scrollTop() + $card.offset().top - 200}, "fast");

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
      marker.setAnimation(null);
    }, 2100);
  };

  results.toggleBounce = function (marker) {
    NgMap.getMap({id: 'resultsmap'}).then(function (map) {
      results.map = map;

      results.map.panTo(marker.getPosition());
      marker.setAnimation(google.maps.Animation.BOUNCE);


      if (results.map.getZoom() < 10) {
        results.map.setZoom(10);
      }
      setTimeout(function () {
        marker.setAnimation(null);
      }, 2100);
    });
  };

  results.placeChanged = function () {
    results.place = this.getPlace();
  };

  results.showAllMarkers = function () {
    results.place = this.getPlace();
  };

  results.toggleAdvancedSearchDiv = function (divStatus) {
    results.advancedSearchOpen = !results.advancedSearchOpen;

    if(!divStatus) {
      results.showHide = 'Hide Advanced Search';
    } else {
      results.showHide = 'Show Advanced Search';
    }
  };
}
