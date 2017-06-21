angular.module( 'wattsApp' ).controller(
  'ThermostatController',
  [
    '$scope',
    function( $scope ) {
      var generateTimes = function() {
        var times = [];
        for (var i = 1; i < 121; i++) {
          var digit = 5 * i;
          times.push( digit );
        }

        return times;
      };

      $scope.convertTime = function( seconds ) {
        var convertedDate;

        if ( seconds >= 600 ) {
          convertedDate = new Date( seconds * 1000 ).toISOString().substr( 14, 5 );
        }
        else {
          convertedDate = new Date( seconds * 1000 ).toISOString().substr( 15, 4 );
        }
      };

      $scope.sevenHundredTimes = generateTimes();

      // for ( var i = 0; i < $scope.sevenHundredTimes.length; i++ ) {
      //   convertTime( $scope.sevenHundredTimes[ i ] );
      // }

      var elevenHundredTimes = [
        3, 6, 10,
        13, 16, 19, 22, 25, 29,
        32, 35, 38, 41, 45,
        48, 51, 54, 57, 60, 64,
        67, 70, 73, 76, 80,
        83, 86, 89, 92, 95, 99,
        102, 105, 108, 111, 115,
        118, 121, 124, 127, 130, 134,
        137, 140, 143, 146, 150,
        153, 156, 159, 162, 165, 169,
        172, 175, 178, 181, 185,
        188, 191, 194, 197, 190, 194,
        197, 200, 203, 206, 210,
        213, 216, 219, 222, 225, 229,
        233, 235, 239,
        242, 245, 248, 251, 255,
        258, 261, 264, 267, 270, 274,
        277, 280, 283, 286, 290, // 4:50
        293, 296, 299, 302, 305, 309,
        312, 315, 318, 321, 325,
        328, 331, 334, 337, 340, 344,
        347, 350, 353, 356, 360, // 6:00
        363, 366, 369, 372, 375, 379,
        382 // 10:00
      ];

      // Visualize Times and Loop Through on DOM
      // for ( var i = 0; i < elevenHundredTimes.length; i++ ) {
      //   convertTime( elevenHundredTimes[ i ] );
      // }


    }
  ]
);
