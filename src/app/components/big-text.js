export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full xl:w-4/5 font-serif block text-6xl md:text-[160px] pt-8 ${className}`}>
      {children}
    </span>
  )
}
