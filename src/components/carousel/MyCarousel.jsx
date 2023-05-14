import Carousel from "react-bootstrap/Carousel";
import styles from "./carousel.module.css";

function MyCarousel() {
  return (
    <div className={`${styles.body}`}>
      <Carousel>
        <Carousel.Item>
          <div className={`${styles.slide}`}>
            <div className={`${styles.slide_inner}`}>
              <h3>PROVA</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione rem molestias unde totam ex qui numquam natus incidunt
                odio debitis quae id perferendis assumenda, praesentium impedit,
                blanditiis laborum excepturi! Eum!
              </p>
              <button className={`${styles.slide_button}`}>ACQUISTA ORA</button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={`${styles.slide}`}>
            <div className={`${styles.slide_inner}`}>
              <h3>PROVA</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione rem molestias unde totam ex qui numquam natus incidunt
                odio debitis quae id perferendis assumenda, praesentium impedit,
                blanditiis laborum excepturi! Eum!
              </p>
              <button className={`${styles.slide_button}`}>ACQUISTA ORA</button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={`${styles.slide}`}>
            <div className={`${styles.slide_inner}`}>
              <h3>PROVA</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione rem molestias unde totam ex qui numquam natus incidunt
                odio debitis quae id perferendis assumenda, praesentium impedit,
                blanditiis laborum excepturi! Eum!
              </p>
              <button className={`${styles.slide_button}`}>ACQUISTA ORA</button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MyCarousel;
