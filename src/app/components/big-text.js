export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text font-serif block text-3xl md:text-6xl lg:text-9xl ${className}`}>
      {children}
    </span>
  )
}
