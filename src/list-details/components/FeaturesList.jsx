import { FaCheck } from "react-icons/fa6";


function FeaturesList({features}) {
  return (<div className={'p-10 mt-7 rounded-xl border shadow-md'}>
    <div >
      <h2 className={'font-medium text-2xl'}> Features</h2>
      <div className={'grid grid-cols-2 md:grid-cols-3 mt-3 lg:grid-cols-4 gap-5'}>
        {
            features&&Object.entries(features).map(([feature], index) => (
              <div key={index} className={'flex gap-2 items-center'}>
                <FaCheck className={'text-lg p-1 rounded-full bg-blue-100 text-primary'}/>
                <h2>{feature}</h2>
              </div>
          ))
        }
      </div>

    </div>
  </div>)
}

export default FeaturesList
