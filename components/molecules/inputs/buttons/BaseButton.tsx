interface IBaseButton {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick: () => void;
  type?: 'button' | 'submit';
}

export default function BaseButton({
  children,
  className,
  disabled,
  onClick,
  type='button',
}: IBaseButton) {
  return <button
    className={`${className}`}
    disabled={disabled}
    style={{cursor: 'pointer'}}
    onClick={() => onClick()}
    type={type}
  >
    {children}
  </button>
}
