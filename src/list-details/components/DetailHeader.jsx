import {HiCog} from "react-icons/hi";
import {HiCubeTransparent} from "react-icons/hi";
import {HiCurrencyYen} from "react-icons/hi";

const DetailHeader = ({carDetail}) => {
    return (
        <div>
            {
                carDetail?.listingTitle ? (
                    <div>
                        <h2 className={'text-3xl font-bold'}>
                            {carDetail?.listingTitle}
                        </h2>
                        <p className={'text-sm'}> {carDetail?.tagline}</p>

                        <div className={'flex gap-2 mt-3'}>
                            <div className={'flex items-center bg-blue-50 rounded-full p-2 px-3'}>
                                <HiCog className={'h-5  w-5 text-primary'}/>
                                <h2 className={'text-sm text-primary'}>{carDetail?.mileage}</h2>
                            </div>
                            <div className={'flex items-center bg-blue-50 rounded-full p-2 px-3'}>
                                <HiCubeTransparent className={'h-5 w-5 text-primary mr-2'}/>
                                <h2 className={'text-sm text-primary'}>{carDetail?.year}</h2>
                            </div>
                            <div className={'flex items-center bg-blue-50 rounded-full p-2 px-3'}>
                                <HiCurrencyYen className={'h-5  w-5 text-primary'}/>
                                <h2 className={'text-sm text-primary'}>{carDetail?.model}</h2>
                            </div>
                        </div>
                    </div>
                ) : <div className={'w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'}></div>
            }

        </div>
    )
}

export default DetailHeader