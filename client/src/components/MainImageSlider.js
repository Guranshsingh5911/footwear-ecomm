import React, { useState } from "react";

const MainImageSlider = ({ slides }) => {
    const [current , setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length -1 ? 0 : current +1 );
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
      }
    
    return (
        <div className="main-slider">
        <p className="main-left-arrow" onClick={prevSlide}>〈</p>
        <p className="main-right-arrow" onClick={nextSlide}>〉</p>
        {slides.map((slide, index) => {
            return (
                <div
                    className={index === current ? "main-slide active" : "main-slide"}
                    key={index}
                >
                {index === current && (
                    <div className="Image-slider">
                        <img src={slide.path} alt="main-img" className="main-image" />
                        <div className="main-slider-info">
                            <div id="slider-txt">
                                <h4 className="main-title">{slides[index].mainTitle}</h4>
                            </div>
                            <div id="slider-detail-btn">
                                <a href="/news" className="main-slider-detail">Trendyyyy Clothes</a>
                            </div>
                        </div>
                    </div>
                )}
        </div>
        );
      })}
    </div>
    )
};
export default MainImageSlider;