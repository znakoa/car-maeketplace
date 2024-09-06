import { MdOutlineLocalOffer } from "react-icons/md";
import {Button} from "@/components/ui/button.jsx";

function Pricing({carDetail}) {
  return (<div className={'p-10 rounded-xl border shadow-md'}>
    <h2 className={''}>Our Price</h2>
    <h2 className={'font-bold text-4xl'}>${carDetail?.price}</h2>

    <Button className={'w-full mt-7'} size={'lg'}><MdOutlineLocalOffer className={'text-lg mr-2'} /> Make an Offer Price</Button>
  </div>)
}

export default Pricing
