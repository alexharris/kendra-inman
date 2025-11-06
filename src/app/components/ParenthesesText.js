export default function ParenthesesText({ children, className = "" }) {
  return (
    <div className={`founders-grotesk relative font-thin uppercase text-sm ${className}`}>
      ( <span className="text-xs">{children}</span> )
    </div>
  );
}
