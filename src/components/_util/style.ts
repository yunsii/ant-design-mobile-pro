export const useStyles = (styles: React.CSSProperties) => (className: string) => {
  return styles[className];
}
