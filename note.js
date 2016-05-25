var svg = d3.select('svg'); //get svg elem as variable

var rectList = svg.selectAll('rect'); //get rects inside svg

var dataJoin = rectList.data(dataList, function(item){
    return item.id;
}); //bind rects to data list

dataJoin //for all the data-rects
   .attr({x:10, height:40}) //specify x & height attribute
   .attr('y', function(dataItem){ //specify y as function of id
      return dataItem.id*50;
   })
   .attr('width', function(item){ //specify with as func of sleep
      return item.sleep*20;
   }) //done modifying data-rects!
   .attr('fill', function(item){
        if (item.sleep<= 4){
            return 'red';
        }
        else{
            return 'blue;'
        }
   });

   //get the list of data
var dataList = [
   {id:1, name:'A', sleep:8},
   {id:2, name:'B', sleep:3},
   {id:3, name:'C', sleep:6},
]

//get the list of DOM elements
var rectList = d3.select('svg')
              .selectAll('rect');

//bind them together!
rectList.data(dataList, function(item){ return item.id; });

//chained version:
d3.select('svg').selectAll('rect')
    .data(dataList, function(item){return item.id;});


Adding Data Elements
    We want to add (append) a new DOM element for each data item that doesn''t have one yet.
    The .enter() method gives the list of un-visualized items.
    enter() returns items in the data but not in the DOM!

    //all the data and dom
    var rects = svg.selectAll('rect').data(dataList);

    //stuff just in data
    var justData = rects.enter();

    //append rect for each
    justData.append('rect')
          .attr({x:10, height:40}) //assign attr
          .attr('y', function(d){ return d.id*50; });

Removing Data Elements
    We want to remove a DOM element for each DOM element that no longer has a data item.
    The .exit() method gives the list of un-data''d items.
    exit() returns items in the DOM but not in the data!
    //all the data and dom
    var rects = svg.selectAll('rect').data(dataList);

    //stuff just in data
    var justDOM = rects.exit();

    //remove rect for each
    justDOM.remove(); <--applies to each item in collection

    //chained version
    rects.exit().remove();

All Together
    When you bind data, there are three possible situations:
        The data has "updated", and the DOM needs to be modified ( data() items)
        The data is "incoming", and needs to be added to the DOM ( enter() items)
        The data is "outgoing", and needs to be removed from the DOM ( exit() items)

The General Update
"Updating" a visualization (e.g., in response to a button click) involves three stages:
function update(dataList){
//data join
    var rects = svg.selectAll('rect')
                   .data(dataList, getIdFunc);

    //updating (not coming or going)
    rects.attr('class', 'updated'); //adds style class

    //entering items
    rects.enter().append('rect') //add new DOM <-- elements added to the full set
                 .attr('class', 'new');

    //enter + update
    rects.attr('class', 'here'); <--will apply to everything

    //exiting items
    rects.exit().remove();    
}


Animation
    To animate a change in the DOM over time, use the transition() function
    //applied instantaneously
    d3.select('circle')
      .attr('fill','blue');

    //applied over 250ms
    d3.select('circle')
      .transition()
        .attr('fill','blue');


    //applied instantaneously
    d3.select('circle')
      .attr('fill','blue');

    //applied over 250ms
    d3.select('circle')
      .transition()
        .delay(100) //wait 100ms to start
        .duration(1000) //apply over 1sec
        .attr('fill','blue');

D3 Events
    A pass a callback function to D3''s .on('event') function to specify what to do when an event occurs.
    $('#button').click(function(event) {
       console.log('clicky clicky!');
       


       //who was clicked 
       var element = $(event.target);

    });

   d3.select('rect').on('click', function(dataItem) {
       console.log('clicky clicky!');
       
        //dataItem clicked was clicked 
        console.log("clicked on: "+dataItem);

        //DOM element clicked 
        var element = d3.select(d3.event.target);

    });

In JavaScript, this refers to the object that the method was called on (usually)

    In event handlers, this refers to the target DOM element
    $('#svg').click(function() {
       
       var element = $(this); //DOM element clicked
       element.append('<rect></rect>');
    });

    d3.select('svg').on('click', function(dataItem) {
       
       var element = d3.select(this); //DOM element clicked
       element.append('rect');
    });

Scaling: How do we map from data values to "pixel" values?
var dataToPixelY = function(dataField){
   return dataField*50; //encapsulate math
});

var dataToWidth = function(dataField){
   return dataField*20; //encapsulate math
});

var svg = d3.select('svg');
var rectList = svg.selectAll('rect')
   .data(dataList, function(d){ return d.id;})
   .enter().append('rect')
   .attr({x:10, height:40})
   .attr('y', function(item){
      return dataToPixelY(item.id);
   })
   .attr('width', function(item){
      return dataToPixelY(item.sleep);
   });

D3 Scales
D3 provides helper functions to create scale functions!
https://github.com/d3/d3/wiki/Quantitative-Scales
//creates a new "linear" scale
var xScale = d3.scale.linear() 
            //specify the domain (data) interval
          .domain([20, 80]) //
            //specify the range (pixel) interval
          .range([0, 120]) 

//xScale is a function, with the math done for us
console.log( xScale(50) ); //=> 60

//can also go backwards (range to domain)
console.log ( xScale.invert(60) ); //=> 50

var yScale = d3.linear.scale()
         .domain([1, 3])    //id interval
         .range([10, 200]); //pixel interval

var sleepMax = d3.max(dataList, function(d){ return d.sleep;});
var widthScale = d3.linear.scale()
         .domain([0, sleepMax])   //sleep interval
         .range([10, 390]); //pixel interval

var svg = d3.select('svg');
var rectList = svg.selectAll('rect')
   .data(dataList, function(d){ return d.id;})
   .enter().append('rect')
   .attr({x:10, height:40})
   .attr('y', function(item){
      return yScale(item.id);
   })
   .attr('width', function(item){
      return widthScale(item.sleep);
   });
