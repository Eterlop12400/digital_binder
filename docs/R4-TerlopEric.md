# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 7) - Week 4**
* **Eric Terlop**
* **02/27/2022**

<br>

## [Redux] - The Best Explanation of How it Works
This resource is a video that is focused on Redux. The video makes it clear from the beginning that it is not focused on React at all. The video provides many different examples of Redux and provides many charts to visually show how things are working in Redux.

![diagram for redux](https://miro.medium.com/max/1400/0*KSVh6E7OrrzANcPN)

* Redux is simply a store to store the state of the variables in your app. Redux creates a process and procedures to interact with the store so that components will not just update or read the store randomly.


* Redux is a way to manage the “state” or we can say it is a cache or storage that can be accessed by all components in a structured way. It has to be accessed through a “Reducer” and “Actions”.

<br>

## Using the Redux Store Like a Database
This resource is an article that focuses on how we should structure the data in our Redux store. The article lists out some common approaches to store data such as an array of flat objects and Objects keyed on id. The article provides many examples and code snippets to further illustrate how you can organize and structure the data in our Redux store. Below are some key concepts that I found most helpful in this resource. 

* Structure it like a database of rows indexed by id:

```
categories: {
  '32o8wafe': {id: '32o8wafe', name: 'abs',  exercises: [...]},
  'oaiwefjo': {id: 'oaiwefjo', name: 'arms', exercises: [...]},
  '3oij2e3c': {id: '3oij2e3c', name: 'legs', exercises: [...]},
}
```


* **Index categories by name:** To make the index, we write a function that takes the store data and returns a mapping of name -> id.

```
const index_by_name = (categories) =>
    Object.values(categories)
          .reduce((obj, row) => (obj[row.name] = row.id, obj), {})
```


* You can build as many indexes as you want for the same data, which gives you O(1) access based on any column, just like you’d have in a database. If your data doesn’t change, your indexes just need to be computed once, otherwise, they should be recomputed with memoized functions.

* **Memoization** - If your data never changes, you can call ids_by_key once on startup and use the produced index as a static object every time after that. However, if you’re working with changing data that will be accessed frequently, memorization is essential to avoid recalculating the index on every access (which is O(n)).

* Memoized-index selectors can be accomplished with reselect, or by writing a custom memoizer function (which is not too difficult depending on your data). Memoized indexes mean you can call the index function on every read, instead of having to store the index in redux.

<br>

## Normalizing State Shape
This resource is an article that focuses on designing a normalized state, organizing normalized data in state, relationships and tables, and normalizing nested data. The article provides many examples of each of the topics above and provides many code snippets. Below are some key concepts that I found most helpful in this resource.

* Many applications deal with data that is nested or relational in nature. For example, a blog editor could have many Posts, each Post could have many Comments, and both Posts and Comments would be written by a User. Data for this kind of application might look like:

```
const blogPosts = [
  {
    id: 'post1',
    author: { username: 'user1', name: 'User 1' },
    body: '......',
    comments: [
      {
        id: 'comment1',
        author: { username: 'user2', name: 'User 2' },
        comment: '.....'
      },
      {
        id: 'comment2',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....'
      }
    ]
  },
  {
    id: 'post2',
    author: { username: 'user2', name: 'User 2' },
    body: '......',
    comments: [
      {
        id: 'comment3',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....'
      },
      {
        id: 'comment4',
        author: { username: 'user1', name: 'User 1' },
        comment: '.....'
      },
      {
        id: 'comment5',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....'
      }
    ]
  }
  // and repeat many times
]
```


* Notice that the structure of the data is a bit complex, and some of the data is repeated. This is a concern for several reasons:

	* When a piece of data is duplicated in several places, it becomes harder to make sure that it is updated appropriately.

	* Nested data means that the corresponding reducer logic has to be more nested and therefore more complex. In particular, trying to update a deeply nested field can become very ugly very fast.
	
	* Since immutable data updates require all ancestors in the state tree to be copied and updated as well, and new object references will cause connected UI components to re-render, an update to a deeply nested data object could force totally unrelated UI components to re-render even if the data they're displaying hasn't actually changed.


* **Designing a Normalized State​** - The basic concepts of normalizing data are:

	* Each type of data gets its own "table" in the state.
	
	* Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
	
	* Any references to individual items should be done by storing the item's ID.
	
	* Arrays of IDs should be used to indicate ordering.

	
* **Organizing Normalized Data in State** - A typical application will likely have a mixture of relational data and non-relational data. While there is no single rule for exactly how those different types of data should be organized, one common pattern is to put the relational "tables" under a common parent key, such as "entities".


* **Relationships and Tables** - Because we're treating a portion of our Redux store as a "database", many of the principles of database design also apply here as well. For example, if we have a many-to-many relationship, we can model that using an intermediate table that stores the IDs of the corresponding items (often known as a "join table" or an "associative table").

* **Normalizing Nested Data**​ - Because APIs frequently send back data in a nested form, that data needs to be transformed into a normalized shape before it can be included in the state tree. The Normalizr library is usually used for this task. You can define schema types and relations, feed the schema and the response data to Normalizr, and it will output a normalized transformation of the response. That output can then be included in the action and used to update the store.

<br>

## Refactoring Reducer Logic Using Functional Decomposition and Reducer Composition
This resource is documentation that focuses on refactoring reducer logic using functional decomposition and reducer composition. The documentation has broken this up into different sections such as initial reducer, extraction utility functions, extracting case reducers, separating data handling by domain, reducing boilerplate, and more. Below are some key concepts that I found most helpful in this resource.  

* **Extracting Utility Functions​** - A good first step might be to break out a utility function to return a new object with updated fields.


* **Extracting Case Reducers**​ - Next, we can split each specific case into its own function: 

```
// Omitted
function updateObject(oldObject, newValues) {}
function updateItemInArray(array, itemId, updateItemCallback) {}

function setVisibilityFilter(state, action) {
  return updateObject(state, { visibilityFilter: action.filter })
}

function addTodo(state, action) {
  const newTodos = state.todos.concat({
    id: action.id,
    text: action.text,
    completed: false
  })

  return updateObject(state, { todos: newTodos })
}

function toggleTodo(state, action) {
  const newTodos = updateItemInArray(state.todos, action.id, todo => {
    return updateObject(todo, { completed: !todo.completed })
  })

  return updateObject(state, { todos: newTodos })
}

function editTodo(state, action) {
  const newTodos = updateItemInArray(state.todos, action.id, todo => {
    return updateObject(todo, { text: action.text })
  })

  return updateObject(state, { todos: newTodos })
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return setVisibilityFilter(state, action)
    case 'ADD_TODO':
      return addTodo(state, action)
    case 'TOGGLE_TODO':
      return toggleTodo(state, action)
    case 'EDIT_TODO':
      return editTodo(state, action)
    default:
      return state
  }
}
```
Now it's very clear what's happening in each case. We can also start to see some patterns emerging.


* Our app reducer is still aware of all the different cases for our application. Let's try splitting things up so that the filter logic and the todo logic are separated: Notice that because the two "slice of state" reducers are now getting only their own part of the whole state as arguments, they no longer need to return complex nested state objects, and are now simpler as a result.

* We're almost done. Since many people don't like switch statements, it's very common to use a function that creates a lookup table of action types to case functions. We'll use the createReducer function described in Reducing Boilerplate:

```
// Omitted
function updateObject(oldObject, newValues) {}
function updateItemInArray(array, itemId, updateItemCallback) {}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

// Omitted
function setVisibilityFilter(visibilityState, action) {}

const visibilityReducer = createReducer('SHOW_ALL', {
  SET_VISIBILITY_FILTER: setVisibilityFilter
})

// Omitted
function addTodo(todosState, action) {}
function toggleTodo(todosState, action) {}
function editTodo(todosState, action) {}

const todosReducer = createReducer([], {
  ADD_TODO: addTodo,
  TOGGLE_TODO: toggleTodo,
  EDIT_TODO: editTodo
})

function appReducer(state = initialState, action) {
  return {
    todos: todosReducer(state.todos, action),
    visibilityFilter: visibilityReducer(state.visibilityFilter, action)
  }
}
```

* Combining Reducers by Slice​ - As our last step, we can now use Redux's built-in combineReducers utility to handle the "slice-of-state" logic for our top-level app reducer. 

* We now have examples of several kinds of split-up reducer functions: helper utilities like `updateObject` and `createReducer`, handlers for specific cases like `setVisibilityFilter` and `addTodo`, and slice-of-state handlers like `visibilityReducer` and `todosReducer`. We also can see that `appReducer` is an example of a "root reducer".

<br>

## Redux Fundamentals, Part 8: Modern Redux with Redux Toolkit
This resource is some documentation that focuses on Redux toolkit. The documentation states that Redux Toolkit contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications. The article dives deeper into Redux toolkit and provides many examples and code snippets. Below are some key concepts that I found most helpful in this resource. 

* Redux Toolkit contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.


* When you use Redux Toolkit, all the concepts that we've covered so far (actions, reducers, store setup, action creators, thunks, etc) still exist, but Redux Toolkit provides easier ways to write that code.


* **Store Setup** - Notice that the setup process takes several steps. We have to:

	* Combine the slice reducers together to form the root reducer
	* Import the root reducer into the store file
	* Import the thunk middleware, applyMiddleware, and composeWithDevTools APIs
	* Create a store enhancer with the middleware and devtools
	* Create the store with the root reducer

* **Using configureStore​** - Redux Toolkit has a configureStore API that simplifies the store setup process. configureStore wraps around the Redux core createStore API, and handles most of the store setup for us automatically. 

* **Package Cleanup​** - Redux Toolkit already includes several of the packages we're using, like redux, redux-thunk, and reselect, and re-exports those APIs. So, we can clean up our project a bit. First, we can switch our createSelector import to be from '@reduxjs/toolkit' instead of 'reselect'. Then, we can remove the separate packages we have listed in our package.json:

```
npm uninstall redux redux-thunk reselect
```

* Redux Toolkit has a createSlice API that will help us simplify our Redux reducer logic and actions. createSlice does several important things for us:

	* We can write the case reducers as functions inside of an object, instead of having to write a switch/case statement.
	* The reducers will be able to write shorter immutable update logic.
	* All the action creators will be generated automatically based on the reducer functions we've provided.


* createSlice takes an object with three main options fields:

	* name: a string that will be used as the prefix for generated action types
	* initialState: the initial state of the reducer
	* reducers: an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions

	
* createSlice uses a library called Immer inside. Immer uses a special JS tool called a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, as if you'd written all the immutable update logic by hand.

* Redux Toolkit has a createAsyncThunk API that will generate these thunks for us. It also generates the action types and action creators for those different request status actions, and dispatches those actions automatically based on the resulting Promise.

<br>

## Real-World ReactJS and Redux (Part 1)
This resource is an article that focuses on ReactJS and Redux and how threat stack used it to scale their apps up. The author goes through the steps they took to scale their app up which was broken down into the different files and APIs they used. They also talk about how middleware helped to accomplish the goals they had in mind. Below are some key concepts that I found most helpful in this resource. 

* Magic Doesn't Scale! Consistent patterns do.

* Consistent patterns, data structures, and appropriate tools will help you build your larger system.

* Boilerplate code isn't the axis of all evil and trying to remove it all will come at a price.


* `loadItemById() -> code A -> middleware -> code C` You're intercepting a function call, doing things, and then letting it continue to the next call. It's like checking your bags at the airport:

``` 
checkinAtAirport() -> terminalA() -> removeShampooFromBag() ->
arriveAtDestinationWithNoShampoo()
```

<br>

## Forms in React
This resource is documentation that provides information on how to handle form data in React, including how to track multiple inputs and their values for use later as we save. The documentation touches on controlled components, the textarea tag, the select tag, the file input tag, handling multiple inputs, controlled input null value, alternatives to controlled components, and fully-fledged solutions. Below are some key concepts that I found most helpful in this resource.

* Controlled Components - In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`. We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.


* In React, a `<textarea>` uses a value attribute instead. This way, a form using a `<textarea>` can be written very similarly to a form that uses a single-line input:

```
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Notice that this.state.value is initialized in the constructor, so that the text area starts off with some text in it.


* **Handling Multiple Inputs** - When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the handler function choose what to do based on the value of event.target.name.

* **Controlled Input Null Value** - Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a value but the input is still editable, you may have accidentally set the value to undefined or null.

* **Alternatives to Controlled Components** - It can sometimes be tedious to use controlled components because you need to write an event handler for every way your data can change and pipe all of the input states through a React component. This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In these situations, you might want to check out uncontrolled components, an alternative technique for implementing input forms.

* **Fully-Fledged Solutions** - If you’re looking for a complete solution including validation, keeping track of the visited fields, and handling form submission, Formik is one of the popular choices. However, it is built on the same principles of controlled components and managing state — so don’t neglect to learn them.

<br>

## Redux Toolkit
Redux has evolved over time along with the ecosystem of tools that help us spin things up. In addition to the assigned research, spend some time looking at Redux Toolkit to understand ways it can simplify the setup and use of Redux. 

### What is Redux Toolkit? <br>

Redux Toolkit is our official recommended approach for writing Redux logic. It wraps around the Redux core and contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.  

### Install Redux Toolkit

Redux Toolkit is available as a package on NPM for use with a module bundler or in a Node application:
<br><br>
`# NPM` <br>
`npm install @reduxjs/toolkit`

`# Yarn` <br>
`yarn add @reduxjs/toolkit`


### Create a React Redux App
The recommended way to start new apps with React and Redux is by using the official Redux+JS template or Redux+TS template for Create React App, which takes advantage of Redux Toolkit and React Redux's integration with React components.
<br><br>
`# Redux + Plain JS template`<br>
`npx create-react-app my-app --template redux` 
<br><br>
`# Redux + TypeScript template`<br>
`npx create-react-app my-app --template redux-typescript`

<br>


## Reference Links
### What resource(s) did you find most helpful for this research assignment and why? 
I found the resources **Redux Toolkit** and **Forms in React** to be most helpful for this research assignment. I found Redux Toolkit helpful because it really broke down what Redux Toolkit was and it provided helpful commands to run when installing it to a project. I also found it helpful because as a visual learner, seeing the examples and code snippets made learning more about Redux Toolkit easier. Next, I found **Forms in React** to be helpful as the documentation broke down how different aspects of forms work in React. I think the documentation did a great job breaking down each tag and comparing it to how it works in normal HTML compared to react and I know it will be helpful as I continue to work on my final project. Those are some resources this week that I found were most helpful when working on this research assignment.


**[Redux] - The Best Explanation of How it Works**  
[youtube.com](https://www.youtube.com/watch?v=3sjMRS1gJys)  
[medium.com](https://medium.com/swlh/what-is-redux-b16b42b33820)

**Using the Redux Store Like a Database**    
[hackernoon.com](https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5)

**Normalizing State Shape**      
[redux.js.org](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape)

**Refactoring Reducer Logic Using Functional Decomposition and Reducer Composition**      
[redux.js.org](https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example)

**Redux Fundamentals, Part 8: Modern Redux with Redux Toolkit**      
[redux.js.org](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)

**Real-World ReactJS and Redux (Part 1)**      
[dzone.com](https://dzone.com/articles/real-world-reactjs-and-redux-part-1)

**Forms in React**      
[reactjs.org](https://reactjs.org/docs/forms.html#handling-multiple-inputs)

**Redux Toolkit**  
[redux.js.org](https://redux.js.org/introduction/getting-started)




