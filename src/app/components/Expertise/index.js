'use client';
import ParenthesesText from '../ParenthesesText';

export default function Expertise({ expertise }) {
  if (!expertise || expertise.length === 0) {
    return null;
  }

  return (
    <div className="font-mono text-xs">
      <h3 className="mb-4">
        <ParenthesesText>Expertise</ParenthesesText>
      </h3>
      <ul className="flex flex-col gap-2 uppercase">

        {expertise.map((exp) => (
          <li key={exp._id} className="">
            {exp.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
