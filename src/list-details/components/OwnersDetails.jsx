import React from 'react'
import {Button} from "@/components/ui/button.jsx";
import Service from "@/Shared/Service.jsx";
import {useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";


function OwnersDetails({carDetail}) {
    const {user} = useUser()
    const navigation = useNavigate()
    const OnMessageButtonClick = async () => {

        try {
            const userId = user?.primaryEmailAddress?.emailAddress.split('@')[0]
            console.log(userId)
            await Service.CreateSendBirdUser({
                user_id: userId,
                nickname: user?.fullName,
                profileUrl: user?.imageUrl,
                issue_access_token: false
            }).then((resp) => {
                console.log(resp)
            })
        } catch (error) {
            navigation('/profile')
            console.log(error)

        }

    }


    return (
        <div className={'p-10 rounded-xl border shadow-md mt-7'}>
            <h2> Owners/Details</h2>
            <h2>{carDetail?.createdBy}</h2>
            <h2>{carDetail?.createdBy}</h2>
            <Button className={'w-full mt-6'} size={'lg'} onClick={OnMessageButtonClick}> Message Owner </Button>
        </div>
    )
}

export default OwnersDetails
