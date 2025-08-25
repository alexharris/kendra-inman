export default function ScrollSection({ index, sectionRefs, children, className = "" }) {
  return (
    <div 
      ref={el => sectionRefs.current[index] = el}
      className={`h-screen w-full relative ${className}`}
    >
      {children || (
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24 z-20">
        </div>
      )}
    </div>
  );
}
