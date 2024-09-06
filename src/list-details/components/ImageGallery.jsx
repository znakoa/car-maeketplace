
function ImageGallery({carDetail}) {
  console.log(carDetail)
  return <div>

        <img src={carDetail?.images[0].imageUrl} alt='' className={'w-full h-[500px] rounded-xl object-cover'}/>


  </div>
}

export default ImageGallery
