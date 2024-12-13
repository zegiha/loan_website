import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import style from './modal.module.scss';

export default function Modal({
  isOpen,
  setIsOpen,
  children
}: {
  isOpen: boolean,
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  children: ReactNode
}) {
  const lockScroll = () => {
    const currentScrollY = window.scrollY
    const bodyStyle = document.body.style
    bodyStyle.position = 'fixed'
    bodyStyle.width = '100%'
    bodyStyle.top = `-${currentScrollY}px`
    bodyStyle.overflowY = 'scroll';
    return currentScrollY;
  }
  const unlockScroll = (prevScrollY: number) => {
    const bodyStyle = document.body.style
    bodyStyle.position = ''
    bodyStyle.width = ''
    bodyStyle.top = ''
    bodyStyle.overflowY = ''
    window.scrollTo(0, prevScrollY)
  }
  useEffect(() => {
    if(isOpen) {
      const prevScrollY = lockScroll();
      return () => unlockScroll(prevScrollY);
    }
  }, [isOpen]);
  return isOpen ? createPortal(
    <div className={style.modalContainer} onClick={() => setIsOpen && setIsOpen(false)}>
      {children}
    </div>
    , document.getElementById('modal-root') as HTMLElement) : <></>;
}
