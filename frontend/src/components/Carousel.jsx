import React from 'react';
import { Carousel } from 'react-bootstrap';
import "../components/carousel.css"; // Custom CSS for additional styling

const Carouselmade = ({ images }) => {
    return (
        <Carousel interval={3000} pause="hover">
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={image.src}
                        alt={image.alt}
                    />
                    <Carousel.Caption>
                        <h3 style={{color:"yellow", fontFamily:"serif" }}>{image.caption}</h3>
                        <p style={{color:"yellow", fontFamily:"serif" }} >{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Carouselmade;
