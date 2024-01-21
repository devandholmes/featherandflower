import React, { useState } from "react";
import "../styles/Carousel.css";
import FlipCard from "./FlipCard";

interface CarouselProps {
    items: any[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [current, setCurrent] = useState(-1); // The index of the current item

    const nextItem = () => {
        setCurrent((prev) => (prev + 1) % items.length);
        console.log(current);
        console.log(items);
    }
    const prevItem = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper" style={{ transform: `rotateY(${current * -40}deg)` }}>
                {items.map((item, index) => (
                    <div
                        className="carousel-item"
                        style={{ transform: `rotateY(${index * 40}deg) translateZ(300px)` }}
                        key={index}
                    >
                        <FlipCard cardImage={item.cardImage} description={item.description} backImage={item.productImage} frontImage={item.productImage} title={item.title} key={item.index} />
                    </div>
                ))}
            </div>
            <div className="carousel-button-container">
                <button className="carousel-button" onClick={prevItem}>Previous</button>
                <button className="carousel-button" onClick={nextItem}>Next</button>
            </div>
        </div>
    );
};

export default Carousel;
