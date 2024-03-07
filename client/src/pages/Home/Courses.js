import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { courses } from '../../resources/courses'

function Courses() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  return (
    <div>
        <SectionTitle title="Courses"/>
        <div className='flex py-10 gap-10 sm:flex-col'>
                <div className='flex flex-col gap-10 border-l-2 border-[#1335e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {courses.map((course, index) => (
                        <div onClick={() => { setSelectedItemIndex(index) }} className='cursor-pointer'>
                            <h1 className={`text-xl px-10 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>{course.title}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-10 sm:flex-col'>

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl'>{courses[selectedItemIndex].title}</h1>
                        <p className='text-white '>{courses[selectedItemIndex].description}</p>
                    </div>
                    <img src={courses[selectedItemIndex].image} alt='' className='h-52 w-80'/>
                </div>

            </div>
    </div>
  )
}

export default Courses