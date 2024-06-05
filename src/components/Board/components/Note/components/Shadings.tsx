import cx from "classnames";

export function Shadings() {
  return (
    <div className={cx("absolute", "size-full")}>
      <div
        className={cx("absolute", "size-full")}
        style={{
          background:
            "linear-gradient(155deg, #00000020, #00000000 20%, #ffffff00 80%, #ffffff20)",
        }}
      />
      <div
        className={cx("absolute", "size-full")}
        style={{
          background:
            "linear-gradient(-155deg, #00000020, #00000000 20%, #ffffff00 80%, #ffffff20)",
        }}
      />
    </div>
  );
}
