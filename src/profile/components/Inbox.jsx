import {App as SendbirdApp, SendBirdProvider} from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import {useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";

function Inbox() {

    const {user} = useUser()
    const [userId, setUserId] = useState('')
    const [channelUrl, setChannelUrl] = useState('')

    useEffect(() => {
        if (user) {
            const id = user?.primaryEmailAddress?.emailAddress.split('@')[0]
            setUserId(id)
        }

    }, [user]);

    return (
        <div>
            <div className={'w-full h-[80vh]'}>

                <SendBirdProvider appId={import.meta.env.VITE_SEARCH_API_KEY}
                                  userId={userId} nickname={user?.fullName}
                                  profileUrl={user?.imageUrl}
                                  allowProfileEdit={true}
                >
                    <div className={'grid grid-cols-1 gap-5 md:grid-cols-3 h-full'}>
                        <div className={'p-5 border shadow-lg'}>
                            <GroupChannelList  onChannelSelect={(channel) => {
                                setChannelUrl(channel?.url)
                            }}
                           channelListQueryParams={{
                               includeEmpty: true
                           }}/>
                        </div>
                        <div className={'md:col-span-2 shadow-lg'}>
                            <GroupChannel channelUrl={channelUrl} />
                        </div>
                    </div>



                </SendBirdProvider>

                {/*<SendbirdApp*/}
                {/*    // You can find your Sendbird application ID on the Sendbird dashboard.*/}
                {/*    appId={import.meta.env.VITE_SEARCH_API_KEY}*/}
                {/*    // Specify the user ID you've created on the dashboard.*/}
                {/*    // Or you can create a user by specifying a unique userId.*/}
                {/*    userId={'nakoa'}*/}
                {/*/>*/}
            </div>
        </div>
    )
}

export default Inbox
