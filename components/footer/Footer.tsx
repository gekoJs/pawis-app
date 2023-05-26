import style from "./Footer.module.scss";
export default function Footer() {
  return (
    <div className={style.container}>
      <h5 className={style.text}>
        CODED AND DESIGNED BY:  <a href="https://itsroa.vercel.app" target="_black">Daniel Roa <hr /></a>
      </h5>
    </div>
  );
}
