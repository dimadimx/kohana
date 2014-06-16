

         function init () {
             var myMap = new ymaps.Map('map', {
                     center: [55.7499,37.6290],
                     zoom: 10,
                      behaviors:['default', 'scrollZoom']
                 });
                  
         
         var myPlacemark = new ymaps.Placemark([55.7499,37.6290], {}, {
                 preset: 'twirl#redIcon' 
             });
         myMap.geoObjects.add(myPlacemark);
             myMap.controls
             
                 .add('zoomControl', { left: 5, top: 5 })
                
                 .add('typeSelector')
                
                 .add('mapTools', { left: 35, top: 5 })
                 .add('routeEditor', { left: 130, top: 5 });
            
                    
            
            var trafficControl = new ymaps.control.TrafficControl();
             myMap.controls
                 .add(trafficControl)



         }

function route(from, to){
    return function () {
        var myMap = new ymaps.Map('map', {
            center: [55.7499,37.6290],
            zoom: 10,
            behaviors:['default', 'scrollZoom']
        });
        ymaps.route([
             from,
             to
         ], {
             mapStateAutoApply: true
        }).then(function (route) {
             route.getPaths().options.set({
                 // в балуне выводим только информацию о времени движения с учетом пробок
                 balloonContenBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
                 // можно выставить настройки графики маршруту
                 opacity: 0.9
             });
             // добавляем маршрут на карту
             myMap.geoObjects.add(route);
            myMap.controls
                .add('zoomControl', { left: 5, top: 5 })
                .add('typeSelector')
                .add('mapTools', { left: 35, top: 5 })
                .add('routeEditor', { left: 130, top: 5 });
            var trafficControl = new ymaps.control.TrafficControl();
            myMap.controls
                .add(trafficControl)
        })
    }
}

function geocode(o){
    return function(){


         var myGeocoder = ymaps.geocode(o);
         myGeocoder.then(
             function (res) {
                 console.log(res.geoObjects.get(0).geometry.getCoordinates());
                 myMap = new ymaps.Map('map', {
                     center: res.geoObjects.get(0).geometry.getCoordinates(),
                     zoom : 10,
                     behaviors:['default', 'scrollZoom']
                 });
                 myMap.geoObjects.add(res.geoObjects);
                 myMap.controls
                     .add('zoomControl', { left: 5, top: 5 })
                     .add('typeSelector')
                     .add('mapTools', { left: 35, top: 5 })
                     .add('routeEditor', { left: 130, top: 5 });
                 var trafficControl = new ymaps.control.TrafficControl();
                 myMap.controls
                     .add(trafficControl)
             },
             function (err) {
                 // обработка ошибки
             }
         );
    }
}