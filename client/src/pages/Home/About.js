import React from 'react'
import SectionTitle from '../../components/SectionTitle'

function About() {
  const skills =[
    "JavaScript",
    "React.JS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Java",
  ];
  return (
    <div>
      <SectionTitle title="About" />
      <div className='flex w-full items-center sm:flex-col'>
        <div className='h-[70vh] w-1/2 sm:w-full'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CrL24eu3VVeAaSvLupEUTnGN4MPX6VrCBuDyW8x1dELiZ6brLfYNxeBXued1JoWwYmA&usqp=CAU' alt='img of developer' />
        </div>
        <div className='flex flex-col gap-5 w-1/2 sm:w-full'>
          <p className='text-white'> My name is Shailesh Pandey, and I recently completed my Post Graduation Diploma
            from the Centre for Development of Advanced Computing (CDAC) in Delhi. Based on my experience as a CDAC
            Certified Java Developer Available for Immediate Joining. Proficient in CPP, Core Java, SQL, HTML5/CSS, Spring Framework,
            JavaScript, React.js, Node.js, Selenium, Manual Testing, and many more,
          </p>
          <p className='text-white'>
            Dear HR,
            I hope you are doing well. I am writing to let you know that I am interested in the REACT JS Developer
            opportunity within your organization. My name is Shailesh Pandey, and I recently completed my Post Graduation Diploma
            from the Centre for Development of Advanced Computing (CDAC) in Delhi. Based on my experience as a CDAC Certified Java
            Developer Available for Immediate Joining. Proficient in CPP, Core Java, SQL, HTML5/CSS, Spring Framework, JavaScript,
            React.js, Node.js, Selenium, Manual Testing, and many more,
          </p>
        </div>
      </div>
      <div className='py-5'>
        <h1 className='text-tertiary text-xl'>
          Here are a few technologies I've been working with recently:
        </h1>
        <div className='flex flex-wrap gap-10 mt-5'>
              {skills.map((skill,index) =>(
              <div className='border border-tertiary py-3 px-10'>
                <h1 className='text-tertiary'>{skill}</h1>
              </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default About