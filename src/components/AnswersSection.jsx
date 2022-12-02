import React from 'react'

const AnswersSection = ({options}) => {
  return (
    <div className='h-[500px] hidden sm:block max-w-xs w-full py-4 px-6 border-fuchsia-400 border-4'>
        <h2 className='text-xl font-bold text-center pb-4 border-b'>Selected Answers</h2>
        <div className='flex flex-col gap-4 py-4'>
            {
                Object.values(options).map((value, key) => {
                    return (
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold text-xl'>#{key+1}</span>
                            <span className='text-2xl'>{value}</span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AnswersSection
