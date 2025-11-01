export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full lg:w-11/12 xl:w-2/3 font-serif block text-[80px] md:text-[120px] lg:text-[160px] leading-none ${className}`}>
      {children}
    </span>
  )
}
