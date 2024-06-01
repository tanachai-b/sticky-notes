import cx from "classnames";

export function Icon({
  className,
  icon,
}: {
  className?: string;
  icon?: string;
} = {}) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <span className={cx("material-symbols-outlined", className)}>{icon}</span>
    </div>
  );
}
