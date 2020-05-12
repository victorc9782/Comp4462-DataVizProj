import React, { Component } from 'react';
import * as d3 from 'd3';
import CasesDetailsJson from '../config/district.json';

class TimeBlock extends Component {
    constructor(props){
        super(props);
        this.state = {CasesDetails: []};

    }
    componentWillMount(){
        console.log("componentWillMount()")
        let CasesDetails=[]
        CasesDetailsJson.map((data)=>{CasesDetails.push(data)})
        this.setState({CasesDetails: CasesDetails})
    };
    
    componentDidMount() {
        const width = 917,
              height = 408,
              margins = {top:20, right: 50, bottom: 100, left: 100};
        
        
          const parseDate = d=>{
            return d3.utcParse("%d/%m/%Y")(d);
        };

        const min_date = parseDate('21/2/2020');
        const max_date = parseDate('25/4/2020');
        const date_range = (max_date-min_date)/(24*60*60*1000);

        const x_scale = d3.scaleTime().range([0,width]).domain([min_date,max_date]).nice();

        const color_scale = d3.scaleSequential(d3.interpolateYlOrBr).domain([-2,20]);
        

        const chart = d3.select('.chart')
        .attr('width', width + margins.right + margins.left)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform','translate(' + margins.left + ',' + margins.top + ')')
        .style("background-color","#eee");
        
        chart.selectAll('div')
        .data(this.state.CasesDetails).enter().append('div')
        .style("height","20px")
        .selectAll('div')
            .data(function(d){return d.values;})
        .enter().append('div')
            .style("left", d=>{x_scale(parseDate(d.key))})
            .style("background-color",d=>{color_scale(d.value)})


    }


    render() {
        return(
          <div className='container'>
            <h1>Testing</h1>
            <svg className='chart'></svg>
          </div>
        );
    }
} 
   
export default TimeBlock;   
