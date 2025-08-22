export default function HeaderWithTag({ title, tag, size }) {
  return (
    <div >
      <span className={`has-tag apris inline-flex flex-row items-center mr-8 ${size}`}>{title}
        {tag && (
          <span className="absolute mono-tag founders-grotesk ml-6 -right-4 mb-2">
            {tag}
          </span>
        )}

      </span>

    </div>
  )
}


