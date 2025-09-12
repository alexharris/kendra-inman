'use client';

export default function Expertise({ expertise }) {
  if (!expertise || expertise.length === 0) {
    return null;
  }

  return (
    <div className="font-mono text-xs">
      <h3 className="uppercase mb-4">( Expertise )</h3>
      <ul className="flex flex-col gap-2 uppercase">
        {console.log(expertise)}
        {expertise.map((exp) => (
          <li key={exp._id} className="">
            {exp.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
