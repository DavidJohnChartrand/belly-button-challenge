// Get the samples from biodiversity endpoint
const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function optionChanged(newSample) {
  d3.json(url).then((data)=> {
      let samples = data.samples;
      //filter() is a method that filters the samples array for the object with the id that matches the newSample
      let resultArray = samples.filter(sampleObj => sampleObj.id == newSample);
      let result = resultArray[0];

      var sample_value_ = result.sample_values;
      var otu_id_ = result.otu_ids;
      var otu_label_ = result.otu_labels

      newBar = [{
        x: sample_value_.slice(0,10).reverse(),
        y: otu_id_.slice(0,10).reverse().map(addLabel),
        orientation:"h",
        type:"bar",
        text:otu_label_
      }];

      bar_layout = {
        title:"Top 10 OTUs",
        showlegend:false,
        xaxis:{title:"Sample Values"},
        yaxis:{title:"OTU ID"}
      };

      // Create the bar plot
      Plotly.newPlot("bar", newBar, bar_layout);

      newBubble=[{
        x: otu_id_,
        y: sample_value_,
        mode: 'markers',
        marker: {
          size: sample_value_,
          color: otu_id_
        },
        text:otu_label_
      }];

      // Create the layout for the Bubble plot
      bubble_layout ={
        title:"Individual Samples",
        showlegend:false,
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Sample Value"}
      };

      Plotly.newPlot("bubble", newBubble, bubble_layout);

      // create the updating metadate for demographic info
      let metadataArray = data.metadata.filter(sampleObj => sampleObj.id == newSample);
      let metaResults = metadataArray[0];

      d3.selectAll("li").remove()
      d3.select('#sample-metadata').append("li").text(`id: ${metaResults.id}`);
      d3.select('#sample-metadata').append("li").text(`ethnicity: ${metaResults.ethnicity}`);
      d3.select('#sample-metadata').append("li").text(`gender: ${metaResults.gender}`);
      d3.select('#sample-metadata').append("li").text(`age: ${metaResults.age}`);
      d3.select('#sample-metadata').append("li").text(`location: ${metaResults.location}`);
      d3.select('#sample-metadata').append("li").text(`bbtype: ${metaResults.bbtype}`);
      d3.select('#sample-metadata').append("li").text(`wfreq: ${metaResults.wfreq}`);

      d3.selectAll("li").style("font", "20px");
      d3.selectAll("li").style("list-style-type", "none");

    


  });
}

let BinarySearch = (list,val)=>{
  let left = 0;
  let right = list.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (list[mid] !== val && left <= right) {
      if (val < list[mid]) {
          right = mid - 1
      } else {
          left = mid + 1
      }
      mid = Math.floor((left + right) / 2);
  }
  if (list[mid] === val) {
      return mid;
  } else {
      return -1
  }

};

function selector(){
  d3.json(url).then((data)=>{
    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");
    // create a list of all the names
    let names = data.names;
    // for loop thought the names to add to the dropdown
    for (var i=0; i<names.length;i++){
      dropdown.append("option").text(names[i]).property("value",names[i]);
    };
  });
}

function addLabel(num){
  return 'OTU '+ num;
}

selector();


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data.names);
    console.log(data.metadata[0])

    var meta_id = data.metadata[0].id;
    var meta_ethnicity = data.metadata[0].ethnicity;
    var meta_gender = data.metadata[0].gender;
    var meta_age = data.metadata[0].age;
    var meta_location = data.metadata[0].location;
    var meta_bbtype = data.metadata[0].bbtype;
    var meta_wfreq = data.metadata[0].wfreq;

    demographic_obj = {
      'id': meta_id,
      'ethnicity': meta_ethnicity,
      'gender': meta_gender,
      'age': meta_age,
      'location': meta_location,
      'bbtype': meta_bbtype,
      'wfreq': meta_wfreq
    };


    d3.select('#sample-metadata').append("li").text(`id: ${meta_id}`);
    d3.select('#sample-metadata').append("li").text(`ethnicity: ${meta_ethnicity}`);
    d3.select('#sample-metadata').append("li").text(`gender: ${meta_gender}`);
    d3.select('#sample-metadata').append("li").text(`age: ${meta_age}`);
    d3.select('#sample-metadata').append("li").text(`location: ${meta_location}`);
    d3.select('#sample-metadata').append("li").text(`bbtype: ${meta_bbtype}`);
    d3.select('#sample-metadata').append("li").text(`wfreq: ${meta_wfreq}`);
    // Select all list items, then change their font color
    d3.selectAll("li").style("font", "20px");
    d3.selectAll("li").style("list-style-type", "none");

    var sample_value = data.samples[0].sample_values;
    var otu_id = data.samples[0].otu_ids;
    var otu_label = data.samples[0].otu_labels


    function init(){
      plotData1 = [{
        x: sample_value.slice(0,10).reverse(),
        y: otu_id.slice(0,10).reverse().map(addLabel),
        orientation:"h",
        type:"bar",
        text:otu_label
      }];
      bar_layout = {
        title:"Top 10 OTUs",
        showlegend:false,
        xaxis:{title:"Sample Values"},
        yaxis:{title:"OTU ID"}
      };

      // Create the bar plot
      Plotly.newPlot("bar", plotData1, bar_layout);

      // Create the trace for the Bubble plot
      plotData2=[{
        x: otu_id,
        y: sample_value,
        mode: 'markers',
        marker: {
          size: sample_value,
          color: otu_id
        },
        text:otu_label
      }];
      
      // Create the layout for the Bubble plot
      bubble_layout ={
        title:"Individual Samples",
        showlegend:false,
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Sample Value"}
      };

      Plotly.newPlot("bubble", plotData2, bubble_layout);
    }
    
    



    // Fuction called by DOM changes
    function getData() {
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a let
      let dataset = dropdownMenu.property("value");
      console.log(dataset)
      // Initailize an empty array for the country's data
      
      let names = data.names;
      console.log(names)
      numb = BinarySearch(names,'1601')
      console.log(numb)

      let data = [];

      var meta_id = data.metadata[numb].id;
      var meta_ethnicity = data.metadata[numb].ethnicity;
      var meta_gender = data.metadata[numb].gender;
      var meta_age = data.metadata[numb].age;
      var meta_location = data.metadata[numb].location;
      var meta_bbtype = data.metadata[numb].bbtype;
      var meta_wfreq = data.metadata[numb].wfreq;
      


    }

  init();

  });

// init();