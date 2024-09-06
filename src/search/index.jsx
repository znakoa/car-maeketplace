import {useSearchParams} from "react-router-dom";
import {db} from "../../configs/index.js";
import {CarImage, CarListing} from "../../configs/schema.js";
import {eq} from "drizzle-orm";
import Service from "@/Shared/Service.jsx";
import {useEffect, useState} from "react";
import Header from "@/components/Header.jsx";
import Search from "@/components/Search.jsx";
import CarItem from "@/components/CarItem.jsx";

function SarchByOptions() {

    const [searchParam] = useSearchParams()
    const [carList, setCarList] = useState([])
    const cars= searchParam.get('caes')
    const maker = searchParam.get('maker')
    const price = searchParam.get('price')
    useEffect(() => {
        GetCarList()
    }, [cars, maker, price]);
    const GetCarList = async () => {

        const result = await db.select().from(CarListing).innerJoin(CarImage, eq(CarListing.id, CarImage.carListingId))
            .where(cars!= undefined &&eq(CarListing.tagline, cars))
            .where(maker!= undefined &&eq(CarListing.mileage, maker))
            .where(price!= undefined &&eq(CarListing.price, price))

        const response = Service.FormatResult(result)
        setCarList(response)
        console.log(response,'www')

    }

    return (
        <div>
            <Header/>

            <div className={'p-16 bg-black flex justify-center'}>
                <Search/>
            </div>
            <div className={'p-10 md:p-20'}>
                <h2 className={'text-4xl font-bold text-center '}> Search Result</h2>

                {/*List of Carlist*/}
                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-7'}>
                    {carList?.length > 0 ? carList?.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item}/>
                        </div>
                    )) : ['1', '2', '3', '4'].map((_item, index) => (
                        <div key={index}
                             className={'h-[370px]  rounded-xl bg-slate-200 animate-pulse flex justify-center items-center'}>
                            No Data
                        </div>
                    ))
                    }
                </div>

            </div>

        </div>
    )
}

export default SarchByOptions