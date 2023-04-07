import { BoltIcon, CircleStackIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Values() {
    const input_css_class = "border mx-2 px-2 py-2 rounded-md font-bold text-center focus:outline-starknet w-24 md:w-auto";

    const [freq, setFreq] = useState([{ id: 1, value: 0, trans: null }]);
    const handle_add_freq = () => {
        if(freq.length >= 5) return alert("You can't add more than 5 frequencies");
        setFreq([
            ...freq,
            {
                id: freq.length + 1,
                value: 0,
                trans : null
            }
        ]);
    }

    const handle_freq_change = (e, index) => {
        const value = e.target.value;
        if(value < 0) return alert("Frequency can't be negative");
        if(value > 100000) return alert("Frequency can't be more than 100000");
        const new_freq = [...freq];
        new_freq[index].value = value;
        setFreq(new_freq);
    }

    return (
        <div className='px-2'>
            <table className="divide-y w-full">
                <thead>
                    <tr><th className="py-2">Frequency</th><th className="py-2">Value</th><th className="py-2">Transform</th></tr>
                </thead>
                <tbody>
                {freq.map((item, index) => (
                    <tr key={item.id}>
                        <td className="text-left py-2">Freq {item.id}</td>
                        <td className=" py-2"><input type="text" onChange={(e) => handle_freq_change(e, index)} value={item.value} className={input_css_class} /></td>
                        <td className=" py-2">{item.trans ? item.transs : '...'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='py-2'>
                Add new frequency <button onClick={handle_add_freq} className='bg-slate-200 hover:bg-slate-300 text-starknet text-white px-2 py-2 pr-4 rounded-md'> <PlusIcon className='h-5 w-5 inline mr-1' /> Add </button>
            </div>
            <div className='text-center py-3 my-2 md:flex content-center bg-slate-100 rounded-md'>
                <div className='py-2 flex-auto'><button className='bg-starknet text-white px-4 py-2 rounded-md'> <BoltIcon className='h-5 w-5 inline mr-2' /> Quick calculation</button> </div>
                <div className='py-2 flex-auto'><button className='bg-starknet-2 text-white px-4 py-2 rounded-md'> <CircleStackIcon className='h-5 w-5 inline mr-2' /> Save on starknet</button></div>
            </div>
        </div>

    );
}