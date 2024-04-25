import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShimmerPostDetails, ShimmerThumbnail } from "react-shimmer-effects";
import TourOverview from './TourOverview';

const Tour = () => {
    const params = useParams();

    const [tour, setTour] = useState(null);
    console.log(tour)
    const [loadingOverview, setLoadingOverview] = useState(false);

    useEffect(() => {
        const getTour = async () => {
            try {
                setLoadingOverview(true);
                const res = await fetch(`/api/tours/tourOverview/${params.tourSlug}`);

                if (!res.ok) {
                    setLoadingOverview(false);
                    const errorData = await res.json();
                    return toast.error(errorData.message);
                }

                const data = await res.json();
                setLoadingOverview(false);
                setTour(data.data.tour);

            } catch (error) {
                setLoadingOverview(false);
                toast.error(error.message);
            }
        }

        getTour();

    }, []);

    return (
        <div>
            {loadingOverview ?
                (
                    <>
                        <ShimmerThumbnail height={400} />
                        <ShimmerPostDetails card cta variant="SIMPLE" />
                    </>
                )
                : <TourOverview tour={tour} />}
        </div>
    )
}

export default Tour;