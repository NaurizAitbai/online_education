import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/layouts/Container';
import { getUnit } from '../api/units';
import ReactMarkdown from 'react-markdown';


const UnitPage = () => {
    const [unit, setUnit] = useState();

    const params = useParams();

    if (!unit) {
        const id = params.id;
        getUnit(id).then(res => {
            setUnit(res.data);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <Container>
            {unit && (
                <div>
                    <h1>{unit.name}</h1>
                    <ReactMarkdown source={unit.content} />
                </div>
            )}
        </Container>
    )
}

export default UnitPage;