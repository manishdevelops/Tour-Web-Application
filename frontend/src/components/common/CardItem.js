import React from 'react';

const CardItem = ({ tours }) => {
    console.log(tours)
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {tours.map((tour) =>
                <div className="max-w-xs rounded overflow-hidden shadow-lg" key={tour.photos[0]}>
                    <img className="w-full h-48 object-cover" src={tour.photos[0]} alt="Mountain" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 truncate">{tour.tourName}</div>
                        <p className="text-gray-700 text-base line-clamp-2">
                            {tour.tourDescription}
                        </p>
                    </div>
                    <div className='px-6 font-bold text-sm mb-2 flex justify-between'>
                        <div>
                            <span className=''>Price: </span>
                            <span className=''>₹{tour.price}</span>
                        </div>
                        <div className=''>
                            <span className=''>Ratings: </span>
                            <span className=''>{tour.ratings}</span>
                        </div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
            )}
        </div >
    );
};

export default CardItem;
