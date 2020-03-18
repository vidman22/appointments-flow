import React from 'react';

const RenderedPCPTable = (props) => {
    return (
            <table>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Specialty</th>
                </tr>
                {props.suggestions.length ? props.suggestions.map(pcp => {
                    return (
                        <tr>
                            <td>
                                <img alt="Primary Care Physician" className="PCPListImg" src={pcp.img} height="50" width="50"/>
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
            </table>
    );
}

export default RenderedPCPTable;
