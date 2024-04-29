import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShimmerPostDetails, ShimmerThumbnail } from "react-shimmer-effects";
import TourOverview from './TourOverview';
import NotFound from './NotFound';

const Tour = () => {
    const params = useParams();

    const [tour, setTour] = useState(null);
    console.log(tour)
    const [loadingOverview, setLoadingOverview] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getTour = async () => {
            try {
                setError(false);
                setLoadingOverview(true);
                const res = await fetch(`/api/tours/tourOverview/${params.tourSlug}`);

                if (!res.ok) {
                    setLoadingOverview(false);
                    setError(true);
                    return;
                }
                const data = await res.json();
                setLoadingOverview(false);
                setError(false);
                setTour(data.data.tour);

            } catch (error) {
                setLoadingOverview(false);
                setError(true);
            }
        }

        getTour();

    }, []);

    return (
        <div>
            {
                loadingOverview && (<>
                    <ShimmerThumbnail height={400} />
                    <ShimmerPostDetails card cta variant="SIMPLE" />
                </>)
            }
            {error && <NotFound />}
            {!error && !loadingOverview && tour && <TourOverview tour={tour} />}
        </div>
    )
}

export default Tour;