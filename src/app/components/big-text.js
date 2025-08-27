export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full font-serif block text-6xl lg:text-[180px] ${className}`}>
      {children}
    </span>
  )
}
