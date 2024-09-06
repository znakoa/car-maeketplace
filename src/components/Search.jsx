import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {Separator} from './ui/separator'
import {CiSearch} from 'react-icons/ci'
import Data from '@/Shared/Data'
import {useState} from "react";
import {Link} from "react-router-dom";

function Search() {

    const [caes, setCaes] = useState()
    const [maker, setMaker] = useState()
    const [price, setPrice] = useState()

    return (
        <div
            className="p-2 md:p-5 bg-white rounded-sm md:rounded-full flex-col items-center md:flex md:flex-row gap-10 px-5 w-[60%] ">

            <Select onValueChange={(value) => setCaes(value)} className='hidden'>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className="hidden md:block"/>

            <Select onValueChange={(value) => setMaker(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Car Makes"/>
                </SelectTrigger>
                <SelectContent>
                    {Data.CarMakes.map((maker, index) => (
                        <SelectItem value={maker.name} key={index}>
                            {maker.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className="hidden md:block"/>

            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing"/>
                </SelectTrigger>
                <SelectContent>
                    {Data.Pricing.map((maker, index) => (
                        <SelectItem value={maker.amount} key={index}>
                            ${maker.amount}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Link to={`/search?caes=${caes}&maker=${maker}&price=${price}`}>
                <CiSearch
                    className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer"/>
            </Link>

        </div>
    )
}

export default Search
