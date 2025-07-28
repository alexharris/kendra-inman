export default function BigText({ children, className = "" }) {
  return (
    <span className={`block text-9xl w-1/2 ${className}`}>
      {children}
    </span>
  )
}
