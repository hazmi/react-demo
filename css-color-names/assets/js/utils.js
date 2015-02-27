var App = App || {};

App.Utils = (function(){
    var self = {
        getInitialRandomColors: function(numItems){
            var intialColors = [];
            for(var i=0; i < numItems; i++){
                var color = self.getColor();
                color.order.date = i;
                intialColors.push( color );
            }
            return self.setupSortOrder( intialColors );
        },
        getColor: function(){
            var key = self.randomInt(0, App.COLORS.length - 1);
            return {
                id        : self.uuid(),
                name      : App.COLORS[key],
                display   : true,
                order     : {
                    name: 0,
                    date: 0
                }
            }
        },
        filterDisplayInfo: function(data, keyword){
            var displayedDataCount = 0;
            var filteredData = data.map(function(item, index){
                filteredData = item;
                if(item.name.match( keyword )){
                    filterDisplay = true;
                    displayedDataCount++;
                }else{
                    filterDisplay = false;
                }
                filteredData.display = filterDisplay;
                return filteredData;
            });

            return {
                count: displayedDataCount,
                data: filteredData
            };
        },
        setupSortOrder: function(data){
            var mappedData = data.map(function(item, index) {
                return {
                    index     : index,
                    display   : item.display,
                    name      : item.name,
                    date      : item.order.date
                };
            });
            data = self.setupOrderByDate(data, mappedData);
            data = self.setupOrderByName(data, mappedData);
            return data;
        },
        setupOrderByName: function(data, mappedData){
            mappedData.sort(function(a, b){
                if(a.name < b.name){
                    return -1;
                }else if(a.name > b.name){
                    return 1;
                }
                return 0;
            });
            var skipped = 0;
            mappedData.map(function(item, index){
                data[item.index].order.name = index - skipped;
                if(!item.display){
                    skipped++;
                }
            });
            return data;
        },
        setupOrderByDate: function(data, mappedData){
            mappedData.sort(function(a, b){
                return a.date - b.date;
            });
            var skipped = 0;
            mappedData.map(function(item, index){
                data[item.index].order.date = index - skipped;
                if(!item.display){
                    skipped++;
                }
            });
            return data;
        },
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // taken from utils class in todomvc sample code
        uuid: function () {
            var i, random;
            var uuid = '';
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                    .toString(16);
            }
            return uuid;
        }
    };
    return self;
})();