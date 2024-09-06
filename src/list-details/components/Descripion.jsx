function Descripion({carDetail}) {
    return (
        <div>
            {
                carDetail?.listingDescription ? (
                        <div className={'p-10 rounded-xl bg-white shadow-md mt-7 border'}>
                            <h2 className={'my-2 font-medium text-2xl'}>Descripion</h2>
                            <p>
                                {carDetail?.listingDescription}
                            </p>
                        </div>
                    ) :
                    <div className={'w-full rounded-xl h-[250px] bg-slate-200 animate-pulse'}></div>
            }

        </div>
    )
}

export default Descripion
