import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

const FashionCarousel = () => {
  const images = [
    {
      src: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: 'Elevate Your Style',
      alt: 'First slide',
      textt:"Discover the perfect ensemble to make every moment memorable."
    },
    {
      src: "https://images.pexels.com/photos/4968390/pexels-photo-4968390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: 'Unleash Your Confidence',
      alt: 'Second slide',
      textt:"Step into the spotlight with our latest collection, designed to empower."
    },
    {
      src: "https://images.pexels.com/photos/4049793/pexels-photo-4049793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: 'Define Your Fashion Statement',
      alt: 'Third slide',
      textt:"Find your unique expression with trends that speak to your individuality."
    }
  ];

  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Image
            className="d-block w-100"
            src={image.src}
            alt={image.alt}
            width={3000}
            height={600}
            objectFit="cover"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FashionCarousel;