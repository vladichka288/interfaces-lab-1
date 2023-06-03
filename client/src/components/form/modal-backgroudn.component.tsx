import { ReactNode, useEffect } from "react";

export type ModalBackground = {
  onBackgroundClick: () => void;
  children: ReactNode | ReactNode[];
};
export const ModalBackground = (props: ModalBackground) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div onClick={props.onBackgroundClick} className="blur-background">
      {props.children}
    </div>
  );
};
