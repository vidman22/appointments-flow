import React, { Component } from 'react';

import PCPs from '../../Lists/PCPs';
import RenderedPCPTable from '../../Components/RenderedPCPTable/RenderedPCPTable';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Providers.css';

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
let index = 0;
export class Providers extends Component {
    constructor(props){
        super(props);
        this.state = {
            gender:false,
            care: false,
            type: false,
            language: false,
            specialty: false,
            filters: {
                gender: {
                    male: {name: 'Male', checked: false},
                    female: {name: 'Female', checked: false},
                },
                care : {
                    sutureRemoval: {name: 'Suture Removal', checked: false},
                    suturePlacement: {name: 'Suture Placement', checked: false},
                    IUDRemoval: {name: 'IUD Removal', checked: false},
                    IUDPlacement: {name: 'IUD Placement', checked: false},
                    nexplanonPlacement: {name: 'Nexplanon Placement', checked: false},
                    nexplanonRemoval: {name: 'Nexplanon Removal', checked: false},
                },
                type: {
                    DO:{name: 'DO', checked: false},
                    MD:{name: 'MD', checked: false},
                    NP:{name: 'NP', checked: false},
                    PA:{name: 'PA', checked: false},
                },
                languages:{
                    arabic: {name: 'Arabic', checked: false },
                    dutch: {name: 'Dutch', checked: false },
                    german: {name: 'German', checked: false },
                    hindi: {name: 'Hindi', checked: false },
                    nepali: {name: 'Nepali', checked: false },
                    polish: {name: 'Polish', checked: false },
                    russian: {name: 'Russian', checked: false },
                    spanish: {name: 'Spanish', checked: false },
                    tagolog: {name: 'Tagolog', checked: false },
                    vietnamese: {name: 'Vietnamese', checked: false },
                },
                specialty: {
                    familyMedicine: {name: 'Family Medicine', checked: false},
                    preventativeMedicine: {name: 'Preventative Medicine', checked: false},
                    internalMedicine: {name: 'Internal Medicine', checked: false},
                    integrativeMedicine: {name: 'Integrative Medicine', checked: false},
                    aestheticMedicine: {name: 'Aesthetic Medicine', checked: false},
                    geriatricMedicine: {name: 'Geriatrics', checked: false},
                    emergencyMedicine: {name: 'Emergency Medicine', checked: false},
                    chronicCare: {name: 'Chronic Care', checked: false},
                    mentalHealth: {name: 'Mental Health', checked: false},
                    gerontology: {name: 'Gerontology', checked: false},
                    hospice: {name: 'Hospice', checked: false},
                    womensHealth: {name: "Womens' Health", checked: false},
                    reproductiveHealth: {name: 'Reproductive Health', checked: false},
                    orthopedics: {name: 'Orthopedics', checked: false},
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
    onFilterChange = (formID, filterID) => {
        index++;
        console.log("index", index);

        console.log("form", formID, filterID);
        const updatedFilters = {...this.state.filters};
        const updatedCategory = {...updatedFilters[formID]};
        const updatedFilter = {...updatedCategory[filterID]}
        
        
        updatedFilter.checked = !updatedFilter.checked;
        
        
        updatedCategory[filterID] = updatedFilter;
        // console.log("updatedCategory", updatedCategory);
        updatedFilters[formID]  = updatedCategory;
        console.log("updatedFilters", updatedFilters);
        this.setState({
            filters: updatedFilters,
        })
        // this.setState( prevState => {
        //     return {[name]: !prevState[name]}
        // });
    }

    toggleFilterHeader = (type) => {

        this.setState( prevState => {
            return { [type]: !prevState[type]}
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
        // console.log("formArray");

        return (

            <div>
                <div className="FilterSideBar">
                
                    {formArray.map(form => {
                        return <div  key={form.id}>
                            <div className="SideBarFilterHeader" onClick={() => this.toggleFilterHeader(form.id)}>
                                {form.id} <FontAwesomeIcon icon={this.state[form.id] ? faCaretDown : faCaretRight} />
                            </div>
                            {this.state[form.id] && form.config.map( filter => {
                               return  <label key={filter.id} className="VisitTypeCheckBox">
                                    <input
                                        onChange={() => this.onFilterChange( form.id, filter.id )}
                                        type="checkbox"
                                        checked={filter.config.checked}
                                        name={filter.id}>
                                    </input>
                                        <span className="CustomCheckbox"></span>
                                <div>{filter.config.name}</div>
                                </label>
                            })}
                        </div>
                    })}
                </div>
               
                <input 
                    onChange={(e) => this.onChange(e)}
                    type="text"
                    value={this.state.value}
                    placeholder="Search by name"
                    name="value"
                />

            <RenderedPCPTable suggestions={this.state.suggestions} filters={this.state.filters}/>
                
            </div>
        );
    }
}

export default Providers;