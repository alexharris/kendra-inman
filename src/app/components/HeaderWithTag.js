export default function HeaderWithTag({ title, tag }) {
  return (
    <div className="my-24 text-center text-3xl apris serif-header px-8">
      <h1 className="has-tag inline ">{title}
        {tag && (
          <span className="absolute mono-tag founders-grotesk top-3/5 sm:top-6 ml-6 -right-8">
            {tag}
          </span>
        )}

      </h1>

    </div>
  )
}


