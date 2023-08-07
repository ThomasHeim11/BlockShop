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
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)

    const blockshop = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Blockshop,
      provider
    )
  
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}/>
      <h2>BlockShop Best Sellers</h2>
    </div>
  );
}

export default App;
