import cx from "classnames";
import { ReactNode, useState } from "react";

export function TBunLogo() {
  return (
    <Container>
      <Logo>
        <span className={cx("font-black")}>TBUN</span>

        <span className={cx("text-[50%]")}>.dev</span>
      </Logo>

      <Copyright>Copyright © 2024 Tanachai Bunlutangtum. All rights reserved.</Copyright>
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "place-self-end",

        "right-[20px]",
        "bottom-[20px]",

        "flex",
        "flex-col",
        "items-end",

        "gap-[10px]",

        "invisible",
      )}
    >
      {children}
    </div>
  );
}

function Logo({ children }: { children: ReactNode }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      className={cx(
        "visible",

        "flex",
        "flex-row",
        "items-center",

        "text-[#ffffff]",
        "text-[50px]",
        "leading-none",

        "opacity-[50%]",
        "hover:opacity-[100%]",

        "transition-all",
        "duration-[500ms]",
      )}
      style={{
        textShadow: isHover ? "0px 5px 10px #00000080, 0px 10px 20px #00000080" : "initial",
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      href="https://www.tbun.dev/"
      target="_blank"
    >
      {children}
    </a>
  );
}

function Copyright({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "visible",
        "pointer-events-none",

        "text-[#ffffff80]",
        "text-[11px]",
        "leading-none",
      )}
    >
      {children}
    </div>
  );
}
