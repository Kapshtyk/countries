import React from 'react'

const About = () => {
  return (
    <div>
      <h1>About this applicaton</h1>
      <p>
        This is a simple React application made in Business College Helsinki
        lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </p>
      <p>
        The tech stack is: React, TypeScript, TailwindCSS, Zod, React Router,
        Redux Toolkit, RTK Query, Firebase
      </p>
    </div>
  )
}

export default About
