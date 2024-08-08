import cx from "classnames";

export function Shadings() {
  return (
    <div className={cx("absolute", "size-full")}>
      <div
        className={cx("absolute", "size-full")}
        style={{
          background: `linear-gradient(${
            90 + 45
          }deg, #00000020, #00000000 20%, #00000000 80%, #00000020)`,
        }}
      />

      <div
        className={cx("absolute", "size-full")}
        style={{
          background: `linear-gradient(${
            -90 - 45
          }deg, #00000020, #00000000 20%, #00000000 80%, #00000020)`,
        }}
      />
    </div>
  );
}
