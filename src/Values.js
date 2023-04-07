import { BoltIcon, CircleStackIcon } from '@heroicons/react/24/outline';

export default function Values() {
    const input_css_class = "border mx-2 px-2 py-2 rounded-md font-bold text-center focus:outline-starknet w-24 md:w-auto";

    return (
        <div className='px-2'>
            <table className="divide-y w-full">
                <tr><th className="py-2">Frequency</th><th className="py-2">Value</th><th className="py-2">Transform</th></tr>
                <tr><td className="text-left py-2">Freq 1</td><td className=" py-2"><input type="text" className={input_css_class} /></td><td className=" py-2">45</td></tr>
                <tr><td className="text-left py-2">Freq 2</td><td className=" py-2"><input type="text" className={input_css_class} /></td><td className=" py-2">45</td></tr>
                <tr><td className="text-left py-2">Freq 3</td><td className=" py-2"><input type="text" className={input_css_class} /></td><td className=" py-2">45</td></tr>
                <tr><td className="text-left py-2">Freq 4</td><td className=" py-2"><input type="text" className={input_css_class} /></td><td className=" py-2">45</td></tr>
                <tr><td className="text-left py-2">Freq 5</td><td className=" py-2"><input type="text" className={input_css_class} /></td><td className=" py-2">45</td></tr>
                <tr>
                    <td >

                    </td>
                </tr>
            </table>
            <div className='text-center py-3 my-2 md:flex content-center bg-slate-100 rounded-md'>
                <div className='py-2 flex-auto'><button className='bg-starknet text-white px-4 py-2 rounded-md'> <BoltIcon className='h-5 w-5 inline mr-2' /> Quick calculation</button> </div>
                <div className='py-2 flex-auto'><button className='bg-starknet-2 text-white px-4 py-2 rounded-md'> <CircleStackIcon className='h-5 w-5 inline mr-2' /> Save on starknet</button></div>
            </div>
        </div>

    );
}