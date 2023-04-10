import { BoltIcon, CircleStackIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Values(props) {
    const input_css_class = "border mx-2 px-2 py-2 rounded-md font-bold text-center focus:outline-starknet w-24 md:w-auto";

    const [freq, setFreq] = useState([{ id: 1, value: 0, trans: null }]);
    const [transactionHash, setTransactionHash] = useState(null);
    const [loading, setLoading] = useState(false);
    const handle_add_freq = () => {
        if (freq.length >= 5) return alert("You can't add more than 5 frequencies");
        setFreq([
            ...freq,
            {
                id: freq.length + 1,
                value: 0,
                trans: null
            }
        ]);
    }

    const handle_freq_change = (e, index) => {
        const value = e.target.value;
        if (value < 0) return alert("Frequency can't be negative");
        if (value > 100000) return alert("Frequency can't be more than 100000");
        const new_freq = [...freq];
        new_freq[index].value = value;
        setFreq(new_freq);
    }

    const handle_quick_calculation = async () => {
        try {
            setLoading(true);
            if (!props.contract) {
                alert("You need to connect to starknet first");
                return;
            }

            let local_inputs = [];
            for (var i = 0; i < 5; i++) {
                if (freq[i]) {
                    local_inputs.push(parseInt(freq[i].value));
                } else {
                    local_inputs.push(0);
                }
            }

            const result = await props.contract.calc_trans(local_inputs[0], local_inputs[1], local_inputs[2], local_inputs[3], local_inputs[4]);
            console.log(result);
            if (result.z) {
                console.log(result.z);
                const inputs = result.z.input;
                const transforms = result.z.transform;
                let new_freq = [];
                for (let i = 0; i < freq.length; i++) {
                    new_freq.push({
                        id: i + 1,
                        value: inputs[`num_${i + 1}`].toString(),
                        trans: transforms[`num_${i + 1}`].toString()
                    })
                }
                console.log(new_freq);
                setFreq(new_freq);
            }
            console.log(result);
            console.log(result.toString());
            // alert(result);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            console.log(ex);
        }
    }

    const handle_save_on_starknet = async () => {
        try {
            setLoading(true);
            if (!props.contract) {
                alert("You need to connect to starknet first");
                return;
            }

            let local_inputs = [];
            for (var i = 0; i < 5; i++) {
                if (freq[i]) {
                    local_inputs.push(parseInt(freq[i].value));
                } else {
                    local_inputs.push(0);
                }
            }

            const result = await props.contract.calc_and_save_trans(local_inputs[0], local_inputs[1], local_inputs[2], local_inputs[3], local_inputs[4]);
            console.log(result);
            if (result.transaction_hash) {
                setTransactionHash(result.transaction_hash);
            }
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            console.log(ex);
        }
    }

    return (
        <div className='px-2'>
            <table className="divide-y w-full">
                <thead>
                    <tr><th className="py-2">Frequency</th><th className="py-2">Value</th><th className="py-2">Transform(Z(3))</th></tr>
                </thead>
                <tbody>
                    {freq.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-left py-2">Freq {item.id}</td>
                            <td className=" py-2"><input type="text" onChange={(e) => handle_freq_change(e, index)} value={item.value} className={input_css_class} /></td>
                            <td className=" py-2 text-left">{item.trans && !loading ? item.trans : '...'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='py-2'>
                Add new frequency <button onClick={handle_add_freq} className='bg-slate-200 hover:bg-slate-300 text-starknet text-white px-2 py-2 pr-4 rounded-md'> <PlusIcon className='h-5 w-5 inline mr-1' /> Add </button>
            </div>
            {transactionHash && <div>
                <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3  text-left">
                            <p className="text-sm font-medium text-green-800">
                                <div>Transaction commit was successful</div>
                                <div className='my-1 py-1 underline'><a target="_blank" href={`https://testnet.starkscan.co/tx/${transactionHash}`}>View transaction on Starscan</a></div>
                                <div className='my-1 py-1 underline'><a target="_blank" href={`https://goerli.voyager.online/tx/${transactionHash}`}>View transaction on Voyager</a></div>
                            </p>

                        </div>

                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className='text-center py-3 my-2 md:flex content-center bg-slate-100 rounded-md'>
                <div className='py-2 flex-auto'><button className='bg-starknet text-white px-4 py-2 rounded-md' onClick={handle_quick_calculation}> <BoltIcon className='h-5 w-5 inline mr-2' /> Quick calculation</button> </div>
                <div className='py-2 flex-auto'><button className='bg-starknet-2 text-white px-4 py-2 rounded-md' onClick={handle_save_on_starknet}> <CircleStackIcon className='h-5 w-5 inline mr-2' /> Save on starknet</button></div>
            </div>
        </div>

    );
}