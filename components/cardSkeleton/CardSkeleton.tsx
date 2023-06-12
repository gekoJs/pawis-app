import s from "./CardSkeleton.module.scss";
export default function CardSkeleton() {
  return (
    <div className={s.container}>
      <div className={s.img}></div>
      <div className={s.wrapper_content}>
        <div className={s.title}></div>
        <div className={s.wrapper_temperaments}>
          <div className={s.temperaments}></div>
          <div className={s.temperaments}></div>
        </div>
        <div className={s.weight}></div>
      </div>
    </div>
  );
}
