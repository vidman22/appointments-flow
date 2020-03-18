import React, { Component } from 'react';

import PCPs from '../../Lists/PCPs';
import RenderedPCPTable from '../RenderedPCPTable/RenderedPCPTable';

const getSuggestions = value => {
    let inputValue = value.trim().toLowerCase();
    let inputLength = inputValue.length;
    let suggestions = [];
    let pcps = PCPs.map((pcp) => {
        return {name: pcp.firstName + ' ' + pcp.lastName}
    })
    for ( let i =0; i < PCPs.length; i++){
        if (pcps[i].name.toLowerCase().slice(0, inputLength) === inputValue){
          suggestions.push(PCPs[i])
        }
    }
    if (suggestions.length === 0 ){
      inputValue = value.trim().toLowerCase().split(" ");
      inputLength = inputValue.length;
      // console.log("inner fired");
      for (let i = 0; i < inputLength; i++){
        for (let j = 0; j < PCPs.length; j++ ){
            if (pcps[j].name.toLowerCase().indexOf(inputValue[i]) !== -1){
                suggestions.push(PCPs[j]);
            }
        }   
      }
    } 
    return suggestions = suggestions.filter((a, b) => suggestions.indexOf(a) === b );;
}

export class Providers extends Component {
    constructor(props){
        super(props);
        this.state = {
            filters: {
                gender: {
                    male: '',
                    female: '',
                },
                care : {
                    sutureRemoval: '',
                    suturePlacement: '',
                    IUDRemoval: '',
                    IUDPlacement: '',
                    nexplanonRemoval: '',
                    nexplanonPlacement: '',
                },
                type: {
                    DO: '',
                    MD: '',
                    NP: '',
                    PA: '',
                },
                languages:{
                    arabic: '',
                    dutch: '',
                    german: '',
                    hindi: '',
                    nepali: '',
                    polish: '',
                    russian: '',
                    spanish: '',
                    tagolog: '',
                    vietnamese: '',
                },
                specialty: {
                    familyMedicine: '',
                    preventativeMedicine: '',
                    internalMedicine: '',
                    integrativeMedicine: '',
                    aestheticMedicine: '',
                    geriatricMedicine: '',
                    emergencyMedicine: '',
                    ageLimit: '',
                },
            },
            value: '',
            suggestions: [],
        };
    }
    onChange(e){
        this.setState({
            value: e.target.value,
            suggestions: getSuggestions(e.target.value),
        })
    }
    onFilterChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState( prevState => {
            return {[name]: !prevState[name]}
        });
    }

    render() {
        return (
            <div>
                <input 
                    onChange={(e) => this.onChange(e)}
                    type="text"
                    value={this.state.value}
                    placeholder="Search by name"
                    name="value"
                />
                <label className="VisitTypeCheckBox" onClick={(e) => this.onFilterChange(e)}>
                <input
                    type="checkbox"
                    defaultChecked={this.state.female}
                    name='female'>
                </input>
                    <span className="CustomCheckbox"></span>
                    <div>Female</div>
                </label>
                <label className="VisitTypeCheckBox" onClick={(e) => this.onFilterChange(e)}>
                <input
                    type="checkbox"
                    defaultChecked={this.state.male}
                    name='male'>
                </input>
            <span className="CustomCheckbox"></span>
            <div>Male</div>
            </label>
                <RenderedPCPTable suggestions={this.state.suggestions} filters={this.state.filters}/>
                
            </div>
        );
    }
}

export default Providers;
 // <Iframe 
        //     url={props.url}
        //     height="900px"
        //     width="100%"
        //     frameBorder="0"
        //     className="IframeLocationMyChart"
        // />