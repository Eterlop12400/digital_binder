# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 6) - Week 3**
* **Eric Terlop**
* **02/20/2022**

<br>

## Thinking in React
This resource is React documentation that focuses on taking a design and splitting it up into components. These steps are broken down into the following steps Break The UI Into A Component Hierarchy, Build A Static Version in React, Identify The Minimal (but complete) Representation Of UI State, Identify Where Your State Should Live, and Add Inverse Data Flow. These steps will be helpful when building out my React components this week.

![Component Hierarchy Example](https://reactjs.org/static/9381f09e609723a8bb6e4ba1a7713b46/90cbd/thinking-in-react-components.png)

Chart Legend:

1. FilterableProductTable (orange): contains the entirety of the example.

2. SearchBar (blue): receives all user input.

3. ProductTable (green): displays and filters the data collection based on user input.

4. ProductCategoryRow (turquoise): displays a heading for each category.

5. ProductRow (red): displays a row for each product.

<br>

* React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. 


* UI and data models tend to adhere to the same information architecture. Separate your UI into components, where each component matches one piece of your data model.


* To build a static version of your app that renders your data model, you’ll want to build components that reuse other components and pass data using props. props are a way of passing data from parent to child. If you’re familiar with the concept of state, don’t use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don’t need it.

<br>

## File Structure in React
This resource is an article that acts as a guide that walks through some of the best practices when it comes to organizing folders. The article then gives some **React recommendations** such as **Grouping By Feature or Route** or **Grouping by File Type**. The article then gives out **Redux recommendations** as **Rails-Style** or **Ducks**. The article concludes by saying that every application is different in some way or another and each project has its own different needs. How we structure our applications should change based on the needs of the project, just like the technologies we choose.

* Deeply nested directories in JavaScript can cause many pain points, such as difficulty writing relative imports and updating those imports. React recommends limiting yourself to a maximum of three to four nested folders deep within a single application.


* Redux’s first recommendation is that your architect your applications similar to how Ruby on Rail’s applications are structured: with a separate folder for actions, constants, reducers, containers, and components.


* Redux Ducks is a system that was proposed by Erik Rasmussen (Github, medium) and has gained popularity as being a viable solution to scaling Redux applications. Ducks propose that instead of keeping actions, action types, and reducers in their own separate files per component, these necessities of Redux should be modularized in a way that they can be self-contained.

* Every application is different in some way or another and each project has its own different needs. How we structure our applications should change based on the needs of the project, just like the technologies we choose.

<br>

## Why ESLint
This resource is an article that focuses on the power of ESLint. It not only keeps code clean but it catches problems before they become bugs. The article dives more into detail about what ESLint is and why it is very useful. The article also mentioned that Airbnb ESLint is among the gold standard for React since it is strict, unforgiving, and thorough. This may seem like a bad thing at first but the overall purpose is to write better code and clean code. The article then goes on to show off the difference between code using ESLint and without and the difference is quite amazing. This will be useful information as to why it's important to include this in my project this month.

* Linting tools like ESLint allow developers to discover problems with their JavaScript code without executing it.


* ESLint is a file in a project repo called .eslintrc with a list of linting rules that runs through the project’s JavaScript code and finds problematic patterns or code that don’t adhere to certain style guidelines set forth by those rules. Then it alerts developers so they can fix the errors.


* The ESLint rules that Airbnb abides by are considered among many as the gold standard for React. They are strict, they are unforgiving and they are thorough.

* ESLint will teach me how to better recognize and refactor React classes into stateless components, how to take advantage of ES6 features like object destructuring, and how defining prop types can prevent unnecessary bugs before they happen. 

<br>

## Why PropTypes
This resource is an article that focuses on the reasons that PropTypes are helpful for a project and the value they provide. The article starts off by laying the groundwork of some important terms and concepts to be aware of such as what an assertion is and the different data types. The article then dives into what type checking is and provides some examples to bring more clarification of how it is working. The article then moves on to PropTypes and how that works, defining what that is and providing some examples and clarifications. The article even expands on what other alternatives to PropTypes such as TypeScript and Flow.

* PropTypes (and the variety of similar static type checking tools) is a valuable asset for building scalable, maintainable software.


* An “assertion” is a forceful, definitive statement, whether it’s about a fact or an opinion. In programming, that statement is that something specific is always true at a certain point in code execution.


* Javascript has six regular types:  string, number, undefined, null, boolean, and symbol. Some have more variety than others. “String” refers to any string, for example, and “number” has a similarly wide scope.

* Type checking involves making runtime assertions about the correct type of data a component requires in order to render properly. It’s independent of build-time type checking.

* In simple terms, PropTypes defines the type of a prop (string, number, undefined, null, boolean, or symbol). It then exports a range of validators that can be used to make sure the data received is correct.

* The biggest advantage of PropTypes is shared with other type checkers. It makes it easy to catch bugs caused by passing data in the wrong data type (like a string in a Boolean space).

* From a business standpoint, PropTypes should be an easy sell. It’s simple to set up, intuitive to use and adds an extra layer of automated quality control.

<br>

## Why ModuleCSS
This resource is an article that focuses on what CSS modules are and why we need them. The article starts off by explaining what CSS modules are and gives some examples. The article then dives into why we should use CSS Modules which the article states with CSS Modules, it’s a guarantee that all the styles for a single component, one lives in one place and two only apply to that component and nothing else. The article then goes over what compose is and how it is used as well. Some key concepts I found helpful and informative in the article are in the bullet points below.

* CSS files in which all class names and animation names are scoped locally by default.


* CSS Modules is not an official spec or an implementation in the browser but rather a process in a build step (with the help of Webpack or Browserify) that changes class names and selectors to be scoped (i.e. kinda like namespaced).


* With CSS Modules, it’s a guarantee that all the styles for a single component: 1. Live in one place and 2. Only apply to that component and nothing else.

* With CSS Modules and the concept of the local scope by default, many problems are avoided. You’re always forced to think about the consequences as you write styles. 

* We don’t need to use BEM when we’re making a CSS module. This is for two reasons:

Reason 1 - Easy parsing – Code-like type. display is just as legible for developers as the BEM-y .font-size__serif--large. Likely even easier to mentally parse when the BEM selectors get long.

Reason 2 - Local scope – Say we have a class like .big in one module where it changes the font size. In another, we use the exact same class .big that increases padding and font size in a different amount. It simply doesn’t matter! They won’t conflict, because the styles are scoped very deliberately. Even if a module imports both stylesheets, then it has a custom name which our build process makes specifically for that class. In other words, specificity issues disappear with CSS Modules.

<br>

## Create React App With Node API
This resource is an article that focuses on presenting a starter tutorial on how to set up an application to support a React frontend with a Node backend. My project may have differences from this example, but the overall information is helpful as a reference and to understanding steps commonly needed. The article presents some really helpful code snippets which I have provided below and I will be referencing this article when I work on my project this week.

* Create a React App: `npx create-react-app example-create-react-app-express`


* Install nodemon globally and the server dependencies: `npm i nodemon -g`


* The key to using an Express back-end server with a project created with create-react-app is to use a proxy. This tells the Web-pack development server to proxy our API requests to our API server, given that our Express server is running on localhost:5000. 

<br>

## Connecting Github and Heroku
This resource is an article that focuses on how to deploy a NodeJS app to Heroku from Github (without installing Heroku on your machine). The article breaks the process down into steps and guides the reader with the use of code snippets. The steps the article provides are as follows, create a node app, push to GitHub, and deploy to Heroku. Some key concepts I found helpful and informative in the article are in the bullet points below.

![Heroku Connect](https://cdn-media-1.freecodecamp.org/images/ylaZsAuah1udMDvouTIQLmzLDKJX9FrC23yB)

* After the deployment, Heroku will run this command to start your application: `"start": "node app.js"`


* `const port = process.env.PORT || 3000`


<br>

## Understanding Deployment Pipelines
This resource is an article that focuses on guiding the reader through the flow of CI and CD and shows why this is helpful. The article starts off by suggesting that the pipeline is made up of GitLab to host code, GitLab CI to build, test, and deploy the code, and Heroku to host the app. Below is an example pipeline workflow chart. The article defines a development pipeline as the chain of tasks and processes you go through in your development process. The article defines a deployment pipeline as the chain of tasks and processes you go through in your deployment process. Some key concepts I found helpful and informative in the article are in the bullet points below.

![xample pipeline workflow chart](https://uploads.toptal.io/blog/image/126047/toptal-blog-image-1525441763364-360ead3757f3b8cc747ce0ceb7891d84.png)

* The suggested pipeline is made up of GitLab to host code, GitLab CI to build, test, and deploy the code, and Heroku to host the app.



* CI/CD stands for continuous integration (CI) and continuous delivery/deployment (CD).


* Continuous Integration: Make sure all your code is merged together in one place. Get your team to use Git and you’ll be using CI.

* Continuous Delivery: Make sure your code is continuously ready to be shipped. Meaning producing a read-to-distribute version of your product quickly.

* Continuous Deployment: Seamlessly taking the product from continuous delivery and just deploying it to your servers.

<br>

## Components and Props
This resource is documentation that focuses on React components and props. The documentation explains what components are as well as props. The article covers many different topics such as Function and Class Components, Rendering a Component, Composing Components, Extracting Components, and Props are Read-Only. Some key concepts I found helpful and informative in the documentation are in the bullet points below.  

* Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.


* When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.


* Always start component names with a capital letter.

* React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires **Welcome** to be in scope.

* Typically, new React apps have a single App component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like Button and gradually work your way to the top of the view hierarchy.

* Props are Read-Only

* Such functions are called “pure” because they do not attempt to change their inputs, and always return the same result for the same inputs.

<br>

## Component-Scoped Styles with CSS Modules
This resource is documentation that focuses on CSS Modules, what it is and how it is used. The documentation covers the topics as well as provides code snippet examples. Some key concepts I found helpful and informative in the documentation are in the bullet points below.   

* Component-scoped CSS allows you to write traditional, portable CSS with minimal side effects: gone are the worries of selector name collisions or affecting other components’ styles.


* A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.


* Adding a persistent CSS className to your JSX markup along with your CSS Modules code can make it easier for users to take advantage of User Stylesheets for accessibility.

* CSS Modules are highly recommended for those new to building with Gatsby (and React in general) as they allow you to write regular, portable CSS files while gaining performance benefits like only bundling referenced code.

<br>


## Reference Links

### What resource(s) did you find most helpful for this research assignment and why? 

I found the resources **Understanding Deployment Pipelines** and **Connecting Github and Heroku** to be most helpful for this research assignment. I found **Understanding Deployment Pipelines** to be helpful since before doing this research I was not truly aware of what a deployment pipeline was. Looking over and conducting research on this resource will help me as I work on my project this week. Next, I found **Connecting Github and Heroku** most helpful as I also did not know much about what Heroku was. By conducting research and learning more about how to connect GitHub and Heroku I started to gain some confidence in the topic and helped demystify what Heroku was. Those are the resources I found most helpful for my research assignment this week and why.


**Thinking in React**  
[reactjs.org](https://reactjs.org/docs/thinking-in-react.html)  

**File Structure in React**    
[usejournal.com](https://blog.usejournal.com/folder-structure-in-react-apps-c2ae8974d21f)
<br>
[hackernoon.com](https://hackernoon.com/react-project-structure-best-practices-kh20323x)

**Why ESLint**      
[itnext.io](https://itnext.io/how-eslint-makes-me-a-better-react-developer-237fb14c00ae)
<br>
[eslint.org](https://eslint.org/docs/about/)

**Why PropTypes**      
[conceptainc.com](https://conceptainc.com/blog/whats-the-point-of-proptypes-in-react/)

**Why ModuleCSS**      
[css-tricks.com](https://css-tricks.com/css-modules-part-1-need/)

**Create React App With Node API**      
[freecodecamp.org](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/)

**Connecting Github and Heroku**      
[freecodecamp.org](https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/)

**Understanding Deployment Pipelines**      
[toptal.com](https://www.toptal.com/devops/effective-ci-cd-deployment-pipeline)

**Components and Props**      
[reactjs.org](https://reactjs.org/docs/components-and-props.html)

**Component-Scoped Styles with CSS Modules**      
[gatsbyjs.com](https://www.gatsbyjs.com/docs/how-to/styling/css-modules/)




