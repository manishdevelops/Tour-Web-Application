import React, { useState } from 'react';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const faqs = [
        {
            question: 'How do I book a tour on your website?',
            answer: {
                steps: [
                    'Browse through our tour offerings and select the one you\'re interested in.',
                    'Click on the "Book Now" button to proceed to the booking page.',
                    'Fill out the required information, including your contact details and any customization options.',
                    'When prompted for payment, securely enter your credit card details using our integrated Stripe payment gateway.',
                    'Complete the booking process by confirming your payment. You will receive a confirmation email with your tour details.'
                ]
            }
        },
        {
            question: 'What payment methods do you accept?',
            answer: {
                methods: ['Card payments via our Stripe payment gateway (Visa, Mastercard, American Express, etc.)']
            }
        },
        {
            question: 'What should I pack for the tour?',
            answer: {
                suggestions: [
                    'Comfortable clothing and appropriate footwear',
                    'Weather-appropriate attire (e.g., sunscreen, hats, jackets)',
                    'Personal hygiene items and any required medications',
                    'Camera or smartphone for capturing memories'
                ]
            }
        },
        {
            question: 'How can I provide feedback or reviews about my tour experience?',
            answer: {
                process: ['Visit our dedicated reviews section on our website. Rate and write about your experience to help us improve our services and assist other travelers.']
            }
        },
        {
            question: 'What safety measures are in place during the tour?',
            answer: {
                measures: [
                    'Experienced and certified tour guides prioritizing guest safety',
                    'Regular safety briefings and adherence to local regulations',
                    'Emergency communication protocols and access to medical assistance',
                    'Precautionary measures in response to weather conditions or unforeseen circumstances',
                    'Regular inspections and maintenance of transportation and equipment'
                ]
            }
        }
    ];


    return (
        <div className='flex flex-col items-center flex-wrap gap-8  my-28 px-6'>
            <h1 className="text-center text-5xl font-bold text-gray-900 mb-8" >FAQs</h1>
            <div className="max-w-2xl w-full">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
                    >
                        <button
                            className="w-full p-4 text-left focus:outline-none"
                            onClick={() => handleToggle(index)}
                        >
                            <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 ml-auto transition-transform ${activeIndex === index ? 'transform rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        activeIndex === index
                                            ? 'M19 9l-7 7-7-7'
                                            : 'M5 15l7-7 7 7'
                                    }
                                />
                            </svg>
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 bg-white">
                                {/* Render the answer based on the structure of faq.answer */}
                                {Object.keys(faq.answer).map((key) => (
                                    <div key={key} className="mb-4">
                                        <p className="font-bold text-gray-700">{key}:</p>
                                        <ul className="list-disc list-inside text-gray-500">
                                            {faq.answer[key].map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FAQs;