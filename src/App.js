import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import Blockshop from "./abis/Blockshop.json";

// Config
import config from "./config.json";
import { use } from "chai";

function App() {
  const [provider, setProvider] = useState(null);
  const [blockshop, setBlockshop] = useState(null);

  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [toys, setToys] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    const blockshop = new ethers.Contract(
      config[network.chainId].blockshop.address,
      Blockshop,
      provider
    );
    setBlockshop(blockshop);

    const items = [];

    for (var i = 0; i < 9; i++) {
      const item = await blockshop.items(i + 1);
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === "electronics");
    const clothing = items.filter((item) => item.category === "Clothing");
    const toys = items.filter((item) => item.category === "toys");

    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>BlockShop Best Sellers</h2>
    </div>
  );
}

export default App;
