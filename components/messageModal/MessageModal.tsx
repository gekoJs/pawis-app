import s from "./MessageModal.module.scss";
interface type_component {
  message: string;
  type: "Warning" | "Error";
  display: boolean;
}
export default function MessageModal({
  message,
  type,
  display,
}: type_component) {
  return (
    <div className={display ? s.container : `${s.container} ${s.container_hidden}`}>
      <div className={s.w_content}>
        <p className={`${s.message} ${s[type]}`}>{message}</p>
        {type === "Warning" && (
          <svg
            className={`${s.svg} ${s.svg_warning}`}
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z" />
          </svg>
        )}
      </div>
    </div>
  );
}
