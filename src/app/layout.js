import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yiy0lvp.css" />
      </head>
      <body className="futura-pt"><Header />
        <div id="wrapper">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
