'use strict'; //strict mode: catch silly errors

//the data!
var dataList = [
   {id:1, name:'A', sleep:1},
   {id:2, name:'B', sleep:3},
   {id:3, name:'C', sleep:6},
];



function update(dataList){
  var sleepMax = d3.max(dataList, function(d){ return d.sleep;});
 var widthScale = d3.scale.linear()
                  .domain([0,sleepMax]) //sleep interval
                  .range([10,380]); //pixel interval
  var svg = d3.select('svg'); //get svg elem as variable
  var rectList = svg.selectAll('rect'); //get rects inside svg
  
  var xAxis = d3.svg.axis().scale(widthScale);
  
  svg.select('g').remove()
  svg.append('g')
      .attr("transform", 'translate(0,20)')
      .call(xAxis);
  
  var dataJoin = rectList.data(dataList); //bind rects to data list //, function(item){ return item.id; }

  dataJoin.enter().append('rect') //in dataset but not in the DOM (dont need commented stuff below bc )
  
  dataJoin //for all the data-rects
    .on('click', function(item){ item.sleep +=1; update(dataList); })
    .on('mouseover', function(item){ d3.select(this).style('fill', '#FFFFCC') })
    .on('mouseout', function(item){ 
      d3.select(this)
      .style('fill', function(d){
          if (d.sleep <= 4){ return 'pink'; }
          else { return 'lightblue'; }
        })
     })
    .transition()
    .attr({x:10, height:40}) //specify x & height attribute
    .attr('y', function(dataItem){ return dataItem.id*50; })
    .attr('width', function(item){ return widthScale(item.sleep); }) //done modifying data-rects!
    .style('fill', function(item){
          if (item.sleep <= 4){ return 'pink'; }
          else { return 'lightblue'; }
    });
    
    
    dataJoin.exit().remove();  
  };

update(dataList);





/** Button Handlers **/
$('#addButton').click(function(){
  var lastId = 0; //last person's id
  if(dataList.length > 0){
    lastId = dataList[dataList.length-1].id;
  }

  //add new person at end
  dataList.push({
    id:lastId+1, //increment id
    name:'New',
    sleep: Math.floor(Math.random()*24) //random sleep (integer)
  })
  console.log(dataList);
  update(dataList);
});

$('#remButton').click(function(){
  //remove first person
  dataList.shift();
  console.log(dataList);
  update(dataList);
});

$('#moreButton').click(function(){
  dataList[0].sleep += 1; //increase first guy
  console.log(dataList);
  update(dataList);
});

$('#lessButton').click(function(){
  //decrease first guy; min 0
  dataList[0].sleep = Math.max(dataList[0].sleep - 1, 0);
  console.log(dataList);
  update(dataList);
});

$('#resetButton').click(function(){
  dataList = [
    {id:1, name:'A', sleep:1},
    {id:2, name:'B', sleep:3},
    {id:3, name:'C', sleep:6},
  ];
  console.log(dataList);
  update(dataList);
});