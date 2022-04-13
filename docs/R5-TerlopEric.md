# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 8) - Week 5**
* **Eric Terlop**
* **03/06/2022**

<br>


## Overcoming Sequelize Hiccups
This resource is an article that focuses on Sequelize, more specifically it focuses on how to set Sequelize up for your project, creating a database, models, and even seeders. The article does a good job providing step-by-step information and provides many visuals and code snippets which makes it easier to follow along. Below are some key concepts that I found to be most useful. 

* Sequelize is possibly one of the best NodeJS ORM library that is available for developers to use. However, just like any tool or framework, there are some issues that we run into when we first get started with Sequelize. 


* To be able to use Sequelize in our project, we will need to install Sequelize and the corresponding database client for the database of our choosing. We need the database client because Sequelize is simply a library that implements the ORM technique to manipulate and query the data in an Object-Oriented fashion and does not contain additional layers to interact with the database underneath.

  ```
  npm i -S sequelize pg
  ```


* **Initialize Sequelize** - To be able to set up a Sequelize based project and run it successfully, we will need the following:
 * Config — configuration necessary to run Sequelize
 * Migrations — files containing any and all changes that we make to our tables 
 * Models — the structure of our tables and their properties
 * Seeders — to initialize our tables with default data

 
 To have the necessary files in place, we can either create these folders manually or a better alternative is to simply use the Sequelize CLI to do so.
To install the cli, run the following command:

  ```
  npm install --save sequelize-cli
  ```

* Creating models is again a very easy task if you use the Sequelize CLI. We will be creating a very simple and generic entity such as User with the properties firstName and lastName. To generate the User simply run the following command:

  ```
  sequelize model:generate --name User --attributes 
  firstName:string,lastName:string
  ```


<br>

## Junction Model Pattern: Many-to-Many - Sequelize
This resource is an article that focuses on the many-to-many modeling relationship and one way to handle it with the Sequelize ORM.


* Let's assume you're building a blog with Sequelize.

 On your blog, you can create a bunch of Posts. As a way to describe your post, it can belong to many different Genres.

 This blog post, for example, might have the Sequelize, Orm, and Web Development tag.

 So far, we have two models: Post and Genre.
 
 ```
 // Post.js
module.exports = function(sequelize, DataTypes) {
  const Post =  sequelize.define('post', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'post',
  });

  return Post;
};
 ```

 ```
// Genre.js
module.exports = function(sequelize, DataTypes) {
  const Genre =  sequelize.define('genre', {
    genre_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'genre',
  });

  return Genre;
};
 ```
 

* We need to create a junction table to store the relationship between the two.

 In order to model it, we'll end up with three tables instead of just two.

![junction table](https://khalilstemmler.com/img/blog/sequelize-junction/junction-svg.svg)


* Let's go ahead and create the additional model now.

```
// tagPostGenre.js
module.exports = function(sequelize, DataTypes) {
  const TagPostGenre = sequelize.define('tag_post_genre', {
    tag_post_genre_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.INTEGER(11),
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: 'post',
        key: 'post_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      unique: 'unique-genre-per-post'
    },
    genre_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: 'genre',
        key: 'genre_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      unique: 'unique-genre-per-post'
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'tag_post_genre'
  });

  return TagPostGenre;
};
```

* Add the associations on TagPostGenre junction table/model.

```
TagPostGenre.associate = (models) => {
  TagPostGenre.belongsTo(models.Post, { foreignKey: 'post_id', targetKey: 'post_id', as: 'Post' });
  TagPostGenre.belongsTo(models.Genre, { foreignKey: 'genre_id', targetKey: 'genre_id', as: 'Genre' });
}

```

* Add the association on Genre.

```
Genre.associate = (models) => {
  Genre.belongsToMany(models.Post, { as: 'PostsInGenre', through: models.TagPostGenre, foreignKey: 'genre_id'});
}

```


* Finally, add the association on Post.

```
Post.associate = (models) => {
  Post.belongsToMany(models.Genre, { as: 'GenresForPost', through: models.TagPostGenre, foreignKey: 'post_id'});
}

```



<br>

## Express Tutorial Part 4: Routes and controllers
This resource is documentation MDN that focuses on Express routes and controllers. The documentation touches on setting up routes (URL handing code) with 'dummy' handler functions for all the resource endpoints. Some of the topics touched on in this documentation were Routes primer, route functions, HTTP verbs, route paths, and more. Below are some key concepts that I found to be most useful.

* The diagram below is provided as a reminder of the main flow of data and things that need to be implemented when handling an HTTP request/response. In addition to the views and routes, the diagram shows "controllers" — functions that separate out the code to route requests from the code that actually processes requests.

![MVC Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)


* **Routes primer** - A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern. There are several ways to create routes. For this tutorial, we're going to use the express. Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route prefix. We'll keep all our library-related routes in a "catalog" module, and, if we add routes for handling user accounts or other functions, we can keep them grouped separately.


* **HTTP verbs** - The Router also provides route methods for all the other HTTP verbs, that are mostly used in exactly the same way: post(), put(), delete(), options(), trace(), copy(), lock(), mkcol(), move(), purge(), propfind(), proppatch(), unlock(), report(), mkactivity(), checkout(), merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(), search(), and connect().

* **Route parameters** - Route parameters are named URL segments used to capture values at specific positions in the URL. The named segments are prefixed with a colon and then the name (e.g. /:your_parameter_name/. The captured values are stored in the req.params object using the parameter names as keys (e.g. req.params.your_parameter_name).


<br>

## Sequelize: Validation (4/TBD)
This resource is a video that is focused on writing validation rules for Sequelize models.  Below are some key concepts that I found to be most useful.  

* The `.then` and `.catch` functions come from the Promise object returned by Sequelized.


* When inserting an article sequelize validates the defined value types (ex. `Sequelize.STRING`).


* If you try to insert an article that does not have a valid data type that is defined Sequelize will throw an error. Sequelize will protect the basic integrity of the data.

* Model validations, allow you to specify format/content/inheritance validations for each attribute of the model.

* Validations are automatically run on `create`, `update`, and `save`. You can also call `validate()` to manually validate an instance. The validations are implemented by validator.js

* **Model synchronization** - When you define a model, you're telling Sequelize a few things about its table in the database. However, what if the table actually doesn't even exist in the database? What if it exists, but it has different columns, less columns, or any other difference?

 This is where model synchronization comes in. A model can be synchronized with the database by calling model.sync(options), an asynchronous function (that returns a Promise). With this call, Sequelize will automatically perform an SQL query to the database. Note that this changes only the table in the database, not the model in the JavaScript side.

 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

* **Synchronizing all models at once** - You can use sequelize.sync() to automatically synchronize all models. Example:

 ```
await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
```


<br>

## Sequelize: Hooks (5/TBD)
This resource is a video that focuses on Sequelize Hooks. The video starts off by having the narrator of the video explain what hooks are which is stated as that hooks are also known as middleware, hooks aren't specific to Sewuelize. In general computer programming, hooks are essentially a sensibility point provided by a library that allows your program to react when an otherwise internal event occurs. You can also potentially augment or replace functionality using hooks, it depends on the library. This resource is another important piece of information as this is tied directly to this week's work.

* Hooks aren't specific to Sequelize.


* You can also potentially augment or replace functionality using hooks, it depends on the library.


* In general computer programming, hooks are essentially a sensibility point provided by a library that allows your program to react when an otherwise internal event occurs.

 `var bcrypt = require('bcryptjs')`

 ```
hooks: { afterValidate: function (user) {
   user.password = bcrypt.hashSync(user.password, 8);
}
```

<br>

## A Complete Guide and List of HTTP Status Codes
This article focuses on what HTTP status codes are, understanding HTTP status code classes, why HTTP status codes and errors matter for search engine optimization (SEO), and even a list of HTTP status codes. The article starts off by explaining what HTTP status codes are which states HTTP status codes are delivered to your browser in the HTTP header. While status codes are returned every single time your browser requests a web page or resource, most of the time you don’t see them. The article then moves on to talk about the five different classes HTTP status codes are divided into which are 100s, 200s, 300s, 400s, and 500s. Learning what each status code means will help me when logging and debugging issues while I work on my API this month.

* **HTTP status codes** are an invaluable tool for **diagnosing** and fixing website **configuration errors**.


* **HTTP status codes** are **delivered** to your **browser** in the **HTTP header**. While status codes are returned every single time your browser requests a web page or resource, most of the time you don’t see them.


* **HTTP status codes** are divided into **5 “classes”**. These are groupings of responses that have similar or related meanings. **100s**: Informational codes indicating that the request initiated by the browser is continuing, **200s**: Success codes returned when browser request was received, understood, and processed by the server, **300s**: Redirection codes returned when a new resource has been substituted for the requested resource, **400s**: Client error codes indicating that there was a problem with the request, and **500s**: Server error codes indicating that the request was accepted, but that an error on the server prevented the fulfillment of the request.

* **Search engine bots** see **HTTP status codes** while they’re crawling your site. In some cases, these messages **can influence** if and how your **pages get indexed**, as well as **how search engines perceive the health of your site**.


<br>

## Node/Express: async code and error handling
This resource is an article that focuses on async code and error handling. The article starts off with an example task of having a login for a user. The article then touches on some different things to keep in mind such as callback hell, promises, Async/Await, and combining async/await and promises. Below are some key highlights and takeaways from this resource.

* The difference between critical and non-critical errors. If we want to break the root chain, we have to add throw error or Promise.reject(error) into the sub chain error handler.


* It’s simple to perform operations one after another, but it’s hard to make something in parallel (although that’s not a big problem because parallel operations are rare in the usual webserver backend). All popular libraries support callback-approach.

* Async/await is not magic — there’s no easy error handling of individual errors that happen inside the try/catch block. We have to wrap every command into it’s own try/catch block, handle the error and rethrow it to the external try/catch if we have to stop the further steps:

 ```
routes.post('/login', async (req, res) => {
  try {
    ...
    let user = null
    try {
      user = await findUser(req.body.login)
    } catch (error) {
      doAnythingWithError(error)
      throw error //<-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
    }
    ...
  } catch (error) {
    errorResult(res, error)
  }
```

* I can use async/await and promises together. We can handle individual errors inside a promise and wrap everything with try/catch.



 ```
.then(() => {
  return findUser(req.body.login).catch(error => {
    doAnythingWithError(error)
    throw error //<-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
    return Promise.reject(error) //<-- EITHER THIS
  })
})
```

<br>

## Sequelize relationships — Ultimate guide
This resource is an article that focuses on the details of the implementation of all types of relationships possible thanks to Sequelize. The article goes through an example and how the author went through the process of connecting his tables with relationships.

* While sequelize presents itself as an essential ORM of Node.JS, the documentation, and resources that can be found often leave much to be desired.


* when associating in models, it is a good practice to use aliases (as:) because sequelize pluralizes the name of models and it can sometimes bring surprises, by using aliases, you rename the associations which then allows you to use this alias in include.


* belongsToMany association it is not mandatory but specifying the foreign key ensures a good connection.

* Finally, during a belongsToMany association it is not mandatory but specifying the foreign key ensures a good connection. It also happened to me that Sequelize does not associate the model with the right table if it happens to you, you can specify a class name in the second parameter of the model definition.

* The 3 types of relationship - We will take as an example 3 models.
 * Company
 * Employee
 * Working day
* Employee has one company (**belongsTo**) 1:1
* Company has many employees (**hasMany**) 1:n
* Employee has many WorkingDay and WorkingDay has many employees (**many-to-many**) n:n
* To create many to many relationship, we will need a joining table that we will call WorkingDaysEmployee.

<br>

## Reference Links
### What resource(s) did you find most helpful for this research assignment and why? 

I found the resource **Overcoming Sequelize Hiccups** and **Sequelize relationships — Ultimate guide** to be the most helpful for this research assignment this week. Starting with the resource **Overcoming Sequelize Hiccups** I found this to be useful as I have not had much practice with Sequelize and having a step-by-step guide handy is going to make my progress this week with my final project much easier than it would be if I did not have a resource like this. Next, I found **Sequelize relationships — Ultimate guide** as I found this concept slightly difficult to understand before doing research this week. By reviewing this article I found some helpful information such as taking some existing concepts such as (company, employee, and working day) and can compare the relationships between them like Employee has one company (belongsTo) 1:1, Company has many employees (hasMany) 1:n, and Employee has many WorkingDay and WorkingDay has many employees (many-to-many) n:n. That concludes the resources that I found helpful this week and why. Although, I would like to states that I found each resource helpful but these were the highlight resources for this week.


**Overcoming Sequelize Hiccups**  
[itnext.io](https://itnext.io/overcoming-sequelize-hiccups-24e916ebb4c4)  

**Junction Model Pattern: Many-to-Many - Sequelize**    
[khalilstemmler.com](https://khalilstemmler.com/articles/sequelize-tags-junction-pattern/)

**Express Tutorial Part 4: Routes and controllers**      
[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

**Sequelize: Validation (4/TBD)**      
[youtube.com](https://www.youtube.com/watch?v=Z1O9iddzcXk) <br>
[sequelize.org](https://sequelize.org/master/manual/models-definition.html#validations)

**Sequelize: Hooks (5/TBD)**      
[youtube.com](https://www.youtube.com/watch?v=pquxHIBx8ks&list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR&index=7)

**A Complete Guide and List of HTTP Status Codes**      
[kinsta.com](https://kinsta.com/blog/http-status-codes/) <br>
[httpstatuses.com](https://httpstatuses.com/)

**Node/Express: async code and error handling**      
[codeburst.io](https://codeburst.io/node-express-async-code-and-error-handling-121b1f0e44ba) <br>
[expressjs](https://expressjs.com/en/guide/error-handling.html)

**Sequelize relationships — Ultimate guide**      
[medium.com](https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554)





