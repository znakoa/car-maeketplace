import React from 'react'
import {Button} from "@/components/ui/button.jsx";
import Service from "@/Shared/Service.jsx";
import {useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";


function OwnersDetails({carDetail}) {
    const {user} = useUser()
    const navigation = useNavigate()
    const OnMessageButtonClick = async () => {
        const userId=user.primaryEmailAddress.emailAddress.split('@')[0];
        const ownerUserId=carDetail?.createdBy.split('@')[0];
        //Create Current User ID
        try{
            await Service.CreateSendBirdUser(userId,user?.fullName,user?.imageUrl)
                .then(resp=>{
                    console.log(resp);
                })
        }catch(e){}
        // Owner User Id
        try{
            await Service.CreateSendBirdUser(ownerUserId,carDetail?.userName,carDetail?.userImageUrl)
                .then(resp=>{
                    console.log(resp);
                })
        }catch(e){}
        // Create Channel
        try{
            await Service.CreateSendBirdChannel([userId,ownerUserId],carDetail?.listingTitle)
                .then(resp=>{
                    console.log(resp);
                    console.log("Chaneel Created");
                    navigation('/profile');
                })
        }catch(e){}

    }


    return (
        <div className={'p-10 rounded-xl border shadow-md mt-7'}>
            <h2 className='font-medium text-2xl mb-3'>Owner/ Deals</h2>
            <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full'/>
            <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
            <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>


            <Button className={'w-full mt-6'} size={'lg'} onClick={OnMessageButtonClick}> Message Owner </Button>
        </div>
    )
}

export default OwnersDetails
