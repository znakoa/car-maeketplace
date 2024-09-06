/* eslint-disable react/prop-types */
import {storage} from './../../../configs/firebaseConfig.js'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {useEffect} from 'react'
import {useState} from 'react'
import {IoIosCloseCircle} from 'react-icons/io'
import {db} from './../../../configs'
import {CarImage} from './../../../configs/schema.js'
import {eq} from "drizzle-orm";

function Uploadimages({triggerUploadImages, setLoader, carInfo, mode}) {
    const [selectFileList, setSelectFileList] = useState([])
    const [EditCarImageList, setEditCarImageList] = useState([])

    useEffect(() => {
        console.log(carInfo)
        if (mode === 'edit') {
            setEditCarImageList([])
            carInfo?.images?.forEach((image) => {
                setEditCarImageList((prev) => [...prev, image])
            })

        }
    }, [carInfo]);

    useEffect(() => {
        if (triggerUploadImages) {
            UploadImagesToServer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerUploadImages])
    const onFileSelected = (event) => {
        const files = event.target.files
        for (let i = 0; i < files?.length; i++) {
            const file = files[i]
            setSelectFileList((prev) => [...prev, file])
        }
    }
    const onImageRemove = (file) => {
        const result = selectFileList.filter((item) => item !== file)
        setSelectFileList(result)
    }

    const onImageRemoveFromDB = async (image) => {
        const result =await db.delete(CarImage).where(eq(CarImage.id, image.id)).returning({id: CarImage.id})
        const imageList = EditCarImageList.filter((item) => item !== image)
        setEditCarImageList(imageList)
    }

    const UploadImagesToServer = () => {
        setLoader(true)
        selectFileList.forEach((file) => {
            const fileName = Date.now() + '.jpeg'
            const storageRef = ref(storage, 'car-marketplace/' + fileName)
            const metaData = {
                contentType: 'image/jpeg',
            }
            uploadBytes(storageRef, file, metaData).then(() => {
                console.log('Uploaded File')

                getDownloadURL(storageRef).then(async (url) => {
                    console.log(url)
                    await db.insert(CarImage).values({
                        imageUrl: url,
                        carListingId: triggerUploadImages,
                    })
                    setLoader(false)
                })
            })
        })
    }

    return (
        <div>
            <h2 className="font-medium text-xl my-6">Upload Car images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

                {
                    mode === 'edit' &&
                    EditCarImageList.map((image, index) => (
                        <div key={index}>
                            <IoIosCloseCircle
                                className="absolute m-2 text-lg text-white"
                                onClick={() => onImageRemoveFromDB(image)}
                            />
                            <img
                                src={image?.imageUrl}
                                alt=""
                                className="w-full h-[126px] object-cover rounded-xl"
                            />
                        </div>
                    ))
                }
                {selectFileList.map((file, index) => (
                    <div key={index}>
                        <IoIosCloseCircle
                            className="absolute m-2 text-lg text-white"
                            onClick={() => onImageRemove(file)}
                        />
                        <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="w-full h-[126px] object-cover rounded-xl"
                        />
                    </div>
                ))}
                <label htmlFor="upload-images">
                    <div
                        className="border rounded-xl border-dotted border-primary bg-blue-100 p-12 cursor-pointer hover:shadow-md">
                        <h2 className="text-lg text-center text-primary"> +</h2>
                    </div>
                </label>
                <input
                    type="file"
                    multiple={true}
                    id="upload-images"
                    onChange={onFileSelected}
                    className="opacity-0"
                />
            </div>
        </div>
    )
}

export default Uploadimages
