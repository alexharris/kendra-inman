import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";


export default function RootLayout({ children }) {

  // Brand colors corresponding to each section
  const brandColors = [
    'bg-red',     // Section 0
    'bg-beige',   // Section 1  
    'bg-purple',  // Section 2
    'bg-blue',    // Section 3
    'bg-yellow',  // Section 4
    'bg-taupe',   // Section 5
    'bg-green',   // Section 6
    'bg-black',   // Section 7
    'bg-red',      // Section 8 (back to red)
    'bg-black',     // Section 9 (footer extension)
    'bg-white',   // Section 10 (footer)
  ];


  var backgroundColor = brandColors[10]; // Default to yellow for the body background

  if (backgroundColor === 'bg-black') {
    // If the background color is black, set text color to white
    var textColor = 'text-beige';
  } else {
    // For all other colors, set text color to black
    var textColor = 'text-black';
  }

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yiy0lvp.css" />
      </head>
      <body className={`futura-pt ${backgroundColor} ${textColor}`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
