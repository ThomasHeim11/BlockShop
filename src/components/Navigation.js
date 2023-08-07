import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    console.log("connecting...");
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>BlockShop</h1>
      </div>

      <input type="text" className="nav_search" />

      {account ? (
        <button type="button" className="nav_connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
          <a href="Toys & Gaming">Toys & Gaming</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
