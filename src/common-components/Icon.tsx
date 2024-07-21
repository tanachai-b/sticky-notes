import cx from "classnames";

export function Icon({ icon }: { icon: string }) {
  return (
    <span
      className={cx("material-symbols-rounded")}
      style={{
        width: "1ch",
        fontSize: "inherit",
        fontWeight: "inherit",
        fontVariationSettings: "'FILL' 1, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {icon}
    </span>
  );
}
