import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserMd} from '@fortawesome/free-solid-svg-icons';


const RenderedPCPTable = (props) => {
    return (
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Specialty</th>
                </tr>
                {props.suggestions.length ? props.suggestions.map(pcp => {
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
