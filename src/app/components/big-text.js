export default function BigText({ children, className = "" }) {
  return (
    <span className={`big-text w-full xl:w-9/12 font-serif block text-[70px] md:text-[120px] lg:text-[160px] leading-none ${className}`}>
      {children}
    </span>
  )
}
