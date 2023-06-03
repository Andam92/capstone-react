import { useState } from "react";
import styles from "./carousel.module.css";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function MyCarousel({ slides }) {
  // const [next, setNext] = useState(false);
  // const [prev, setPrev] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "800px",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={sliderStyles}>
      <MdNavigateBefore onClick={goToPrevious} className={`${styles.prev}`} />
      <MdNavigateNext onClick={goToNext} className={`${styles.next}`} />
      <div style={slideStyles}></div>
      <div className={`${styles.bottom}`}>
        {slides.map((slide, i) => (
          <div
            onClick={() => goToSlide(i)}
            className={`${styles.bottomFiller} ${
              currentIndex === i && styles.bottomFillerCurrent
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default MyCarousel;
