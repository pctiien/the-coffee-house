import React from 'react';
import slides from '../../sample/HomeBanner';
import './Banner.css';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const handleClick = (index) => {
        setCurrentSlide(index);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner-container ">
            <div
                className="flex slides"
                style={{ transform: `translateX(-${currentSlide * 100}%)`}}
            >
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        className="slide w-full"
                        src={slide.src}
                    />
                ))}
            </div>
            <div className='flex justify-center -mt-2 gap-2'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`cursor-pointer w-12 h-1 opacity-35 bg-white ${
                            currentSlide === index ? 'bg-orange-500 opacity-95 transition duration-700' : 'bg-white '
                        }`}>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
