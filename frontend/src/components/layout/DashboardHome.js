import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Vortex, Bars } from 'react-loader-spinner';

import { TbCoinRupee } from "react-icons/tb";
import { MdTour } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { MdContacts } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Filler, Legend, LineElement, Tooltip, CategoryScale, LinearScale, PointElement);

const DashboardHome = () => {
    const [statistics, setStatistics] = useState(null);
    const [monthlyEarning, setMonthlyEarning] = useState(null);
    const [statisticsLoading, setStatisticsLoading] = useState(true);
    const [lineGraphLoading, setLineChartLoading] = useState(true);
    const icons = [MdTour, FaUsers, TbBrandBooking, MdContacts, MdOutlineRateReview];

    const colors = ['text-red-900', 'text-blue-600', 'text-green-700', 'text-orangered', 'text-pink-700'];

    const getMonthlyEarnings = async () => {
        try {
            const res = await fetch('/api/admin/booking-earnings-by-date');

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();
            setMonthlyEarning({
                labels: data.data.dates,
                data: data.data.earnings
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLineChartLoading(false);
        }
    }

    const getStatistics = async () => {
        try {
            const res = await fetch('/api/admin/all-statistics');

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();
            setStatistics(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setStatisticsLoading(false);
        }
    }

    useEffect(() => {
        getStatistics();
        getMonthlyEarnings();
    }, []);

    return (
        <div className="flex-1 p-2 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {!statisticsLoading && statistics &&
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-purple-900 font-semibold flex items-center"><TbCoinRupee className='text-xl text-yellow-500 inline mr-2' />Total Earnings</h2>
                        <div className="text-2xl font-bold">₹{parseFloat(statistics[2]?.stats?.totalEarnings).toLocaleString('en-IN')}</div>
                        <div className="text-green-500 text-sm">₹{parseFloat(statistics[2]?.stats?.currentMonthEarnings).toLocaleString('en-IN')} this month</div>
                    </div>
                }
                {!statisticsLoading && statistics &&
                    statistics.map((statistics, i) => {
                        const Icon = icons[i];
                        const color = colors[i];
                        return (
                            <div key={i} className="p-4 bg-white rounded-lg shadow-md">
                                <h2 className="text-purple-900 font-semibold "> <Icon className={`text-xl ${color} inline mr-2`} />Total {statistics.model}</h2>
                                <div className="text-2xl font-bold">{statistics?.stats?.count}</div>
                                <div className="text-green-500 text-sm">{statistics?.stats?.percentageOfNewDocuments}% this month</div>
                            </div>
                        );
                    })
                }

                {!statistics && statisticsLoading && (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-4 bg-white rounded-lg shadow-md grid place-content-center">
                            <Bars
                                height="60"
                                width="60"
                                color="rgba(79, 169, 77, 0.7)"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    ))
                )}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                <div className='h-[45vh] p-4 bg-white rounded-lg shadow-md grid place-content-center'>
                    {!lineGraphLoading && monthlyEarning && (
                        <Line data={{
                            labels: monthlyEarning.labels,
                            datasets: [{
                                label: 'Earnings this month',
                                data: monthlyEarning.data,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                pointBorderColor: 'rgba(255, 99, 132, 1)',
                                fill: true,
                                tension: 0.4
                            }]
                        }} options={{
                            plugins: {
                                legend: { display: true }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: (value) => `₹${value.toLocaleString('en-IN')}`
                                    }
                                }
                            }
                        }} />
                    )}
                    {lineGraphLoading && !monthlyEarning && (
                        <Bars
                            height="100"
                            width="100"
                            color="rgba(255, 99, 132, 0.6)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    )}
                </div>
                <div className='h-[45vh] p-4 bg-white rounded-lg shadow-md grid place-content-center'>
                    {!statistics && statisticsLoading && (
                        <Vortex
                            visible={true}
                            height="150"
                            width="150"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    )}
                    {!statisticsLoading && statistics && (
                        <Pie data={{
                            labels: statistics.map((statistic) => statistic.model),
                            datasets: [
                                {
                                    data: statistics.map((statistic) => statistic.stats.count),
                                    backgroundColor: ['#00C6FF', '#FF6F61', '#B8E986', '#8A2BE2', '#FFD700']
                                }
                            ]
                        }} options={{}} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
