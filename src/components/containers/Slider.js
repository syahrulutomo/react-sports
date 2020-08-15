import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prevBtn from '../../assets/images/keyboard_arrow_left-black-18dp.svg';
import nextBtn from '../../assets/images/keyboard_arrow_right-black-18dp.svg'


export const Slider = (props) => {
  const { data, width, space, style } = props;

  const [step, setStep] = useState(0);

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  }

  const handleNext = () => {
    if (step + 3 < data.length) setStep(step + 1);
  }

  return (
    <section className="app-slider" style={style}>
      {
        step > 0 ?
        (
          <div className="app-slider--prev" onClick={handlePrev}>
            <img src={prevBtn} alt="prev"/>
          </div>
        ) : ''
      }
      <div className="app-slider--content" 
        style={{ 
          transition: 'transform 1s ease', 
          transform: `translateX(${step * - width}px)`, 
          width: `calc((${width}px *  ${data.length}) + ${space}px * ${data.length -1})`,
        }}
        >
        { data }
      </div>
      {
        step + 3 < data.length ?
        (
          <div className="app-slider--next" onClick={handleNext}>
            <img src={nextBtn} alt="next"/>
          </div>
        ) : ''
      }
      
    </section>
  )
};

Slider.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func
}


