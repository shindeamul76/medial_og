<div align="center">

  <img src="/assets/medial-logo.jpg"  width="200" height="200" alt="Medial-logo" />

  <h1>Dynamic Post Page with OG Image Generation</h1>

  <p>
    <strong>Open Graph Image</strong>
  </p>

  <p>
    <a href="https://github.com/shindeamul76/"><img alt="Build Status" src="https://img.shields.io/badge/github-profile-blue" /></a>
    <a href="#"><img alt="Build Status" src="https://img.shields.io/badge/Mel%20%20Dial-8A2BE2" /></a>
  </p>
</div>


### Note

- Generate Dynamic Open Graph Images.
- Frontend in React and Banckend in Nodejs express.
- All services locally
- deployed 
```bash
        https://medial-og.netlify.app/
```

## Built With
- Nodejs
- Express
- React
- Vite
- Typescript
- zod
- Open Graph protocol
- shadcn

## Getting Started

```bash
    To get a local copy up and running, please follow these simple steps.
```

# Prerequisites

Here is what you need to be able to run Medial_OG

- Node.js (Version: >=18.x)
- npm (recommended)

### Development

## setup


1. Clone the repo into a public GitHub repository (or fork https://github.com/shindeamul76/medial_og.git).


         https://github.com/shindeamul76/medial_og.git

2. Go to the project folder

        cd medial_og

3. Go to the project folder To run the client

        cd client_og

4. Go to the project folder To run the Server

        cd server_og

5. Install packages with NPM on both

         npm install

6. Set up your .env file
  
         - Duplicate .env.example to .env  and add the values

7. Quick start with npm 

          - npm run start:dev   on Banckend
          - npm run dev         on Frontend


##  How It works 

# Flow Summary
```bash
l. User Interanction
    - User inputs title and content, uploads an image if needed.
    - Clicks the submit button to generate an OG image.
2. Frontend Actions:
   -  Image is uploaded to the backend using the cloudnary.
   -  Form data is sent to the backend for OG image generation.
   -  Displays toast notifications based on the success or failure of operations.
3. Backend Actions:
    - Handles image upload and storage.
    - Generates the OG image using canvas and returns its URL.
4. Result Display:
    - The frontend updates with the OG image URL and displays the with redit post design with og url .
```
