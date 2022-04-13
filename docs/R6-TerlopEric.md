# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 9) - Week 6**
* **Eric Terlop**
* **03/13/2022**

<br>


## Database seeding in Node.js
This resource is an article that focuses on database seeding using Node.js, MYSQL, what seeding is, and how to implement it. The article describes database seeing as the initial seeding of a database with data. Seeding a database is a process in which an initial set of data is provided to a database when it is being installed. It is especially useful when we want to populate the database with data we want to develop in future. Below are some key concepts that I found helpful from this resource.

* Database seeding is the initial seeding of a database with data. Seeding a database is a process in which an initial set of data is provided to a database when it is being installed. It is especially useful when we want to populate the database with data we want to develop in future.

* So our goal is to “feed” the database with dummy data on its initialization. This can be very helpful especially during the development process or for onboarding new employees that run the development environment (database) locally on their machine.

* First of all, we create a new SQL script that includes the queries for inserting the dummy data. This script will be later executed using Node.js.

	The seeding script: `./db/seeding.sql`
	
* Make sure that the database tables were created before running the script otherwise it’ll fail. Most ORMs take care of that.

* Next, we write the Node.js script, which is required to establish a database connection and execute the SQL snippet we just created.

	The Node.js script: `./db/index.js`
	
	What happens here?
	1. Load the environment variables using dotenv
	1. Read the SQL snippet
	1. Connect to the database (MySQL)
	1. Generate a random password (hashed)
	1. Execute the SQL snippet

* Last but not least let’s extend the package.json scripts to simplify the execution of the Node script.

```
{
  "scripts": {
    // ...
    "seed": "node db/index.js"
    // ...
  }
}	
```

* Now you can run the database seeding with a single command from the terminal: `npm run seed`. 


<br>

## Migrations and Seeding Made Easy in Node JS Using Sequelize

This resource is an article that focuses on migrations, seeding, models, and Heroku. The article starts by talking about how to set up Sequelize, then creating models, seeding, and lastly how to deploy on Heroku. Below are some key concepts that I found helpful from this resource. 

* **Migration** - Migrating databases is automatically syncing of databases in all of the environment. Any changes on the database are recorded and synced later through migration command in each system (of the developers) or in production.

* **Seeding** - If migration handles the setting of databases, Seeder handles providing initial data to the database. The way it does it is roughly the same, creating script to run specific SQL commands given.

* **Running Seeders** - To run all seeders:
	`npx sequelize db:seed:all`
	
* To automatically run migrations and seeders before the heroku app built, create `Procfile` contains migrate and seed command.

	```
	Procfileweb: npx sequelize db:migrate:all && npx sequelize db:seed:all
	```

* Sequelize is a promise-based ORM for most databases like MySQL, Postgres, SQLite, MariaDB, and Microsoft SQL Server.



<br>

## Express Tutorial Part 4: Routes and controllers
This resource is documentation MDN that focuses on Express routes and controllers. The documentation touches on setting up routes (URL handing code) with 'dummy' handler functions for all the resource endpoints. Some of the topics touched on in this documentation were Routes primer, route functions, HTTP verbs, route paths, and more. Below are some key concepts that I found to be most useful.

* The diagram below is provided as a reminder of the main flow of data and things that need to be implemented when handling an HTTP request/response. In addition to the views and routes, the diagram shows "controllers" — functions that separate out the code to route requests from the code that actually processes requests.

![MVC Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)


* **Routes primer** - A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern. There are several ways to create routes. For this tutorial, we're going to use the express. Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route prefix. We'll keep all our library-related routes in a "catalog" module, and, if we add routes for handling user accounts or other functions, we can keep them grouped separately.


* **HTTP verbs** - The Router also provides route methods for all the other HTTP verbs, that are mostly used in exactly the same way: post(), put(), delete(), options(), trace(), copy(), lock(), mkcol(), move(), purge(), propfind(), proppatch(), unlock(), report(), mkactivity(), checkout(), merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(), search(), and connect().

* **Route parameters** - Route parameters are named URL segments used to capture values at specific positions in the URL. The named segments are prefixed with a colon and then the name (e.g. /:your_parameter_name/. The captured values are stored in the req.params object using the parameter names as keys (e.g. req.params.your_parameter_name).


<br>

## Express Routing

This resource is documentation that focuses on express routing. The documentation covers mutiple aspects of routing including but not limited to route methods, route paths, route parameters, route handlers, and more. The documentation includes many examples on each topic and includes mutiple code snippets. Below are some key concepts that I found to be most useful.

* Routing refers to how an application’s endpoints (URIs) respond to client requests.

* You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see app.METHOD. You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function.

* The following code is an example of a very basic route:

```
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

* A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.

* The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.

```
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

* Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.

* Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

* You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

* Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.


<br>

## YouTube: Routing

This resource is a video that focuses on the history of routes, the type of requests, and some design patterns that go into routing. The video starts off with some history of routes which stated that we used to have everything on one page, it used to take you directly to the .php file which contained all the code for that page. This didn't really allow for reusable code and it didn't allow good structure. Once switching to MVC, we needed a way to direct code from one place to our controller to a specific method inside of that controller which would then handle the appropriate view. With routes, we also had pretty URLs which would take words and map them to controllers with methods. The video then went on to talk about how when a request is made a router is activated. The lady in the video broke down what each request type is and how they are usually used.

* Once switching to MVC, we needed a way to direct code from one place to our controller to a specific method inside of that controller which would then handle the appropriate view.

* Pretty URLs take words and map them to controllers with methods.

* There are many things that make up a request such as a request type a few examples of this are POST, GET, PUT, and DELETE.



<br>

## Express middleware: A complete guide

This resource is a blog that focuses on the basics of using Express.js middleware. The blog goes over how to create a simple Express API from scratch, then add the middleware to it and demonstrate how to use each tool. The blog defines middleware as software containing functions that execute during the request-response cycle and have access to both the request object (req) and the response object (res). Middleware is executed during the window between when a server receives a request and when it sends a response. Below are some key concepts that I found helpful from this resource. 

* Middleware is software containing functions that execute during the request-response cycle and have access to both the request object (req) and the response object (res). Middleware is executed during the window between when a server receives a request and when it sends a response.

* How does middleware work? To understand how middleware works, imagine you own a lemonade stand where customers bring their own lemons and you make the lemonade. You’re responsible for evaluating the lemons’ origin and freshness, discarding any subpar lemons, and, finally, making the lemonade.

	![infographic](https://blog.logrocket.com/wp-content/uploads/2020/12/middleware-infographic.png)
	
* CORS stands for cross-origin resource sharing. It is used to enable and configure CORS in Express.js apps.

	Imagine you have a full-stack app with a React frontend running on port 3000 and an Express backend server running on port 8000. A request comes from the client (i.e., the React frontend) to the backend Express server, but your request will most likely fail since it is coming from a different origin than the Express server.
	
	![cors error](https://blog.logrocket.com/wp-content/uploads/2020/12/cors-error.png)
	
	You need to tell the server to accept this request even if it comes from a different origin. That’s where cors comes in.
	
* Run the following command to install cors: `npm install --save cors`



<br>

## How to Create Middleware in Node JS & Express JS?

This resource is an article that focuses on Node.js Middleware and Express Middleware. The article covers many different aspects of middleware such as how does Node.js Middleware work, what is next(), creating your own Node.js Middleware, what is Express Middleware, basics of Express Middleware, and error handling in Express Middleware. The article defines Middleware as anything you insert in the middle of one layer of the software and another.Below are some key concepts that I found helpful from this resource.

* What is Express Middleware? Middleware can be defined as anything you insert in the middle of one layer of the software and another.

* What is next()? Next() is a middleware function that calls the control of another function once the middleware code is accomplished.

	Hence, you can wait until network operations complete prior to proceeding with the further step. Similar to the functionality of route Handlers, a middleware ensures the receipt of the Request and Response objects, effortlessly.

	Here, the request object commonly referred to as the variable (req) and the response object referred to as the variable (res).

	The next middleware function, which is referred to as the variable ‘next’ plays a responsible role in creating the request-response cycle of the application.
	
	![](https://www.esparkinfo.com/wp-content/uploads/2020/09/Understanding-next-Function.jpg)

* Types of Express Middleware - There are five types of Express Middleware that may vary according to the level of application development.

	1. Application-level middleware (app.use): In application-level middleware, we can consider an authentication middleware and how it is created. 
	2. Router level middleware (router.use): This is similar to the application level middleware and works in the same manner, except it can be generated and limited to an instance of express.Router ().
	3. Built-in middleware (express.static, express.json, express.urlencoded): This built-in middleware does not depend on the ‘Connect’ function and unlike the previous version of middleware, the version 4.X express now acts as a module.
	4. Error Handling Middleware (app.use (err, req, res, next)): Express.js is capable of handling any sort of errors when occurred because it has the tendency of default error handling and defined error-handling middleware functions, which is similar to the other middleware functions.
	5. Third-party middleware (bodyparser, cookieparser): There are certain cases where you might need to add some additional features in the backend operations. In such cases, install the Node.js module for the specified functionality and then apply the same in your app either at the application level or router level.

* Basic of Express Middleware: Using the very basics of Express that has middleware built-in for the very first time, you get an opportunity to know how middleware is used in application development, and how you can find a structured Express Middleware.

* Error Handling in Express Middleware: Express.JS naturally has the tendency of handling errors and comes with an in-built error handler. It is inserted always at the end of the middleware pipeline that can handle any unresolvable errors, which may have occurred in the pipeline.



<br>





## Reference Links
### What resource(s) did you find most helpful for this research assignment and why? 

I found that **Migrations and Seeding Made Easy in Node JS Using Sequelize** and **Express Routing** were most helpful this week for notes and research on Routes and Middleware. I found **Migrations and Seeding Made Easy in Node JS Using Sequelize** was helpful because it really broke down what Seeding was and how it is all tied together with migrations and even Heroku. The article provided many example code snippets and made it easier to visual what is going on. Next, I found **Express Routing** helpful because it breaks down the importance and needs of express routing. Understanding that, helps me learn on a deeper level of what it has to offer and the best ways to use it in my final prokect. Those are some resources this week that I found were most helpful when learning more about Routing and Middleware and why.



**Database seeding in Node.js**  
[levelup.gitconnected.com](https://levelup.gitconnected.com/database-seeding-in-node-js-2b2eec5bfaa1) 

**Migrations and Seeding Made Easy in Node JS Using Sequelize**      
[dmedium.com](https://medium.com/@darrand37/migrations-and-seeding-made-easy-in-node-js-using-sequelize-80bd13620b45) 

**Express Tutorial Part 4: Routes and controllers**      
[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

**Express Routing**      
[expressjs.com](https://expressjs.com/en/guide/routing.html)

**YouTube: Routing**      
[youtube.com](https://www.youtube.com/watch?v=_7Df0WMAgCQ)

**Express middleware: A complete guide**      
[blog.logrocket.com](https://blog.logrocket.com/express-middleware-a-complete-guide/)

**How to Create Middleware in Node JS & Express JS?**      
[esparkinfo.com](https://www.esparkinfo.com/how-to-create-middleware-in-node-js-and-express-js.html)







