import style from "./Filter.module.scss";
import Image from "next/image";
export default function Filters() {
  return (
    <div className={style.container}>
      <div className={style.container_filCat}>
        <div className={style.title}>
          <h3>Temperament</h3>
          <Image
            src={"/assets/icons/expand_more.svg"}
            alt={"Expand"}
            width={28}
            height={28}
          />
        </div>
        {/* <ul className={style.wrapper_filCat}>
          {Array.from({ length: 10 }, () => (
            <li className={`${style.filCat_item} ${style.hover}`}>
              <p>Category</p>
            </li>
          ))}
        </ul> */}
      </div>

      <h3>Origin</h3>
      <h3>orden asc dsc alf</h3>
      <h3>orden peso</h3>

      <div>
        <h3>Filter By:</h3>
        <h3>por temperamento</h3>
      </div>
    </div>
  );
}
