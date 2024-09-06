import FakeData from '@/Shared/FakeData'
import CarItem from './CarItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import {useEffect, useState} from "react";
import {db} from "../../configs/index.js";
import {CarImage, CarListing} from "../../configs/schema.js";
import {desc, eq} from "drizzle-orm";
import Service from "@/Shared/Service.jsx";

function MostSearchedCar() {

    const [carList, setCarList] = useState([])
    const GetPopularCarListing = async () => {
        const result = await db.select().from(CarListing).leftJoin(CarImage, eq(CarListing.id, CarImage.carListingId))
            .orderBy(desc(CarListing.id))
            .limit(10)
        const finalResult = Service.FormatResult(result)

        setCarList(finalResult)

    }
    useEffect(() => {
        GetPopularCarListing()
    }, []);

    return (
        <div className="mx-24">
            <h2 className="font-bold text-3xl text-center mt-16 mb-7">
                Most Searched Car
            </h2>
            <Carousel>
                <CarouselContent>
                    {carList.map((car, index) => (
                        <CarouselItem key={index} className="basis-1/4">
                            <CarItem car={car}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default MostSearchedCar
