import {ReactNode} from "react";
import {createPortal} from "react-dom";
import style from './modal.module.scss';

export default function Modal({
  isOpen,
  setIsOpen,
  children
}: {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children: ReactNode
}) {
  return isOpen ? createPortal(
    <div className={style.modalContainer} onClick={() => setIsOpen(false)}>
      <div className={style.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
    , document.getElementById('modal-root') as HTMLElement) : <></>;
}
