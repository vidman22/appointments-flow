import React, { Component } from 'react';

import PCPs from '../../Lists/PCPs';
import RenderedPCPTable from '../../Components/RenderedPCPTable/RenderedPCPTable';

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
                    male: {name: 'Male', checked: ''},
                    female: {name: 'Female', checked: ''},
                },
                care : {
                    sutureRemoval: {name: 'Suture Removal', checked: ''},
                    suturePlacement: {name: 'Suture Placement', checked: ''},
                    IUDRemoval: {name: 'IUD Removal', checked: ''},
                    IUDPlacement: {name: 'IUD Placement', checked: ''},
                    nexplanonPlacement: {name: 'Nexplanon Placement', checked: ''},
                    nexplanonRemoval: {name: 'Nexplanon Removal', checked: ''},
                },
                type: {
                    DO:{name: 'DO', checked: ''},
                    MD:{name: 'MD', checked: ''},
                    NP:{name: 'NP', checked: ''},
                    PA:{name: 'PA', checked: ''},
                },
                languages:{
                    arabic: {name: 'Arabic', checked: '' },
                    dutch: {name: 'Dutch', checked: '' },
                    german: {name: 'German', checked: '' },
                    hindi: {name: 'Hindi', checked: '' },
                    nepali: {name: 'Nepali', checked: '' },
                    polish: {name: 'Polish', checked: '' },
                    russian: {name: 'Russian', checked: '' },
                    spanish: {name: 'Spanish', checked: '' },
                    tagolog: {name: 'Tagolog', checked: '' },
                    vietnamese: {name: 'Vietnamese', checked: '' },
                },
                specialty: {
                    familyMedicine: {name: 'Family Medicine', checked: ''},
                    preventativeMedicine: {name: 'Preventative Medicine', checked: ''},
                    internalMedicine: {name: 'Internal Medicine', checked: ''},
                    integrativeMedicine: {name: 'Integrative Medicine', checked: ''},
                    aestheticMedicine: {name: 'Aesthetic Medicine', checked: ''},
                    geriatricMedicine: {name: 'Geriatrics', checked: ''},
                    emergencyMedicine: {name: 'Emergency Medicine', checked: ''},
                    chronicCare: {name: 'Chronic Care', checked: ''},
                    mentalHealth: {name: 'Mental Health', checked: ''},
                    gerontology: {name: 'Gerontology', checked: ''},
                    hospice: {name: 'Hospice', checked: ''},
                    womensHealth: {name: "Womens' Health", checked: ''},
                    reproductiveHealth: {name: 'Reproductive Health', checked: ''},
                    orthopedics: {name: 'Orthopedics', checked: ''},
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
        let formArray = [];
        for (let key in this.state.filters){
            let filtersArray = [];
            for (let prop in this.state.filters[key]){
                filtersArray.push({
                    id: prop, 
                    config: this.state.filters[key][prop]
                })
            }
            formArray.push({
                id: key,
                config: filtersArray
            })
        }
        // console.log("formArray", formArray);

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