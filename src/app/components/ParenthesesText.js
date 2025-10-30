export default function ParenthesesText({ children, className = "" }) {
  return (
    <div className={`founders-grotesk relative font-thin pt-4 uppercase text-sm ${className}`}>
      ( <span className="text-xs">{children}</span> )
    </div>
  );
}
