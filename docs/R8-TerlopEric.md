# Final Project 

* **RESEARCH - Research & Integrative Activity (Research 11) - Week 8**
* **Eric Terlop**
* **03/27/2022**

<br>


## Clean Code vs. Dirty Code: React Best Practices
This resource is an article that focuses on clean code practices, what clean code is, what it means for clean code to pass the smell tests, and much more. The article defines clean code as a consistent style of programming that makes your code easier to write, read, and maintain. Below are some key concepts and notes that I found useful from this resource.

* **What is clean code?**<br>
Clean code is a consistent style of programming that makes your code easier to write, read, and maintain. Often a developer spends time on a problem, and once the problem is solved, they make a pull request. I contend that you aren’t done just because your code “works.”. In simpler terms, write code that you would be proud to take home and show your mother.

* **Clean code passes the “smell test”**<br>
Clean code should pass the smell test. What do I mean by that? We’ve all looked at code (our own or others’) and said, “Something’s not quite right here.” Remember, if it doesn’t feel right, it probably isn’t. Code that’s well thought out just comes together. If it feels like you’re trying to fit a square peg into a round hole, then pause, step back, and take a break. Nine times out of 10, you’ll come up with a better solution.

* **Clean code is DRY**<br>
DRY is an acronym that stands for “Don’t Repeat Yourself.” If you are doing the same thing in multiple places, consolidate the duplicate code. If you see patterns in your code, that is an indication it is prime for DRYing. Sometimes this means standing back from the screen until you can’t read the text and literally looking for patterns.

	```
	// Dirty
	const MyComponent = () => (
	  <div>
	    <OtherComponent type="a" className="colorful" foo={123} bar={456} />
	    <OtherComponent type="b" className="colorful" foo={123} bar={456} />    
	  </div>
	);
	```

	```
	// Clean
	const MyOtherComponent = ({ type }) => (
	  <OtherComponent type={type} className="colorful" foo={123} bar={456} />
	);
	const MyComponent = () => (
	  <div>
	    <MyOtherComponent type="a" />
	    <MyOtherComponent type="b" />
	  </div>
	);
	```
	
	Sometimes – as in our example above – DRYing your code may actually increase code size. However, DRYing your code also generally improves maintainability.

	Be warned that it’s possible to go too far with DRYing up your code, so know when to say when.
	
* **Clean code is self-commenting**<br>
Has this happened to you before? You wrote some code and made sure that it was fully commented. As will happen, you found a bug, so you went back and changed the code. Did you remember to change your comments as well to reflect the new logic? Maybe. Maybe not. The next person who looked at your code then may have gone down a rabbit hole because they focused on the comments.

	Add comments only to explain complex thoughts; that is, don’t comment on the obvious. Fewer comments also reduces visual clutter.
	
	```
	// Dirty
	const fetchUser = (id) => (
	  fetch(buildUri`/users/${id}`) // Get User DTO record from REST API
	    .then(convertFormat) // Convert to snakeCase
	    .then(validateUser) // Make sure the the user is valid
	);
	```
	
	In the clean version, we rename some of the functions to better describe what they do, thus eliminating the need for comments and reducing visual clutter. This limits the potential confusion of the code not matching the comments later.
	
	```
	// Clean
	const fetchUser = (id) => (
	  fetch(buildUri`/users/${id}`)
	    .then(snakeToCamelCase)
	    .then(validateUser)
	);
	```


<br>

## Code Refactoring Best Practices: When (and When Not) to Do It
This resource is an article that focuses on refactoring code and the best practices when doing so. The article covers many topics related to refactoring such as when you should consider refactoring, how to perform code refactoring, the methods related to refactoring, and much more. The article defines refactoring as a process used in the DevOps software development approach that involves editing and cleaning up previously written software code without changing the function of the code at all. Below are some key concepts and notes that I found useful from this resource.

* **What is refactoring?**<br>
Code refactoring is a process used in the DevOps software development approach that involves editing and cleaning up previously written software code without changing the function of the code at all. The basic purpose of code refactoring is to make the code more efficient and maintainable. This is key in reducing technical cost since it’s much better to clean up the code now than pay for costly errors later. Code refactoring, which improves readability, makes the QA and debugging process go much more smoothly. And while it doesn’t remove bugs, it can certainly help prevent them in the future.
	

* **When should you consider software refactoring?**<br>
The best time to consider refactoring is before adding any updates or new features to existing code. Going back and cleaning up the current code before adding in new programming will not only improve the quality of the product itself, it will make it easier for future developers to build on the original code.


* **Code Refactoring: The Main Techniques**<br>

	* **Red-Green-Refactor**<br>
 	One of the most widely used techniques for code refactoring is the red/green process used in Agile test-driven development. Applying the Red-Green-Refactor method, developers break  refactoring down into three distinct steps:
		1. Stop and consider what needs to be developed. [RED]
		2. Get the development to pass basic testing. [GREEN]
		3. Implement improvements. [REFACTOR]

	![Red-Green-Refactor](https://content.altexsoft.com/media/2018/09/red-green-refactor.png)
	
	* **Refactoring by Abstraction**<br>
	Branching by abstraction is a method used primarily when there is a large amount of refactoring to be done. Abstraction involves class inheritances, hierarchy, and extraction. The goal of abstraction is to reduce unnecessary duplications in software code. One example of abstraction is the Pull-Up/Push-Down method. These are two opposite forms of refactoring involving classes. The Pull-Up method pulls code parts into a superclass in order to eliminate code duplication. Push-Down takes it from a superclass and moves it down into subclasses.
	
	![Refactoring by Abstraction](https://content.altexsoft.com/media/2018/09/by-abstraction.png)
	
	* **Composing Method**
	Composing involves streamlining the code in order to reduce duplications. This is done through various processes, including extraction and inline methods.
	
		* **Extraction:** involves breaking down the code into smaller chunks in order to find and “extract” fragmentation. The fragmented code is then moved to a separate method and replaced with a call to this new method. In addition to the method, extraction can involve class, interface, and local variables as well.

		
		* **Inline:** refactoring is a way to reduce the number of unnecessary methods while simplifying the code. By finding all calls to the method and replacing them with the content of the method, the method can then be deleted.

* **When you don’t need refactoring**<br>
Earlier we stressed that refactoring should never affect the performance of an application and that it should only serve as a clean-up effort. There are times, however, when an application needs to be completely revamped from the start. In these cases, refactoring is not necessary, as it would be much more efficient to simply start from scratch.

* **Best practices for code refactoring**<br>
There are several best practices and recommendations regarding code refactoring. One of the smartest ways to approach it is to apply the Agile method and do it one step at a time, followed by testing. This is why so many developers utilizing Agile methodology are big proponents of code refactoring. Breaking down the refactoring process into manageable chunks and performing timely testing before moving on to other updates always results in a higher quality application and a better overall development experience.	
	


<br>


## Writing Good Comments
This resource is an article that focuses on writing good code comments. The article covers many different topics related to code comments such as self-documenting code doesn't exist, software is hard, anatomy of a comment, redundant comments focus on the wrong information, and much more. The article defines code documentation are comments that are used to describe global variables, functions, and modules (plus their object-oriented counterparts) from the outside point of view. Below are some key concepts that I found helpful from the article. 

* Code documentation is a lot like error handling, we are told early on how it’s important and necessary, but we fail to understand why and instead grow to resent doing it again for that same old teacher, supervisor, or annoying teammate. But just like error handling, we are the ones who can actually benefit the most from it — if done right. But in order to do it right, we need to face some harsh truths and start admitting that there is no such thing as self-documenting code, and maybe we simply don’t understand what we’re actually doing if we can’t manage to write a few words about it.

* Having self-explanatory names for your variables, methods, classes, functions, modules, etc. doesn’t automatically describe the big picture of the code, nor does is necessarily tell much about the why and in what way parts. However, having a clear and well-written implementation tends to give the illusion that there’s no need for that either. And yes, after spending hours or days wrapping your head around the issue at hand, of course that code will make perfect sense in the very moment, even more so if you pack it all neatly into a reasonably sized commit or pull request that presents your solution in a condensed and coherent manner. But how about in a month from now? Or outside the context of that self-contained commit? Or when approaching it with a slightly shifted mindset? How much details will you remember, and how much sense will it all still make then?

* One can (and will) argue that “the code is right there, just read it and you’ll know”, and again, if we’re talking about what a specific block of code does, then yes, that attitude is justified. But for anything beyond that, digging through code is an unnecessary waste of time, and is essentially like saying a book doesn’t need an index, just read the whole thing and you’ll eventually find what you’re looking for. Do you really want to mentally parse every path some data could take to find out about its valid ranges, when a single sentence that takes a minutes to write and even less to read could just tell you directly?

	Software just isn’t fully and universally self-documenting by itself, no matter how hard you try. And that’s neither your fault, nor me trying to be a bully and question your abilities, but it’s simply about being human, and about underestimating both the full complexity of software and the volatility of our mind. Documentation isn’t about shaming and pointing out shortcomings in your implementation, but about countering the shortcomings of the programming language itself. Even the cleanest code ever written couldn’t explain by itself what you were actually thinking when writing it. Everything might be perfect and still do the wrong thing. Comments aren’t an alternative to writing clean code, but an inherent part of it.

* **Anatomy Of A Comment**

	```
	//Javadoc-style documentation comment.
	
	void foo(void) {
	    if (bar > 10) {
	        /* regular comment */
	        ...
	    }
	}
	```


	Regular comments are just that: comments as defined by the language itself. As a rule of thumb, they should be used sparsely as they tend to explaining what the code is doing.

	Documentation comments on the other hand are used to describe global variables, functions, and modules (plus their object-oriented counterparts) from the outside point of view. Inside a function body, they basically turn into regular comments and tools will generally ignore them. As a good practice, if there’s something worth telling on the inside of the function, see if it could be worked into the function description itself.

	Documentation comments are essentially regular comments with some extra accessories, such as an additional forward slash /// doc comment, exclamation marks //! doc comment, or an additional asterisk as in Javadoc-style comments /** doc comment */. Despite its name, Javadoc as a commenting style is also supported by other languages and tools.
	
* **Make Comments Part Of The Code**<br>
Now is a good moment to throw in another favorite of “comments are bad” rhetoric: they get outdated when the code changes. Let’s be real though, that’s just a seriously lazy excuse, it’s not like code is usually written with a lot of consideration about ever having to touch it again in the future. Once committed and merged, the code is final and perfect, to remain as-is for all eternity.

	The bigger issue with code documentation is that it’s seen as something that exists beside the actual code, completely decoupled from it. But if we start seeing it as actual part of the code, a complementing entity and not some dumbed-down summary for anyone incapable of dealing with the real thing, it will become natural to simply adjust it whenever the code changes.

	And yes, that includes private methods and static code in C. It’s such a major misconception to claim that they contain irrelevant implementation details that require no documentation, or are anyway not exposed to the “consumers” of the code. Well, at least the latter part might be true if we consider the users of libraries, APIs, and the like, but what about the developers? After all, private functions are usually the place where all the interesting details happen, the number crunching, data juggling, all the little secrets — and with it the parts that usually require the most maintenance.

	Scope should have nothing to do with the relevance or existence of information, but this just shows how the general mindset towards code documentation sees it as something that is intended for anyone else but ourselves.


<br>

## Understanding the Pareto principle (The 80/20 rule)
This resource is an article that focuses on the Pareto principle (also known as the 80/20 rule). The article covers a few topics related to the Pareto principle such as how to use the 80/20 rule, advantages of using this principle, disadvantages of using this principle, and more. The article dfines the Pareto principle as a phenomenon that states that roughly 80% of outcomes come from 20% of causes. In this article, we break down how you can use this principle to help prioritize tasks and business efforts. Below are some key concepts that I found helpful from the article.

* **What is the Pareto principle?**<br>
The Pareto principle states that for many outcomes, roughly 80% of consequences come from 20% of causes. In other words, a small percentage of causes have an outsized effect. This concept is important to understand because it can help you identify which initiatives to prioritize so you can make the most impact.

* **Where does the Pareto principle come from?**<br>
The Pareto principle was developed by Italian economist Vilfredo Pareto in 1896. Pareto observed that 80% of the land in Italy was owned by only 20% of the population. He also witnessed this happening with plants in his garden—20% of his plants were bearing 80% of the fruit. This relationship is best mathematically described as a power law distribution between two quantities, in which a change in one quantity results in a relevant change into the other.

* **How to use the 80/20 rule**<br>
While the 80/20 rule applies to almost every industry, the Pareto principle is commonly used in business and economics. This is because the 80/20 rule is helpful in determining where you can focus your efforts to maximize your output. 

	The basis of the Pareto principle states that 80% of results come from 20% of actions. If you have any kind of work that can be segmented into smaller portions, the Pareto principle can help you identify what part of that work is the most influential.
	
	* **Productivity:**<br>
	You can use the 80/20 rule to prioritize the tasks that you need to get done during the day. 

	The idea is that out of your entire task list, completing 20% of those tasks will result in 80% of the impact you can create for that day. So in order to get the most impact done, identify which tasks have the most impact for your team and focus on those for the day.

	To do this, list out all of the things that you need to get done that day. Then identify which of those tasks have the highest impact. Do any of your tasks involve collaborating with other teammates? Are there any tasks on your plate that are blocking projects from moving forward? These tasks may be simple in execution, but they can make a large impact to the rest of the team by allowing the process to keep flowing. 
	
	* **Decision Making:**<br>
The Pareto principle can help you to make the best decisions during the problem-solving process. When there are many different causes to one problem, the Pareto principle can help you prioritize solutions. Here are a few steps to how this works:

	1. Identify the problems that your team is experiencing. These are the problems that you're trying to find a solution to within this decision making process.
	
	2. Identify the causes of these problems. Using a tool like the 5 Whys process, find all of the causes of the problems you're trying to solve.
	
	3. Categorize your problems into similar groups. If some of the causes of the problems you're trying to solve can fall into similar categories, use this as an opportunity to group them together. This can help you decide if one solution can resolve multiple issues. 
	
	4. Assign a value to each of these problems based on the impact to the business. The value can be as simple as a number between 1-10, or actual monetary value to indicate the importance.
	
	5. Develop a plan to focus on the top 20% of the problems that impact the business. The idea is that one solution can resolve multiple problems. Based on the values you assigned to each problem, calculate which ones are in the top 20%. Once you’ve identified the main problem, develop a plan to create a solution that can result in 80% of the results using problem-solving strategies.

	
* **Advantages of using the Pareto principle**<br>
The biggest advantage of using the Pareto principle is that you can create the maximum amount of impact with the least amount of work. This can allow your team to work more efficiently and stay focused on specific initiatives. 

	The 80/20 rule can help your metrics increase in less time, simply by prioritizing initiatives in the right order.

	**Other benefits of using the Pareto principle:**
	* Clear priorities both for you and your team
	* Increased daily productivity	
	* Ability to portion your work into manageable segments
	* More focused strategy

* **Disadvantages of using the 80/20 rule**<br>
There's a common misinterpretation of the Pareto principle that with 20% of effort, you can achieve 80% of the results. This is not necessarily the case. The 20 and 80% numbers don’t refer to the amount of effort you’re putting in, but the causes and consequences you’re working on. The goal is not to minimize the amount of effort, but to focus your effort on a specific portion of work to create a bigger impact. You still have to put 100% of effort into that 20% of focus to achieve 80% of results.

	Another downside of the 80/20 rule is that sometimes team members can get too focused and lose sight on other tasks. If you only focus on the important tasks and put aside the less important tasks, like email and other correspondence, things can get lost. The challenge is finding the right balance of using the 80/20 rule, and getting through the rest of your tasks—even if they don't result in 80% of results. To combat this, you can use techniques like timeboxing or the Getting Things Done (GTD) method. 

<br>

## How to deploy a NodeJS app to Heroku from Github
This resource is an article that focuses on guiding a user through the process of connecting a repo to a Heroku server that will auto-deploy anytime a push occurs to a specific branch. The article breaks down the steps as follows: 1) Create that cool app, 2) Push to GitHub, and 3) Deploy to Heroku.

Create a Node.js app and in the package.json file paste the below content. This file is basic information of our package:

```
{
  "name": "coolnodeapp",
  "version": "1.0.0",
  "description": "node app ",
  "main": "app.js",
  "scripts": {
  "start": "node app.js"
},
  "repository": {
  "type": "git",
  "url": ""
},
  "author": "",
  "license": "ISC",
  "bugs": {
  "url": ""
},
  "homepage": ""
}
```
One very important change to notice is this line:
```
"start": "node app.js"
```

After the deployment, Heroku will run this command to start your application. Add a file, app.js, and paste the below code. This will be the starting point of our app.

```
const http = require('http');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});
```
This code is basically opening a port on the local server and serving some HTML.

<br>

## What is Heroku?
This resource is an article that focuses on explaining what Heroku is and how it works. The article dives into more detail about what Heroku is and also what it is not. The article breaks down some positives and benefits of using Heroku. Below are some key concepts that I found helpful from the article.

* Heroku is known for running apps in dynos – which are really just virtual computers that can be powered up or down based on how big your application is. Think of dynos as malleable building blocks for running your app.


* AWS is an Infrastructure as a Service(IaaS) provider, meaning they are responsible for managing large, shared data centers. These data centers are what we call “the cloud”. Companies like AWS, Azure, and Google have all created IaaS so that developers can pay to host their applications in these data centers instead of building servers themselves.


* Heroku is open and extensible so developers can build in whichever language they choose. Whether that’s Nodejs, Ruby, PHP, Python, Java, it doesn’t matter.

<br>

## Creating a Production Build
This resource is a document that focuses on what the react build script does when we want to use the production-ready version of our code. Below are some key concepts that I found helpful from the documentation.

* `npm run build` creates a `build` directory with a production build of your app. Inside the `build/static` directory will be your JavaScript and CSS files. Each filename inside of build/static will contain a unique hash of the file contents. This hash in the file name enables long-term caching techniques.


* When running a production build of freshly created Create React App application, there are a number of .js files (called chunks) that are generated and placed in the build/static/js directory:
`main.[hash].chunk.js`


* These files can either be vendor code, or code splitting chunks. Vendor code includes modules that you've imported from within `node_modules`. One of the potential advantages of splitting your vendor and application code is to enable long-term caching techniques to improve application loading performance. Since vendor code tends to change less often than the actual application code, the browser will be able to cache them separately, and won't re-download them each time the app code changes.

* Static File Caching: Each file inside of the `build/static` directory will have a unique hash appended to the filename that is generated based on the contents of the file, which allows you to use aggressive caching techniques to avoid the browser re-downloading your assets if the file contents haven't changed. If the contents of the file change in a subsequent build, the filename hash that is generated will be different.

* Profiling: ReactDOM automatically supports profiling in development mode for v16.5+, but since profiling adds some small additional overhead it is opt-in for production mode. You can opt-in by using the `--profile` flag. Use `npm run build -- --profile` or `yarn build --profile` to enable profiling in the production build. See the React docs for details about profiling using the React DevTools.

<br>

## Reference Links
### What resource(s) did you find most helpful for this research assignment and why? 

I found the resource **Code Refactoring Best Practices: When (and When Not) to Do It** and **Writing Good Comments** to be the most helpful for this research assignment this week. Starting with the resource **Code Refactoring Best Practices: When (and When Not) to Do It** I found this to be useful as it gave me a deeper understanding of code refactoring. I also learned the many different refactoring methods and the benifits of using each one. Next, I found **Writing Good Comments** helpful as I feel this is where I feel I can grow the most. I am learning how to write better code comments so they add value to a project rather than take up space, the article gives many examples what what to do and what not to do. This will be very helpful as I refactor my final project and add good code comments to each file. That concludes the resources that I found helpful this week and why. Although, I would like to states that I found each resource helpful but these were the highlight resources for this week.


**Clean Code vs. Dirty Code: React Best Practices**  
[americanexpress.io](https://americanexpress.io/clean-code-dirty-code/) 

**Code Refactoring Best Practices: When (and When Not) to Do It**      
[altexsoft.com](https://www.altexsoft.com/blog/engineering/code-refactoring-best-practices-when-and-when-not-to-do-it/)

**Writing Good Comments**      
[hackaday.com](https://hackaday.com/2019/03/05/good-code-documents-itself-and-other-hilarious-jokes-you-shouldnt-tell-yourself/)

**Understanding the Pareto principle (The 80/20 rule)**      
[asana.com](https://asana.com/resources/pareto-principle-80-20-rule) 

**How to deploy a NodeJS app to Heroku from Github**  
[freecodecamp.org](https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/) 

**What is Heroku?**      
[trifinlabs.com](https://trifinlabs.com/what-is-heroku/)

**Creating a Production Build**      
[create-react-app.dev](https://create-react-app.dev/docs/production-build/)







