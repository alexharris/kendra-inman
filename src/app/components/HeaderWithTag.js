export default function HeaderWithTag({ title, tag, size, tagAbove = false }) {
  // Format tag to have leading zero for single digits
  const formattedTag = tag && !isNaN(tag) ? String(tag).padStart(2, '0') : tag;

  return (
    <div className={tagAbove ? "flex flex-col items-center md:block" : undefined}>
      {tagAbove && tag && (
        <span className="mono-tag founders-grotesk mb-1 text-center md:hidden">
          {formattedTag}
        </span>
      )}
      <span className={`has-tag apris inline-flex flex-row items-center ${tagAbove ? 'md:mr-8' : 'mr-8'} ${size}`}>{title}
        {tag && (
          <span className={`absolute mono-tag founders-grotesk ml-8 -right-6 ${tagAbove ? 'hidden md:inline' : ''}`}>
            {formattedTag}
          </span>
        )}
      </span>
    </div>
  )
}


