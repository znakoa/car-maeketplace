import Header from '@/components/Header'
import carDetails from '../Shared/carDetails.json'
import features from '../Shared/features.json'
import InputField from './components/InputField'
import SelectField from './components/SelectField'
import TextAreaField from './components/TextAreaField'
import { Separator } from '@/components/ui/separator'
import { TbLoader2 } from 'react-icons/tb'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { db } from './../../configs'
import { CarImage, CarListing } from './../../configs/schema'

import {  useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import Uploadimages from '@/add-listing/components/UploadImages.jsx'

import { toast } from 'sonner'

function AddListing() {
  const [formData, setFormData] = useState([])
  const [featuresData, setFeaturesData] = useState({})
  const [searchParams] = useSearchParams()
  const [triggerUploadImages, setTriggerUploadImages] = useState()
  const [loader, setLoader] = useState(false)
  const [carInfo, setCarInfo] = useState({})
  // const naviagte = useNavigate()
  const { user } = useUser()

  const mode = searchParams.get('mode')
  const recordid = searchParams.get('id')

  useEffect(() => {
    if (mode === 'edit') {
      GetListingDetails()
    }
  }, [])

  const GetListingDetails = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImage, eq(CarListing.id, CarImage.carListingId))
      .where(eq(CarListing.id, recordid))

    const finalResult = Service.FormatResult(result)
    setCarInfo(finalResult[0])
    setFormData(finalResult[0])
    setFeaturesData(finalResult[0]?.features)
  }

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleCheckedChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    setLoader(true)
    e.preventDefault()

    toast('Please Wait...')

    if (mode === 'edit') {
      try {
        const result = await db
          .update(CarListing)
          .set({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
          .where(eq(CarListing.id, recordid))
          .returning({ id: CarListing.id })

        if (result) {
          console.log('Data Saved')
          setTriggerUploadImages(result[0]?.id)
          setLoader(false)
        
        }
      } catch (error) {
        setLoader(false)
        toast('Please fill all required fields')
        console.log('Error', error)
      }
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          })
          .returning({ id: CarListing.id })
        if (result) {
          console.log('Data Saved')
          console.log(result)
          setTriggerUploadImages(result[0]?.id)
          setLoader(false)
          // naviagte('/profile')
        }
      } catch (error) {
        setLoader(false)
        toast('Please fill all required fields')
        console.log('Error', error)
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* Car Details  */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm">
                    {item?.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === 'text' || item.fieldType === 'number' ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === 'dropdown' ? (
                    <SelectField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === 'textarea' ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          {/* features List  */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleCheckedChange(item.name, value)
                    }
                    checked={featuresData[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Car Images  */}
          <Separator className="my-6" />
          <Uploadimages
            triggerUploadImages={triggerUploadImages}
            setLoader={(v) => setLoader(v)}
            carInfo={carInfo}
            mode={mode}
          />
          <div className="flex mt-10 justify-end">
            <Button
              disabled={loader}
              type="button"
              onClick={(e) => onSubmit(e)}>
              {!loader ? (
                'Submit'
              ) : (
                <TbLoader2 className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddListing
