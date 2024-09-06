import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {db} from "../../../configs/index.js";
import {CarImage, CarListing} from "../../../configs/schema.js";
import {desc, eq} from "drizzle-orm";
import {useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem.jsx";
import { FaTrashAlt } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function MyListing() {

    const {user} = useUser()
    const [carList, setCarList] = useState([])

    const GetUserCarListing = async () => {
        const result = await db.select().from(CarListing).leftJoin(CarImage,eq(CarListing.id, CarImage.carListingId))
            .where(eq(CarListing.createdBy,user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(CarListing.id))

      const finalResult =  Service.FormatResult(result)

        setCarList(finalResult)

    }
    // 删除方法
    const DeleteCarListitem = async (id) => {
        await db.delete(CarImage).where(eq(CarImage.carListingId, id))
        await db.delete(CarListing).where(eq(CarListing.id, id))

        GetUserCarListing()

    }
    useEffect(() => {
        user && GetUserCarListing()
    }, [user]);

  return (
      <div className="mt-6">
          <div className="flex justify-between items-center">
              <h2 className="font-bold text-4xl">MY Listing</h2>
              <Link to={'/add-listing'}>
                  <Button>+ Add New Listing</Button>
              </Link>

          </div>
          <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
              {
                  carList.map((item) => (
                      <div key={item.id}>
                          <CarItem car={item}/>
                          <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3'>
                              <Link
                                  to={`/add-listing?mode=edit&id=${item?.id}`}
                                  className={'w-full'}
                              >
                                  <Button variant="outline" className='w-full'>Edit</Button>
                              </Link>


                              <AlertDialog>
                                  <AlertDialogTrigger>
                                      <Button variant='destructive'  ><FaTrashAlt /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                      <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                              This action cannot be undone. This will permanently delete your account
                                              and remove your data from our servers.
                                          </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => DeleteCarListitem(item?.id)}>Continue</AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                          </div>
                      </div>
                  ))
              }
          </div>
      </div>
  )
}

export default MyListing
