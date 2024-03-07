import React from 'react'
import SectionTitle from '../../components/SectionTitle'
function Contact() {
    const user = {
        name: "shailesh Pandey",
        email: "shailesh84129@gmail.com",
        mobile: "8412907451",
        country: "INDIA",
    }
    return (
        <div>
            <SectionTitle title="Say Hello" />
            <div className='flex sm:flex-col items-center justify-between'>
               <div className='flex flex-col gap-1'>
               <p className='text-tertiary '>{"{"}</p>
                {Object.keys(user).map((key) => (
                    <p className='ml-5 '>
                        <span className='text-tertiary'>{key}: </span><spn className='text-white'>{user[key]}</spn>
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