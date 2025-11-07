export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full font-serif block leading-none ${className}`}>
      {children}
    </span>
  )
}
