import Carousel from "react-bootstrap/Carousel";
import styles from "./carousel.module.css";
import { useDispatch, useSelector } from "react-redux";
import getUsers from "../../redux/actions/getUsers";

function MyCarousel() {
  const dispatch = useDispatch();
  const username = useSelector(
    (state) => state?.authReducer?.bearerToken?.username
  );
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  return (
    <div className={`${styles.body}`}>
      <Carousel interval={null}>
        <Carousel.Item>
          <div className={`${styles.slide}`}>
            <div className={`${styles.slide_inner}`}>
              <img
                src="https://drive.google.com/u/0/uc?id=1pn--Zld8P3MwE9l92Rr8jYu5YvhZn875"
                alt=""
              />
              <h5 className="mt-5">DISPONIBILE ORA</h5>
              <hr className="text-center" />
              <p>
                Dai il meglio di te. Nella Stagione 3 di Call of Duty: Warzone
                2.0 puoi competere contro gli avversari più agguerriti e
                dimostrare la tua superiorità.
              </p>
              <button
                className="text-dark"
                onClick={() => dispatch(getUsers(username, token))}
              >
                CONTROLLO
              </button>
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
