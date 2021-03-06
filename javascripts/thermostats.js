angular.module( 'wattsApp' ).controller(
  'ThermostatController',
  [
    '$scope',
    function( $scope ) {

      // Initialize
      $scope.conversionTo = '700';
      $scope.conversionFrom = '1100';
      // $scope.timeInput = {};

      // Utilities
      var toggleConversion = function() {
        $scope.conversionTo === '700' ?
          $scope.conversionTo = '1100' :
          $scope.conversionTo = '700';
      };

      var generateFiveMinIncrements = function() {
        var times = [];
        for (var i = 1; i < 121; i++) {
          var digit = 5 * i;
          times.push( digit );
        }

        return times;
      };

      // Convert Minutes Option and Seconds Option to Total Seconds
      var convertInput = function( minutes, seconds ) {
        if ( !minutes && !seconds ) {
          var minutes = parseInt( $scope.minutesSelected ),
              seconds = parseInt( $scope.secondsSelected );
        }

        var minutesToSeconds    =   minutes * 60,
            converted           =   minutesToSeconds + seconds,
            index               =   baseTimes.indexOf( converted );

        $scope.convertedTime = null;


        if ( $scope.conversionTo === '1100' && index > -1 ) {
          $scope.convertedTime = convertSeconds( convertedToElevenHundred[ index ] );
        }
        else if ( $scope.conversionTo === '700' && index > -1 ) {

          $scope.convertedTime = convertSeconds( convertedToSevenHundred[ index ] );
        }

        if ( !$scope.convertedTime ) {
          $scope.validTime = false;
        }
        else {
          $scope.validTime = true;
        }


        return minutesToSeconds + seconds;
      };

      var convertSeconds = function( seconds ) {
        if ( !seconds ) {
          return;
        }

        var convertedTime;

        if ( seconds >= 600 ) {
          convertedTime = new Date( seconds * 1000 ).toISOString().substr( 14, 5 );
        }
        else {
          convertedTime = new Date( seconds * 1000 ).toISOString().substr( 15, 4 );
        }

        $scope.convertedFrom = seconds;

        return convertedTime;
      };

      var generateSecondsOptions = function() {
        var secondsOptions = [],
            increment = 5;

        for (var i = 0; i < 12; i++) {
          secondsOptions.push( i * increment );
        }

        return secondsOptions;
      }

      // Interaction
      $scope.toSevenHundred = function() {
        if ( $scope.conversionTo !== '700' ) {
          toggleConversion();
        }
      };

      $scope.toElevenHundred = function() {
        if ( $scope.conversionTo !== '1100' ) {
          toggleConversion();
        }
      };

      // Watchers
      $scope.$watch( 'conversionTo', function( conversion ) {
        conversion === '700' ?
          $scope.conversionFrom = '1100' :
          $scope.conversionFrom = '700';

        convertInput();
      } );

      $scope.$watch( 'minutesSelected', function( minutes ) {
        var minutes = parseInt( minutes ),
            seconds = parseInt( $scope.secondsSelected );

        if ( minutes === 10 ) {
          console.log('minutes at ten, seconds at ', seconds );
        }

        convertInput( minutes, seconds );
      } );

      $scope.$watch( 'secondsSelected', function( seconds ) {
        var seconds = parseInt( seconds ),
            minutes = parseInt( $scope.minutesSelected );

        convertInput( minutes, seconds );
      } );

      // Initialize Options
      $scope.minutesOptions = Array.apply(null, {length: 11}).map(Number.call, Number);
      $scope.secondsOptions = generateSecondsOptions();

      $scope.setValues = function() {
        $scope.minutesSelected = $scope.minutesOptions[ 0 ];
        $scope.secondsSelected = $scope.secondsOptions[ 0 ];
      };

      // Find the index of that seconds value in the base Array
      // Find the value at that index in the conversion Array

      // If the minutes are 10, seconds must be 0;

      // Base Times
      var baseTimes = generateFiveMinIncrements();

      // Converted times
      var convertedToElevenHundred = [
        3, 6, 10, 13, 16,
        19, 22, 25, 29, 32,
        35, 38, 41, 45, 48,
        51, 54, 57, 60, 64,
        67, 70, 73, 76, 80,
        83, 86, 89, 92, 95,
        99, 102, 105, 108, 111,
        115, 118, 121, 124, 127,
        130, 134, 137, 140, 143,
        146, 150, 153, 156, 159,
        162, 165, 169, 172, 175,
        178, 181, 185, 188, 191,
        194, 197, 190, 194, 197,
        200, 203, 206, 210, 213,
        216, 219, 222, 225, 229,
        233, 235, 239, 242, 245,
        248, 251, 255, 258, 261,
        264, 267, 270, 274, 277,
        280, 283, 286, 290, 293,
        296, 299, 302, 305, 309,
        312, 315, 318, 321, 325,
        328, 331, 334, 337, 340,
        344, 347, 350, 353, 356,
        360, 363, 366, 369, 372,
        375, 379, 382
      ];


      var convertedToSevenHundred = [
        8, 16, 24, 31, 39, 47, 55,
        63, 71, 79, 86, 94, 102, 110,
        118, 126, 134, 141, 149, 157, 165,
        173, 181, 189, 196, 204, 212, 220,
        228, 236,

        244, 251, 259, 267, 275, 283, 291,
        299, 306, 314, 322, 330, 338, 346,
        354, 361, 369, 377, 385, 393, 401,
        409, 416, 424, 432, 440, 448, 456,
        464, 471,

        479, 487, 495, 503, 511, 519, 526,
        534, 542, 550, 558, 566, 574, 581,
        589, 597, 605, 613, 621, 629, 636,
        644, 652, 660, 668, 676, 684, 691,
        699, 707,

        715, 723, 731, 739, 746, 754, 762,
        770, 778, 786, 794, 801, 809, 817,
        825, 833, 841, 849, 856, 864, 872,
        880, 888, 896, 904, 911, 919, 927,
        935, 943
      ];
    }
  ]
);
