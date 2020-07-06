import React, { useState } from 'react';
import { getMembers } from '../../api/courses';
import styles from './MemberList.module.css';


const MemberList = ({ course }) => {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);

    if (members && !members.length) {
        getMembers(course.id).then(res => {
            console.log(res.data.results);
            setMembers(res.data.results);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <div>
            {members && (
                <ul className={styles.members}>
                    {members.map(member => (
                        <li>
                            <div className={styles.avatar} style={{ backgroundImage: `url(${member.user.profile.avatar})` }}></div>
                            <div className={styles.bio}>
                                <span>{member.user.last_name} {member.user.first_name}</span>
                                <span>{member.user.username}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MemberList;