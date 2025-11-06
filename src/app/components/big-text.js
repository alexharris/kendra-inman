export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full xl:w-8/12 font-serif block leading-none ${className}`}>
      {children}
    </span>
  )
}
