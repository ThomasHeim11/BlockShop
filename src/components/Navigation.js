import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  return (
    <nav>
      <div className="nav__brand">
        <h1>BlockShop</h1>
      </div>

      <input type="text" className="nav_search" />

      <button type="text" className="nav__connect">
        {account.slice(0, 6) + "..." + account.slice(38, 42)}
      </button>

      <ul className="nav__links">
        <li>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
          <a href="Toys & Gaming">Toys & Gaming</a>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
