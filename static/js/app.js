// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field

    let samples = data.metadata;


    // Filter the metadata for the object with the desired sample number

    let results = samples.filter(take=>take.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");


    // Use `.html("") to clear any existing metadata

    let metadataPanel = sampleMetadata.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(results[0]).forEach(([key, value]) => {
            
      // display information in demographic info chart/table
      metadataPanel.append("h5").text(`${key}: ${value}`);
  });
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    sampleData = data.samples;

    // Filter the samples for the object with the desired sample number
    let results = sampleData.filter(take=>take.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let sample_values = results[0].sample_values; 
    let otu_ids = results[0].otu_ids; 
    let otu_labels = results[0].otu_labels; 


    // Build a Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker:{
          color: otu_ids,
          colorscale: 'Earth',
          size: sample_values
      }
  }];

  let bubbleLayout = {
    title: 'Bacteria Culturs Per Sample',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Numbers of Bacteria'},
    height: 600,
    width: 800 
};

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    let barData = [{
      type: 'bar',
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels,
      orientation: 'h'
  }];

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: 'Numbers of Bacteria'},
      height: 500,
      width: 600            
  };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(function(id){
      dropdownMenu.append("option").text(id).property("value", id);
  });
    
    // Get the first sample from the list
    let firstEntry = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstEntry);
    buildMetadata(firstEntry);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

    buildCharts(newSample);
    buildMetadata(newSample);
};


// Initialize the dashboard
init();
