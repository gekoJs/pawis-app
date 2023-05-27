import style from "./Nav.module.scss";
import Image from "next/image";
import Link from "next/link";
export default function Nav() {
  return (
    <nav className={style.container}>
      <Link href={"/dogs"} className={`${style.imgWrapper} ${style.hover}`}>
        <Image
          src={"/assets/icons/paw.svg"}
          alt="pawis logo"
          width={30}
          height={30}
        />
      </Link>

      <form className={style.form}>
        <input type="text" placeholder="Search a dog" className={`${style.input} ${style.hover}`} />
      </form>

      <div className={style.buttonsWrapper}>
        <button className={`${style.button} ${style.hover}`}>Sign in</button>
        <button className={`${style.button} ${style.hover}`}>Sign up</button>
      </div>
    </nav>
  );
}
