export default function Link({
  children,
  onClick,
  height,
  width,
  disabled,
  ...otherProps
}) {
  const handleClick = (ev) => {
    ev.preventDefault();
    return !disabled && onClick(ev);
  };

  const style = width != null && height != null ? {
    width,
    height,
  } : {}



  return (
    <a
      onClick={handleClick}
      style={style}
      {...otherProps}
    >
      {children}
    </a>
  );
}
