import { useRouter } from "next/navigation";
import s from "./BackButton.module.scss";

export default function BackButton() {
  const router = useRouter();
  return (
      <div onClick={() => router.back()} className={s.button}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
        </svg>
    </div>
  );
}
