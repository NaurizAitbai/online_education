import React, { useState } from 'react';
import { getMembers } from '../../api/courses';


const MemberList = ({ course }) => {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);

    if(members && !members.length) {
        getMembers(course.id).then(res => {
            setMembers(res.data.results);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <div>
            {members && (
                <ul>
                    {members.map(member => (
                        <li>{member.user.username}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MemberList;