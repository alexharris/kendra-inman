'use client';
import { useState, useEffect } from 'react';
import './Menu.scss';
import { getAllCategories } from '../../../utils/sanity-queries';
import HeaderWithTag from "../HeaderWithTag";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getAllCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);


  return (
    <div className="absolute top-4 right-6 z-50">
      {/* Hamburger Button */}
      <button
        className={`uppercase menu-button futura-medium ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        Menu
      </button>

      {/* Full Screen Menu Overlay */}
      <div className={`menu-overlay text-beige ${isOpen ? 'open' : ''}`}>
        {/* Close X Button */}
        <button
          className="close-button"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <a href="/" className="futura-bold text text-beige absolute top-7 mt-[1px]">
          <svg className="w-48 fill-beige" viewBox="0 0 1330 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.5462 51.348L71.7422 0.343999H111.43L62.3942 58.892L116.022 124H74.3662L32.5462 70.372V124H0.402168V0.343999H32.5462V51.348ZM190.805 27.568H152.593V48.232H188.673V75.456H152.593V96.776H190.805V124H120.449V0.343999H190.805V27.568ZM204.14 124V0.343999H236.284L295.652 75.948V0.343999H327.632V124H295.652L236.284 48.396V124H204.14ZM375.87 96.776H383.25C388.826 96.776 393.801 95.9013 398.174 94.152C402.547 92.4027 406.21 89.9973 409.162 86.936C412.223 83.8747 414.519 80.2667 416.05 76.112C417.69 71.848 418.51 67.2013 418.51 62.172C418.51 57.252 417.69 52.66 416.05 48.396C414.41 44.132 412.059 40.4693 408.998 37.408C406.046 34.3467 402.383 31.9413 398.01 30.192C393.637 28.4427 388.717 27.568 383.25 27.568H375.87V96.776ZM343.726 0.343999H391.286C399.705 0.343999 407.577 2.03866 414.902 5.42799C422.337 8.81733 428.787 13.3547 434.254 19.04C439.83 24.616 444.203 31.176 447.374 38.72C450.545 46.1547 452.13 53.972 452.13 62.172C452.13 70.2627 450.545 78.08 447.374 85.624C444.313 93.0587 439.994 99.6187 434.418 105.304C428.951 110.989 422.501 115.527 415.066 118.916C407.741 122.305 399.814 124 391.286 124H343.726V0.343999ZM494.956 55.612H501.024C507.365 55.612 512.23 54.3 515.62 51.676C519.009 49.052 520.704 45.28 520.704 40.36C520.704 35.44 519.009 31.668 515.62 29.044C512.23 26.42 507.365 25.108 501.024 25.108H494.956V55.612ZM565.64 124H525.624L494.956 76.44V124H462.812V0.343999H512.832C519.72 0.343999 525.733 1.38266 530.872 3.46C536.01 5.428 540.22 8.16133 543.5 11.66C546.889 15.1587 549.404 19.204 551.044 23.796C552.793 28.388 553.668 33.308 553.668 38.556C553.668 47.9587 551.372 55.612 546.78 61.516C542.297 67.3107 535.628 71.2467 526.772 73.324L565.64 124ZM636.485 78.08L622.053 36.916L607.621 78.08H636.485ZM645.013 102.516H599.093L591.713 124H557.437L604.505 0.343999H639.601L686.669 124H652.393L645.013 102.516ZM768.932 0.343999V124H736.788V0.343999H768.932ZM784.924 124V0.343999H817.068L876.436 75.948V0.343999H908.416V124H876.436L817.068 48.396V124H784.924ZM918.934 124L939.926 0.343999H971.742L996.506 66.272L1021.11 0.343999H1052.92L1073.91 124H1041.93L1031.27 52.824L1002.08 124H989.29L961.574 52.824L950.914 124H918.934ZM1151.68 78.08L1137.24 36.916L1122.81 78.08H1151.68ZM1160.2 102.516H1114.28L1106.9 124H1072.63L1119.7 0.343999H1154.79L1201.86 124H1167.58L1160.2 102.516ZM1206.08 124V0.343999H1238.23L1297.6 75.948V0.343999H1329.58V124H1297.6L1238.23 48.396V124H1206.08Z" />
          </svg>          
        </a>
        <nav className="menu-nav">
          <h2 className="menu-title big-serif-header"><a href="/work"><HeaderWithTag title="Work" tag="2" size="text-8xl" /></a></h2>
          <ul className="menu-list">
            {loading ? (
              <p className="pulse">...</p>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <a
                  href={`/work/${category.slug.current}`}
                  key={category._id}
                 
                  style={{ textDecoration: 'none' }}
                >
                  <HeaderWithTag title={category.name} tag={category.projectCount.toString()} size="text-5xl" />
                </a>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </ul>
          <h2 className="menu-title text-8xl apris pt-30">About</h2>
        </nav>
       <a href="/connect" className="pt-30">Let's Work Together</a>
      </div>
    </div>
  );
}
