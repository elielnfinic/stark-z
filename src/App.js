import { Provider, Contract } from 'starknet';
import logo from './logo.svg';
import { connect } from 'get-starknet';
// import { connect } from '@argent/get-starknet';

import contractAbi from './main_abi.json';
import { useState } from 'react';

function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [input, setInput] = useState(null);

  const connectToCairo = async () => {
    try{
      const starknet = await connect();

      await starknet?.enable({ starknetVersion: "v4" })
      const provider = starknet.account;

      setProvider(provider);
      setAddress(provider.address);
      setIsConnected(true);
      console.log(provider);
    }catch(ex){
      console.log(ex);
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = async () => {
    try{
      const contract = new Contract(contractAbi, '0x01e15165d564a2117628d46f6a59cbcfb5c8c19c3c579c32edd5f6050efce909', provider);
      const {res} = await contract.get_increment(input);
      console.log(res);
      setShowResult(res.words[0]);
    }catch(ex){
      console.log(ex);
    }
  }

  return (
    <div className="App text-center">
      <div className='bg-starknet py-4 text-center text-3xl text-white'>Stark-Z</div>
      <div className='py-5'>Evaluate Z Transform</div>

      

      <div>
        <div className='max-w-xl flex mx-auto'>
          <input onChange={handleChange} type="text" className='w-80 border border-slate-400 px-2 py-1'/>
          <button onClick={handleSubmit} className='bg-starknet text-white px-4 py-2'>Evaluate</button>
        </div>
      </div>

      <div className='py-4'>
        <button onClick={connectToCairo} className='bg-starknet text-white px-4 py-2'>Connect</button>
      </div>

      <div>
        {isConnected && <div className='py-4'>Connected to Starknet</div>}
      </div>

      <div>
        {address && <div className='py-4'>Your address: {address}</div>}
      </div>

      <div>
        {showResult && <div className='py-4'>Result: {showResult}</div>}
      </div>
    </div>
  );
}

export default App;
