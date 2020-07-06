import React, { Fragment, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getCourse } from '../api/courses';
import Rating from '../components/ui/Rating';
import Container from '../components/layouts/Container';
import styles from './CourseDetailPage.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers as membersIcon } from '@fortawesome/free-solid-svg-icons';
import MemberList from '../components/course/MemberList';
import Accordeon from '../components/ui/Accordeon';
import UnitList from '../components/ui/UnitList';


const TabState = {
    DESCRIPTION: 'DESCRIPTION',
    MEMBERS: 'MEMBERS',
    ACTIVITY: 'ACTIVITY',
    EVENTS: 'EVENTS'
}


const CourseDetailPage = () => {
    const [course, setCourse] = useState();
    const [tabState, setTabState] = useState(TabState.DESCRIPTION);

    const params = useParams();

    if (!course) {
        const id = params.id;
        getCourse(id).then(res => {
            setCourse(res.data);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <Container>
            {course && (
                <Fragment>
                    <h1>{course.name}</h1>
                    <div className={styles.stat}>
                        <Rating className={styles.rating} rating={3} />
                        <span className={styles.reviews}>(4 отзывов)</span>
                        <div className={styles.members}>
                            <FontAwesomeIcon icon={membersIcon} />
                            <span>{course.members} СТУДЕНТОВ</span>
                        </div>
                    </div>
                    <p>{course.short_description}</p>
                    <div className={styles.descriptionBlock}>
                        <img className={styles.image} src={course.thumbnail} alt={course.name} />
                        <div className={styles.sidebar}>
                            <button>TAKE THIS COURSE</button>
                            <div className={styles.instructors}>
                                <span>Instructor</span>
                                <div className={styles.instructor}>
                                    <div className={styles.avatar} style={{ backgroundImage: `url(${course.author.profile.avatar})` }}></div>
                                    <span>{course.author.username}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.tabs}>
                        <li className={classNames({ [styles.active]: tabState === TabState.DESCRIPTION })} onClick={() => setTabState(TabState.DESCRIPTION)}>Описание</li>
                        <li className={classNames({ [styles.active]: tabState === TabState.MEMBERS })} onClick={() => setTabState(TabState.MEMBERS)}>Участники</li>
                        <li className={classNames({ [styles.active]: tabState === TabState.ACTIVITY })} onClick={() => setTabState(TabState.ACTIVITY)}>Активность</li>
                        <li className={classNames({ [styles.active]: tabState === TabState.EVENTS })} onClick={() => setTabState(TabState.EVENTS)}>События</li>
                    </ul>
                    <div className={styles.tabContent}>
                        {tabState === TabState.DESCRIPTION && (
                            <div>
                                <ReactMarkdown source={course.long_description} />
                                <div>
                                    <h2>Course Curriculum</h2>
                                </div>

                                {course.sections && (
                                    <ul className={styles.sections}>
                                        {course.sections.map(section => (
                                            <li>
                                                <Accordeon title={section.name}>
                                                    {section.units && <UnitList units={section.units} />}
                                                </Accordeon>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {tabState === TabState.MEMBERS && (
                            <MemberList course={course} />
                        )}
                        {tabState === TabState.ACTIVITY && (
                            <div>ACTIVITY</div>
                        )}
                        {tabState === TabState.EVENTS && (
                            <div>EVENTS</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '50px' }}></div>
                </Fragment>
            )}
        </Container>
    )
}

export default CourseDetailPage;