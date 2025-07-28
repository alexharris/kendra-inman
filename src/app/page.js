import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <div className="pt-24 p-8">
        {/* Your page content goes here */}
        <div className="text-center">
          <h2 className="text-2xl mb-4">Welcome to my portfolio</h2>
          <p className="text-lg">Content will appear here after the animation completes.</p>
        </div>
      </div>
    </div>
  );
}
