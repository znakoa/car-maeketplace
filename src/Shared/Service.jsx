import axios from "axios";

const application_id=import.meta.env.VITE_SEARCH_API_KEY
const api_token=import.meta.env.VITE_SEARCH_APT_TOKEN

const FormatResult = (result) => {
    const resultMap = {}; // 使用对象来存储中间结果

    result.forEach((item) => {
        const listingId = item.carListing?.id; // 获取 listingId

        if (!resultMap[listingId]) {
            // 如果结果中没有此 listingId，初始化它
            resultMap[listingId] = {
                ...item.carListing, // 展开 carListing 对象中的所有属性
                images: [], // 初始化 images 数组
            };
        }

        if (item.carImage) {
            // 将图像添加到对应的 listingId 的 images 数组中
            resultMap[listingId].images.push(item.carImage);
        }
    });

    // 使用 Object.values 将结果映射为数组
    return Object.values(resultMap);
};


const CreateSendBirdUser=(userId,nickName,profileUrl) => {

    return axios.post(`https://api-${application_id}.sendbird.com/v3/users`, {
        user_id:userId,
        nickname:nickName,
        profile_url:profileUrl,
        issue_access_token:false
    },{
        headers: {
            'Content-Type': 'application/json',
            'Api-Token': api_token
        }
    })
}

const CreateSendBirdChannel=(users,title) => {
    return axios.post(`https://api-${application_id}.sendbird.com/v3/group_channels`, {
        user_ids:users,
        is_distinct:true,
        name:title,
        operator_ids:[users[0]]
    },{
        headers: {
            'Content-Type': 'application/json',
            'Api-Token': api_token
        }
    })
}

export  default  {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
}