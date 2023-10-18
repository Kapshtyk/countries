import React from 'react'
import { LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

const Home = () => {
  return (
    <>
      <article className="p-2">
        <h1>Countries application</h1>
        <section>
          <h2>About Me</h2>
          <p>
            Hello! My name is Arseniiy and I am currently studing in Busines College Helsinki. My goal is to create amazing web applications and enrich my professional experience. I'm ready to embark on a career in software development.
          </p>
          <p>
            My skills encompass both frontend and backend development. I have experience working with various technologies and programming languages, such as JavaScript, Python, and PHP.
          </p>
          <p>
            You can find my profiles on LinkedIn and GitHub for more details about my experience and the projects I've worked on:
            <ul>
              <li>
              <a className="border my-2 rounded-md p-1 w-44 flex gap-2 justify-between items-center hover:shadow-md transition-all duration-300 ease-in-out" href="https://www.linkedin.com/in/kapshtyk/" target="_blank" rel="noopener noreferrer">My LinkedIn Profile<LinkedInLogoIcon className="inline-block" /></a>
              </li>
              <li>
              <a className="border rounded-md my-2 p-1 w-44 flex gap-2 justify-between items-center hover:shadow-md transition-all duration-300 ease-in-out" href="https://github.com/Kapshtyk" target="_blank" rel="noopener noreferrer">My GitHub Profile<GitHubLogoIcon className="inline-block" /></a>
              </li>
            </ul>
          </p>
        </section>
        <section>
          <h2 className="mt-4">About the project</h2>
          <p>
            Countries is a simple React application created as part of
            your Business College Helsinki lessons. It allows you to explore
            information about countries from around the world.
          </p>
          <h3>Description</h3>
          <p>
            Countries is a web application that provides details about
            different countries. You can view information such as populations, flags,
            currencies, and more.
          </p>
          <h3>Technologies and Services</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 auto-rows-max font-light">
            <li>Firebase</li>
            <li>Google Maps</li>
            <li>OpenWeatherMap API</li>
            <li>React</li>
            <li>Recharts</li>
            <li>Redux Toolkit</li>
            <li>REST Countries API</li>
            <li>RTK Query</li>
            <li>TypeScript</li>
            <li>Zod</li>
          </ul>
          <h3>Usage</h3>
          <p>
            You can use this project to explore information about different countries, view charts and diagrams, and even manage your favorite countries.
          </p>
        </section>
      </article>
    </>
  );
};

export default Home
