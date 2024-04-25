import React from 'react';
import { useParams } from 'react-router-dom';

const TourOverview = () => {
    const params = useParams();
    console.log(params.tourSlug);

    return (
        <div>TourOverview</div>
    )
}

export default TourOverview