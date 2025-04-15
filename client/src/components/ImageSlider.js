import React, { useState } from "react";
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <p className="left-arrow" onClick={prevSlide}>〈</p>
      <p className="right-arrow" onClick={nextSlide}>〉</p>
      {slides.map((slide, index) => {
        return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <div>
                  <img src={slide.path} alt="item-img" className="image" />
                  <div className="main-items-info">
                    <h5 className="contents-sub-title">{slides[index].subTitle}</h5>
                    <h4 className="contents-main-title">{slides[index].mainTitle}</h4>
                  </div>
                </div>
              )}
              
            </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;