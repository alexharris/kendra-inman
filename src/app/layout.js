import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


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
    'bg-black'     // Section 9 (footer extension)
  ];


  var backgroundColor = brandColors[3]; // Default to yellow for the body background

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
        <Header />
        <div id="wrapper">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
