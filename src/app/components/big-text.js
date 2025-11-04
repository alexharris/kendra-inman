export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full sm:w-3/4 lg:w-7/12 font-serif block leading-none ${className}`}>
      {children}
    </span>
  )
}
