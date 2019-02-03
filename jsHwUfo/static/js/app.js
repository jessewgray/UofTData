// from data.js
var tableData = data;

// YOUR CODE HERE!

var filterButton = d3.select("#filter-btn");

filterButton.on("click", function() {
	

	var theTbody = d3.select("tbody");
	theTbody.selectAll('tr').remove()
	
  	
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  var selectState = d3.select("#selectState");
  var selectStateValue = selectState.property("value").toLowerCase();
  //console.log(selectStateValue)

  //console.log(inputValue);
  //console.log(tableData);

  var filteredData = tableData.filter(theTime => theTime.datetime === inputValue);

  if (selectStateValue != 'na'){
  	var filteredByState = filteredData.filter(theState => theState.state === selectStateValue);
  	
  	//working to display data
	//console.log(filteredData)
	var thead = d3.select("thead").selectAll("th")
		.data(d3.keys(filteredByState[0]))
		.enter().append("th").text(function(d){return d});
// fill the table
// create rows
	var tr = d3.select("tbody").selectAll("tr")
		.data(filteredByState).enter().append("tr")
// cells
	var td = tr.selectAll("td")
  		.data(function(d){return d3.values(d)})
  		.enter().append("td")
  		.text(function(d) {return d})

  }else{
  	//working to display data
	//console.log(filteredData)
	var thead = d3.select("thead").selectAll("th")
		.data(d3.keys(filteredData[0]))
		.enter().append("th").text(function(d){return d});
// fill the table
// create rows
	var tr = d3.select("tbody").selectAll("tr")
		.data(filteredData).enter().append("tr")
// cells
	var td = tr.selectAll("td")
  		.data(function(d){return d3.values(d)})
  		.enter().append("td")
  		.text(function(d) {return d})
  }
  
  //console.log(filteredByState)
  //console.log(tableData)


  	

});

