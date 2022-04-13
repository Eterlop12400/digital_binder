# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 10) - Week 7**
* **Eric Terlop**
* **03/20/2022**

<br>


## Getting Started Axios Docs
This resource is documentation that focuses on Axios, what it is, what features it has, handling errors, and more. The documentation defines Axios as a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests. Some of the features Axios has to offer are making XMLHttpRequests from the browser, make http requests from node js, cancel requests, and more. Below are some key concepts that I found to be important and helpful.

* Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.

* To install Axios using npm: `npm install axios`

* Using the validateStatus config option, you can define HTTP code(s) that should throw an error.

	```
	axios.get('/user/12345', {
	  validateStatus: function (status) {
	    return status < 500; // Resolve only if the status code is less than 500
	  }
	})
	```

	Using toJSON you get an object with more information about the HTTP error.
	
	```
	axios.get('/user/12345')
	  .catch(function (error) {
	    console.log(error.toJSON());
	  });
	```


<br>

## How To Use Axios with React
This resource is an article that focuses on Axios in React. The article covers the installation process of axios in a React project, making a GET request with axios, making a POST request with axios, making a DELETE request with axios, and much more. Below are some key concepts that I found to be important and helpful.

* POST Request Example:

	```
	const user = {
	      name: this.state.name
	    };

	    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
	      .then(res => {
		console.log(res);
		console.log(res.data);
	      })
	```

* GET Request Example:

	```
	axios.get(`https://jsonplaceholder.typicode.com/users`)
	      .then(res => {
		const persons = res.data;
		this.setState({ persons });
	      })
	```

* DELETE Request Example:

	```
	import axios from 'axios';
	
	export default class PersonRemove extends React.Component {
	  state = {
	    id: ''
	  }
	
	  handleChange = event => {
	    this.setState({ id: event.target.value });
	  }
	
	  handleSubmit = event => {
	    event.preventDefault();
	
	    axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
	      .then(res => {
	        console.log(res);
	        console.log(res.data);
	      })
	```

* Using async and await:

	```
	handleSubmit = event => {
	    event.preventDefault();
	
	    const response = await API.delete(`users/${this.state.id}`);
	    
	    console.log(response);
	    console.log(response.data);
	  }
	```


<br>

## Hashing in Action: Understanding bcrypt
This resource is an article that focuses on Bcrypt, what it is, how it works, implimenting Bcrypt, best practices, and more. The article defines Bcrypt as a hashing function that allows us to build a password security platform that scales with computation power and always hashes every password with a salt. Below are some key concepts that I found to be important and helpful.

* **What is Bcrypt?**<br> 
Bcrypt was designed by Niels Provos and David Mazières based on the Blowfish cipher>): b for Blowfish and crypt for the name of the hashing function used by the UNIX password system.

* **How does bcrypt work?**<br>
Provos and Mazières, the designers of bcrypt, used the expensive key setup phase of the Blowfish cipher to develop a new key setup algorithm for Blowfish named "eksblowfish", which stands for "expensive key schedule Blowfish."

	***Phase 1:***

	A function called EksBlowfishSetup is setup using the desired cost, the salt, and the password to initialize the state of eksblowfish. Then, bcrypt spends a lot of time running an expensive key schedule which consists of performing a key derivation where we derive a set of subkeys from a primary key. Here, the password is used as the primary key. In case that the user selected a bad or short password, we stretch that password/key into a longer password/key. The aforementioned practice is also known as key stretching.

	What we are going through this first phase is to promote key strengthening to slow down calculations which in turn also slow down attackers.
	
	***Phase 2:***

	The magic value is the 192-bit value OrpheanBeholderScryDoubt. This value is encrypted 64 times using eksblowfish in ECB mode>) with the state from the previous phase. The output of this phase is the cost and the 128-bit salt value concatenated with the result of the encryption loop.

* **Bcrypt Best Practices**<br>
If a company ever detects or suspects that a data breach has compromised passwords, even in hash form, it must prompt its users to change their password right away. While hashing and salting prevent a brute-force attack of billions of attempts to be successful, a single password crack is computationally feasible. An attacker may, with tremendous amount of computational power, or by sheer luck, crack a single password, but even then, the process would be most certainly slow due to the characteristics of bcrypt, giving the company and their users precious time to change passwords.

* **Simplifying Password Management with Auth0**<br>
The main idea of password verification is to compare two hashes and determine if they match each other. The process is very complex. A solid identity strategy demands an organization to keep current with cryptographic advances, design a process to phase out deprecated or vulnerable algorithms, provide pen testing, invest in physical and network security among many others. With all factors considered, it isn't easy or inexpensive.

	You can minimize the overhead of hashing, salting and password management through Auth0. We solve the most complex identity use cases with an extensible and easy to integrate platform that secures billions of logins every month.

	Auth0 helps you prevent critical identity data from falling into the wrong hands. We never store passwords in cleartext. Passwords are always hashed and salted using bcrypt. We've built state-of-the-art security into our product, to protect your business and your users.


<br>

## Window.localStorage
This resource is documentation that is focused on Window.localStorage, a description of what it is, examples of localStorage, specifications, and browser compatiability. The documentation defines localStorage as a read-only property of the window interface allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.LocalStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed. (localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.) Below are some key concepts that I found to be important and helpful.

* **What is localStorage?**<br>
LocalStorage is a read-only property of the window interface allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.LocalStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed. (localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)

* **Syntax:** `myStorage = window.localStorage;`

* **Description of Window.localStorage:**
The keys and the values stored with localStorage are always in the UTF-16 DOMString format, which uses two bytes per character. As with objects, integer keys are automatically converted to strings. LocalStorage data is specific to the protocol of the document. In particular, for a site loaded over HTTP (e.g., http://example.com), localStorage returns a different object than localStorage for the corresponding site loaded over HTTPS (e.g., https://example.com). For documents loaded from file: URLs (that is, files opened in the browser directly from the user's local filesystem, rather than being served from a web server) the requirements for localStorage behavior are undefined and may vary among different browsers. In all current browsers, localStorage seems to return a different object for each file: URL. In other words, each file: URL seems to have its own unique local-storage area. But there are no guarantees about that behavior, so you shouldn't rely on it because, as mentioned above, the requirements for file: URLs remains undefined. So it's possible that browsers may change their file: URL handling for localStorage at any time. In fact some browsers have changed their handling for it over time.

* **Examples:**
	* The following snippet accesses the current domain's local Storage object and **adds** a data item to it using Storage.setItem().

		```
		localStorage.setItem('myCat', 'Tom');
		```
		
	* The syntax for **reading** the localStorage item is as follows:

		```
		const cat = localStorage.getItem('myCat');
		```
		
	* The syntax for **removing** the localStorage item is as follows:

		```
		localStorage.removeItem('myCat');
		```
		
	* The syntax for **removing all** the localStorage items is as follows:

		```
		localStorage.clear();
		```


<br>

## What Is JWT?
This resource is an article that is focused on JSON Web Tokens, what a JWT is, what JSON is, what tokens are, how it works, and more. The article defines JWTs as an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued. Below are some key concepts that I found to be important and helpful.

* **What is JWT?**<br>
JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.

* **What is JSON?**<br>
For beginning developers, JSON stands for JavaScript Object Notation and is a text-based format for transmitting data across web applications. It stores information in an easy-to-access manner, both for developers and computers. It can be used as a data format by any programming language and is quickly becoming the preferred syntax for APIs, surpassing XML.

* **What are Tokens?**<br>
Now that you understand JSON as a data text format, you may be wondering What are tokens? To put it simply, a token is a string of data that represents something else, such as an identity. In the case of authentication, a non-JWT based token is a string of characters that allow the receiver to validate the sender’s identity. The important distinction here is lack of meaning within the characters themselves. 

* **How JWTs Work:**<br>
JWTs differ from other web tokens in that they contain a set of claims. Claims are used to transmit information between two parties. What these claims are depends on the use case at hand. For example, a claim may assert who issued the token, how long it is valid for, or what permissions the client has been granted.

	A JWT is a string made up of three parts, separated by dots (.), and serialized using base64. In the most common serialization format, compact serialization, the JWT looks something like this: xxxxx.yyyyy.zzzzz.

	Once decoded, you will get two JSON strings:

	1. The **header** and the **payload**.
	2. The **signature**.
	 
	The JOSE (JSON Object Signing and Encryption) header contains the type of token — JWT in this case — and the signing algorithm.  

	The payload contains the claims. This is displayed as a JSON string, usually containing no more than a dozen fields to keep the JWT compact. This information is typically used by the server to verify that the user has permission to perform the action they are requesting.

	There are no mandatory claims for a JWT, but overlaying standards may make claims mandatory. For example, when using JWT as bearer access token under OAuth2.0, iss, sub, aud, and exp must be present. some are more common than others. 

	The signature ensures that the token hasn’t been altered. The party that creates the JWT signs the header and payload with a secret that is known to both the issuer and receiver, or with a private key known only to the sender. When the token is used, the receiving party verifies that the header and payload match the signature.

<br>

## State and Lifecycle
This resource is documentation that focuses on the concept of state and lifecycle in a React component. The documentation goes over many topics such as converting a function into a class, adding local state to a class, adding lifestyle methods to a class, using state correctly, and more. The documentation states that State is a plain JavaScript object used by React to represent an information about the component's current situation. It's managed in the component (just like any variable declared in a function). Below are some key concepts that I found to be important and helpful.

* State is a plain JavaScript object used by React to represent an information about the component's current situation. It's managed in the component (just like any variable declared in a function).

* **Converting a Function to a Class:** <br>

	You can convert a function component like Clock to a class in five steps:

	1. Create an ES6 class, with the same name, that extends React.Component.
	2. Add a single empty method to it called render().
	3. Move the body of the function into the render() method.
	4. Replace props with this.props in the render() body.
	5. Delete the remaining empty function declaration.

	```
	class Clock extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	```
	Clock is now defined as a class rather than a function.

	The render method will be called each time an update happens, but as long as we render <Clock /> into the same DOM node, only a single instance of the Clock class will be used. This lets us use additional features such as local state and lifecycle methods.

* **Adding Local State to a Class:**<br>

	We will move the date from props to state in three steps:

	1) Replace this.props.date with this.state.date in the render() method:

	```
	class Clock extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	```
	
	2) Add a class constructor that assigns the initial this.state:
	
	```
	class Clock extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {date: new Date()};
	  }

	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	```
	
	3) Remove the date prop from the <Clock /> element:
	
	```
	ReactDOM.render(
	  <Clock />,
	  document.getElementById('root')
	);
	```
* **Using State Correctly:**<br>
	
	There are three things you should know about setState().
		
	1. 	Do Not Modify State Directly
	2. 	State Updates May Be Asynchronous
	3. 	State Updates are Merged

* In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.



<br>

## Use Case And Use Case Testing Complete Tutorial
This resource is an article that focuses on the many apsects of user case testing, what it is, types of use cases, how to document a use case, and more. The article defines a use case as documentation of the ‘Actions’ performed by the Actor/User and the corresponding ‘Behaviour’ of the System to the User ‘Actions’. Use Cases may or may not result in achieving a goal by the ‘Actor/User’ on interactions with the system. Below are some key concepts that I found to be important and helpful.

* **What is a Use Case?**<br>
It is the documentation of the ‘Actions’ performed by the Actor/User and the corresponding ‘Behaviour’ of the System to the User ‘Actions’. Use Cases may or may not result in achieving a goal by the ‘Actor/User’ on interactions with the system. In Use Case, we will describe ‘How a System will respond to a given Scenario?’. It is ‘user-oriented’ not ‘system-oriented’.

* **Who uses ‘Use Case’ documents?**<br>
This documentation gives a complete overview of the distinct ways in which the user interacts with a system to achieve the goal. Better documentation can help to identify the requirement for a software system in a much easier way. This documentation can be used by Software developers, software testers as well as Stakeholders.

* **Types of Use Cases:**
	* There are 2 types.

		**They are:**
		
		1. Sunny Day
		2. Rainy Day

	* Sunny day Use Cases: They are the primary cases that are most likely to happen when everything does well. These are given high priority than the other cases. Once we have completed the cases, we give it to the project team for review and ensure that we have covered all the required cases.

	* Rainy day Use Cases: These can be defined as the list of edge cases. The priority of such cases will come after the ‘Sunny Use Cases’.  We can seek the help of Stakeholders and product managers to prioritize the cases.

* **Elements in Use Cases:**<br>
 
	1) **Brief description**: A brief description explaining the case.

	2) **Actor**: Users that are involved in Use Cases Actions.

	3) **Precondition**: Conditions to be Satisfied before the case begins.

	4) **Basic Flow**: ‘Basic Flow’ or ‘Main Scenario’ is the normal workflow in the system. It is the flow of transactions done by the Actors on accomplishing their goals. When the actors interact with the system, as it’s the normal workflow, there won’t be any error and the Actors will get the expected output.

	5) **Alternate flow**: Apart from the normal workflow, a system can also have an ‘Alternate workflow’. This is the less common interaction done by a user with the system.

	6) **Exception flow**: The flow that prevents a user from achieving the goal.

	7) **Post Conditions**: The conditions that need to be checked after the case is completed.




<br>


## Reference Links
### What resource(s) did you find most helpful for this research assignment and why? 

I found the resource **Hashing in Action: Understanding bcrypt** and **How To Use Axios with React** to be the most helpful for this research assignment this week. Starting with the resource **Hashing in Action: Understanding bcrypt** I found this to be useful as I have not had much practice with Bcrypt and having a comprehensive guide handy is has made going through the process of working on my login system much easier this week with my final project than it would be if I did not have a resource like this. Next, I found **How To Use Axios with React** helpful as I found this concept slightly difficult to understand before doing research this week. By reviewing this article I found some helpful information and example such as the different ways to make a request with Axios. I've used Axios only once before this project and I found that this article helped explain how Axios works in more detail. That concludes the resources that I found helpful this week and why. Although, I would like to states that I found each resource helpful but these were the highlight resources for this week.


**Getting Started Axios Docs**  
[axios-http.com](https://axios-http.com/docs/intro) 

**How To Use Axios with React**      
[digitalocean.com](https://www.digitalocean.com/community/tutorials/react-axios-react) 

**Hashing in Action: Understanding bcrypt**      
[auth0.co](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)

**Window.localStorage**      
[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

**What Is JWT?**      
[akana.com](https://www.akana.com/blog/what-is-jwt)

**State and Lifecycle**      
[reactjs.org](https://reactjs.org/docs/state-and-lifecycle.html)

**Use Case And Use Case Testing Complete Tutorial**      
[softwaretestinghelp.com](https://www.softwaretestinghelp.com/use-case-testing/)







