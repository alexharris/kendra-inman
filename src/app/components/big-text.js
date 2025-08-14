export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text block text-3xl md:text-6xl lg:text-9xl w-1/2 ${className}`}>
      {children}
    </span>
  )
}
