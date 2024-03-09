import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux";
function Contact() {
    const { portfolioData } = useSelector((state) => state.root);
    const {contacts } = portfolioData;

    return (
        <div>
            <SectionTitle title="Say Hello" />
            <div className='flex sm:flex-col items-center justify-between'>
               <div className='flex flex-col '>
               <p className='text-tertiary '>{"{"}</p>
                {Object.keys(contacts).map(
                    (key) => key!=="_id" && (
                    <p className='ml-5 '>
                        <span className='text-tertiary'>{key}: </span><spn className='text-white'>{contacts[key]}</spn>
                    </p>
                ))}
                <p className='text-tertiary '>{"}"}</p>
               </div>
               <div className='h-[200px]'>
              <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRr8a8GeCavDugoMlyAkViGR9Czgm5PXu80OI0JrIKZQ&s' alt='contact image '/>
               </div>
            </div>
        </div>
    )
}

export default Contact