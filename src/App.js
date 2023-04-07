import { Provider, Contract, number } from 'starknet';
import logo from './logo.svg';
import { connect } from 'get-starknet';
// import { connect } from '@argent/get-starknet';

import contractAbi from './starkz-abi/main_abi.json';
import { useState } from 'react';
import Values from './Values';
import StarkIcon from './res/starknet-hero-image.svg';

function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);

  const contract_address = '0x05b60fc1222b9a4255397e9b9672535bc3aa23550bdf6d22872e3d770d8d48c9';

  const [input, setInput] = useState(null);

  const connectToCairo = async () => {
    try {
      const starknet = await connect();

      await starknet?.enable({ starknetVersion: "v4" })
      const provider = starknet.account;

      setProvider(provider);
      setAddress(provider.address);
      setIsConnected(true);
      const contract = new Contract(contractAbi, contract_address, provider);
      setContract(contract);
      console.log(provider);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const contract = new Contract(contractAbi, contract_address, provider);
      const { res } = await contract.get_increment(input);
      console.log(res);
      setShowResult(number.toBN(res).toString());
    } catch (ex) {
      console.log(ex);
    }
  }

  const increaseBalanceFunction = async () => {
    try {
      // create a contract object based on the provider, address and abi
      const contract = new Contract(contractAbi, contract_address, provider)

      // call the increase_balance function
      await contract.increase_balance(13)

    }
    catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="text-center">
      <div className='bg-starknet py-4 text-center text-3xl text-white'>Stark-Z <img src={StarkIcon} className='inline h-10 w-10' /></div>
      {!isConnected && <div>
        <div className='pt-16 text-xl'>Evaluate Z Transform</div>
        <div className='text-md text-slate-600'>This is an expirement on Starknet with Cairo. It is running on <u>Goerli</u> testnet.</div>
      </div>}



      {/* <div>
        <div className='max-w-xl flex mx-auto'>
          <input onChange={handleChange} type="text" className='w-80 border border-slate-400 px-2 py-1'/>
          <button onClick={handleSubmit} className='bg-starknet text-white px-4 py-2'>Evaluate</button>
        </div>
      </div> */}

      {!isConnected && <div className='py-4'>
        <button onClick={connectToCairo} className='bg-starknet text-white px-4 py-2 rounded-md'>Connect to starknet</button>
      </div>}

      <div>
        {isConnected && <div className='pt-4 text-xl'>You are connected to Starknet <div className='h-4 w-4 inline-block bg-green-500 rounded-full'></div></div>}
      </div>

      <div>
        {address && <div className='py-1'><div className='text-xs'><small>Your address:</small></div> <div className='text-xs'>{address}</div></div>}
      </div>

      <div>
        {showResult && <div className='py-4'>Result: {showResult}</div>}
      </div>

      {isConnected && <div className='mx-auto md:max-w-md max-w-lg py-4 lg:mb-20'>
        <Values contract={contract}/>
      </div>}

      <div className='lg:fixed lg:bottom-4 w-full mt-24 text-xs md:text-normal lg:bg-white'>
        <div>Made with ❤️ by <u><a href="https://twitter.com/elielmathe">Eliel</a></u> a stark core pharaon  </div>
        <div>Check out <u><a href="https://eliel.nfinic.com">my blog</a></u> for more work</div>
      </div>
    </div>
  );
}

export default App;
