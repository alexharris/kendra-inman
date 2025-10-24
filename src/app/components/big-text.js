export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full md:w-2/3 font-serif block text-6xl md:text-[160px] pt-16 ${className}`}>
      {children}
    </span>
  )
}
