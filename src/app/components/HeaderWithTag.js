export default function HeaderWithTag({ title, tag, size }) {
  // Format tag to have leading zero for single digits
  const formattedTag = tag && !isNaN(tag) ? String(tag).padStart(2, '0') : tag;
  
  return (
    <div >
      <span className={`has-tag apris inline-flex flex-row items-center mr-8 ${size}`}>{title}
        {tag && (
          <span className="absolute mono-tag founders-grotesk ml-8 -right-6">
            {formattedTag}
          </span>
        )}

      </span>

    </div>
  )
}


