interface IBaseButton {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function BaseButton({
  children,
  className,
  disabled,
  onClick
}: IBaseButton) {
  return <button
    className={`${className}`}
    disabled={disabled}
    onClick={() => onClick()}
  >
    {children}
  </button>
}
