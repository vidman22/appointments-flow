import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserMd} from '@fortawesome/free-solid-svg-icons';


const RenderedPCPTable = (props) => {
    const {suggestions, filters} = props;
    console.log("filters", filters);
    for (let prop in filters){
        switch(prop){
            case 'gender':
                console.log("filter", filters[prop]);
            break;
            case 'care':
                console.log("filter", filters[prop]);
            break;
            case 'type':
                console.log("filter", filters[prop]);
            break;
            case 'languages':
                console.log("filter", filters[prop]);
            break;
            case 'specialty':
                console.log("filter", filters[prop]);
            break;
        }
    }
    return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Specialty</th>
                    </tr>
                    {suggestions.length ? suggestions.map(pcp => {
                        return (
                            <tr key={Math.random()}>
                                <td>
                                    {pcp.img ? <img alt="Primary Care Physician" className="PCPListImg" src={pcp.img} height="50" width="50"/> : <FontAwesomeIcon icon={faUserMd} size="2x" />}
                                </td>
                                <td>
                                    {pcp.firstName + ' ' + pcp.lastName}
                                </td>
                                <td>
                                    {pcp.title}
                                </td>
                                <td>
                                    {pcp.specialInterests[0]}
                                </td>
                            </tr>
                        )
                    }): null}
                </tbody>
            </table>
    );
}

export default RenderedPCPTable;
