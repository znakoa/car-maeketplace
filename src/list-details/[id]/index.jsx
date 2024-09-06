import Header from "@/components/Header.jsx";
import DetailHeader from "@/list-details/components/DetailHeader.jsx";
import {useParams} from "react-router-dom";
import {CarImage, CarListing} from "../../../configs/schema.js";
import {eq} from "drizzle-orm";
import Service from "@/Shared/Service.jsx";
import {db} from "../../../configs/index.js";
import {useEffect, useState} from "react";
import ImageGallery from "@/list-details/components/ImageGallery.jsx";
import Descripion from "@/list-details/components/Descripion.jsx";
import FeaturesList from "@/list-details/components/FeaturesList.jsx";
import Pricing from "@/list-details/components/Pricing.jsx";
import Specifcaion from "@/list-details/components/Specifcaion.jsx";
import Footer from "@/components/Footer.jsx";
import OwnersDetails from "@/list-details/components/OwnersDetails.jsx";
import FinanacialCarculator from "@/list-details/components/FinanacialCarculator.jsx";
import MostSearchedCar from "@/components/MostSearchedCar.jsx";

function ListDetails() {
    const {id} = useParams()
    const [carDetail, setCarDetail] = useState()

    useEffect(() => {
        GetCarDetail()
    }, [id]);
    const GetCarDetail = async () => {

        const result = await db.select().from(CarListing).innerJoin(CarImage, eq(CarListing.id, CarImage.carListingId)).where(eq(CarListing.id, id))

        const response = Service.FormatResult(result)
        setCarDetail(response[0])
    }

    return (
        <div>
            <Header/>

            <div className={'p-10 md:px-20 '}>
                <DetailHeader carDetail={carDetail}/>

                <div className={'grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'}>
                    {/*left*/}
                    <div className={'md:col-span-2'}>
                        <ImageGallery carDetail={carDetail}/>
                        <Descripion carDetail={carDetail}/>
                        <FeaturesList features={carDetail?.features ?? {}}/>

                        <FinanacialCarculator/>
                    </div>
                    {/*right*/}
                    <div>
                        <Pricing carDetail={carDetail}/>

                        <Specifcaion carDetail={carDetail}/>

                        <OwnersDetails carDetail={carDetail}/>
                    </div>


                </div>
                <MostSearchedCar/>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default ListDetails