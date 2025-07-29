'use client';
import './Footer.scss';

export default function Footer() {

  return (
    <div id="footer" className="w-full flex flex-col items-center p-4">
      <div className="text-[12.65vw]/36 font-black uppercase text-center">Kendra Inman</div>
      <div className="flex flex-col md:flex-row w-full justify-between items-center mt-4">
        <div><a href="/connect">Let's Work Together</a></div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-2 md:mt-0">
          <a href="#">Linked In</a>
          <a href="#">Pinterest</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </div>
  );
}
