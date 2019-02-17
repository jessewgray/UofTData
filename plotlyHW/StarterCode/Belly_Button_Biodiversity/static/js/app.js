function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    var theMeta = d3.select("#sample-metadata");
    theMeta.selectAll("div").remove();
    var url = `/metadata/${sample}`
    //var theReturn = d3.json(url)
    data = d3.json(url)
    .then((x) => {
      var keys = Object.keys(x);
      var values = Object.values(x);

      for(i = 0; i < keys.length; i++){
        theMeta
        .append('div')
        .append('p')
        .append('span')
        .text(keys[i])
        .append('span')
        .text(" : ")
        .append('span')
        .text(values[i])
      }
    })
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

   

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
     var nextUrl = `/samples/${sample}`
    //var theReturn = d3.json(url)
    nextData = d3.json(nextUrl)
    .then((x) => {
      //console.log(x);
      //var otu = x['otu_ids'];
      //console.log(otu);
      //var otuList = x['otu_labels'];
      //console.log(otuList)
      //var sv = x['sample_values']
      //console.log(sv)

    var sv = x.sample_values
    var otuIds = x.otu_ids
    var otuLabels = x.otu_labels

    //rearrange object
    var sampleData = []
    for (i = 0; i < sv.length; i++) {
      var row = {'id': otuIds[i], 'value': sv[i], 'label': otuLabels[i]}
      sampleData.push(row)
    }
  
var sortedSampleData = sampleData.sort(function (a, b) {
    return a.value - ( b.value );
});
sortedSampleData.reverse();
var sortedTopTenData = sortedSampleData.slice(0,10);
//console.log(sortedTopTenData); 

var theIds=[]
var theValues=[]
var theLabels=[]
for (i=0;i<sortedTopTenData.length;i++){
  theIds.push(sortedTopTenData[i]['id'])
  theValues.push(sortedTopTenData[i]['value'])
  theLabels.push(sortedTopTenData[i]['label'])
}
console.log(theIds)
console.log(theLabels)
console.log(theValues)

var data = [{
  values: theValues,
  labels: theIds,
  //text: theLabels,
  type: 'pie'
}];

var layout = {
  title: 'Samples Pie',
  height: 400,
  width: 500
};


Plotly.newPlot('pie', data, layout);




var trace1 = {
  x: theIds,
  y: theValues,
  text: theLabels,
  mode: 'markers',
  marker: {
    color: theIds,
    //opacity: [1, 0.8, 0.6, 0.4],
    size: theValues,
  }
};

var data = [trace1];

var layout = {
  title: 'Samples Bubble',
  showlegend: false,
  height: 600,
  xaxis: {
    title: "otu_id"
    },
  yaxis: {
      title: "sample value"
    },
  //width: window.document.innerWidth / 3
};

Plotly.newPlot('bubble', data, layout);



     }); //closing of next data




}



 





function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


