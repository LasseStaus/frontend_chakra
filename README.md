<a id="top"></a>

# Exam-project - VærkstedetCPH Frontend 


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-description">Project Description</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#connect-to-backend">Connect to our backend repo</a></li>
  </ol>
</details>


## Project Description
This repo is the frontend part of an exam project at KEA, developed for CPH-Værkstedet. 

It is a prototype of a system where users can create an account and purchase tickets that can be spend in a booking system. 


## Built with

The technologies used to built this prototype are

* [React.js](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Chakra UI](https://chakra-ui.com/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy of the project up and running, follow these steps


### Prerequisites

This project requires [Node.js](https://nodejs.org/en/) to run

> If you do not have Node.js installed, install it from their [website.](https://nodejs.org/en/)



This project uses Yarn as a package manage. To run the project smoothly, we recommend using yarn instead of npm. 

If you do not have yarn installed, we recommend installing yarn through NPM

> If you do not have npm installed, we recommend following [this guide.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


* Install yarn globally through npm
    ```sh
    npm install -g yarn
    ```
* Check the version of yarn after installation
    ```sh
    yarn --version
    ```




### Installation

1. Clone the repository through the terminal
     ```sh
     git clone https://github.com/LasseStaus/frontend_chakra.git
     ```
   Alternatively you can download the zip file, and open it in your IDE. 
   
2. Install packages used in the project
     ```sh
     yarn install
     ``` 
3. Copy the contents of `.env.example` into a `.env` file and either specify details or use the default settings
   
4. Run the application in production
     ```sh
     yarn run build
     ```
      ```sh
     yarn start
     ```

5. Alternatively, run the application in development mode
     ```sh
     yarn start:dev
     ```
   
<p align="right"><a href="#top">back to top</a></p>



### Connecting to our backend

To create and connect with an instance of our backend, please go to the [backend repository](https://github.com/LasseStaus/CPHworkshop_backend) and follow the steps in the Readme



