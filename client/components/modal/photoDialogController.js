angular.module('ScoutIOApp')
  .controller('PhotoDialogCtrl', ['$mdDialog', '$scope', '$rootScope', '$state', 'NgMap', 'Auth', function ($mdDialog, $rootScope, $scope, $state, NgMap, Auth) {
    $scope.showDialog = function (e, photo) {
      $scope.photo = photo;
      $scope.mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
      $scope.photo.datetaken = new Date($scope.photo.datetaken).toLocaleString();
      $scope.photoDialogFlexWidth = "80";
      $rootScope.directions = {};
      $rootScope.directions.place = '';
      $scope.origin = '';
      $scope.distance = '';
      $scope.duration = '';

      $scope.isLoggedIn = Auth.isLoggedIn();

      if ($scope.photo.height_m > $scope.photo.width_m) {
        $scope.photoDialogFlexWidth = "60";
      }

      var displayPath = function () {
        NgMap.getMap({id: 'photomap'}).then(function (map) {
          var elevator = new google.maps.ElevationService;

          var route = map.directionsRenderers[0].directions.routes[0].legs[0];
          $scope.distance = route.distance.text;
          $scope.duration = route.duration.text;

          var path = [];

          for (var i = 0; i < route.steps.length; i++) {
            path.push(route.steps[i].end_location);
          }

          elevator.getElevationForLocations({
            'locations': path
          }, plotElevation);
        });
      };

      var plotElevation = function(elevations, status) {
        var chartDiv = document.getElementById('pathDiv');
        var chart = new google.visualization.ColumnChart(chartDiv);
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');

        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        chart.draw(data, {
          legend: 'none',
          titleY: 'Elevation (m)'
        });
      };

      $scope.placeChanged = function () {
        var place = this.getPlace();

        if (place && place.geometry) {
          $scope.origin = place.geometry.location.lat() + "," + place.geometry.location.lng();

          setTimeout(displayPath, 1000);  //wait for the map to render
        } else {
          document.getElementById('photo-dialog-places-textbox').value = '';
          $rootScope.directions.place = '';
          $scope.origin = '';
          $scope.distance = '';
          $scope.duration = '';

          NgMap.getMap({id: 'photomap'}).then(function (map) {
            $scope.map = map;

            if (map.directionsRenderers && map.directionsRenderers[0]) {
              var directionDisplay = map.directionsRenderers;
              directionDisplay[0].set('directions', null);
            }

            $scope.map.setCenter(new google.maps.LatLng(parseFloat(photo.latitude), parseFloat(photo.longitude)));
            $scope.map.zoom = "15";
          });
        }
      };

      $mdDialog.show({
        targetEvent: e,
        locals: {
          photo: $scope.photo,
          photoDialogFlexWidth: $scope.photoDialogFlexWidth,
          placeChanged: $scope.placeChanged,
          mapStyle: $scope.mapStyle,
          isLoggedIn:  $scope.isLoggedIn
        },
        controller: DialogController,
        controllerAs: 'dialog',
        bindToController: true,
        templateUrl: 'components/modal/photoDialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };

    function DialogController($scope, $mdDialog, NgMap, Auth) {

      //$mdDialog.isLoggedIn = Auth.isLoggedIn();

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };

      NgMap.getMap({id: 'photomap'}).then(function (map) {
        $scope.map = map;

        $scope.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);

        //some hackery to make the map appear in this dialog and then recenter it as
        // resizing pushes the center down and to the right for some reason
        var center = $scope.map.getCenter();
        google.maps.event.trigger($scope.map, 'resize');
        $scope.map.setCenter(center);
      });
    }
  }]);

