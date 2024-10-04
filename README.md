# UofT - Data Analysis Boot Camp

### Module 14 Interactive Visualization

### belly-button-challenge

### Background

An interactive dashboard was built with javascript to explore the Belly Button Biodiversity, which catalogs the microbes that colonize human navels.

## Tools

- Javascript
- D3
- HTML
- Plotly

## Key Steps

#### **JSON Data**

Used D3 to read in sample JSON data from a sample [url](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

````
function init() {
    //Import json data
    d3.json(url).then((jsonDatadata) => {
        data = jsonDatadata; // Store the JSON data as a variable
        console.log(data); 
  
````

---

#### **Populated Dropdown**

 The dropdown menu had options for 150 IDS from individuals in the sample data.

```
     let dropdown = d3.select("#selDataset");
        // Add options to the dropdown menu
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });
```

---


On this assignment D3 library is used to read the [Jason data link](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

The horizontal bar chart displays the top 10 OTUs found depending on the selection in the dropdown menu. The graph is represented by the sample_values vs otu_ids.

The bubble chart represents the otu_ids vs sample_values, also showing the results depending on the dropdown menu subject.

The demographic information panel updates whenever a new Subject ID is selected.
