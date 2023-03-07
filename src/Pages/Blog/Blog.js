import React from 'react';


const Blog = () => {
  return (
    <section className='lg:w-5/6 mx-auto w-full my-10'>
      <article className='drop-shadow-2xl p-5 my-10'>
        <h1 className='text-3xl mb-3'>What are the different ways to manage a state in a React application? </h1>
        <h3 className='text-xl'>The Four Kinds of React State to Manage</h3>
        <ol>
          <li>1. Local state</li>
          <li>2. Global state</li>
          <li>3. Server state</li>
          <li>4. URL state</li>
        </ol>
        <p> <span className='font-bold'>Local (UI) state</span> – Local state is data we manage in one or another component. <br />

          Local state is most often managed in React using the <strong>useState</strong> hook. <br />

          For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.</p>
        <br />

        <p><strong>Global (UI) state</strong> – Global state is data we manage across multiple components. <br />

          Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.
          <br />

          A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.

          Sometimes state we think should be local might become global.</p>
        <br />

        <p><strong>Server state</strong> – Data that comes from an external server that must be integrated with our UI state. <br />

          Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state. <br />

          There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.

          Fortunately there are tools such as SWR and React Query that make managing server state much easier.</p>
        <br />

        <p><strong>URL state</strong> – Data that exists on our URLs, including the pathname and query parameters. <br />

          URL state is often missing as a category of state, but it is an important one. <br />
          In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!

          There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.</p>
      </article>



      <article className='drop-shadow-2xl p-5 my-5' >
        <h1 className='text-3xl mb-3'>How does prototypical inheritance work?</h1>
        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
        </p>


      </article>

      <article className='drop-shadow-2xl p-5 my-5'>
        <h1 className='text-2xl mb-3'> What is a unit test? Why should we write unit tests?</h1>
        <p>
          The main objective of unit testing is to isolate written code to test and determine if it works as intended.

          Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages
        </p>
        <br />
        <p>Because The earlier a problem is identified, the fewer compound errors occur.
          Costs of fixing a problem early can quickly outweigh the cost of fixing it later.
          Debugging processes are made easier.
          Developers can quickly make changes to the code base.
          Developers can also re-use code, migrating it to new projects.
          Disadvantages include:

          Tests will not uncover every bug.
          Unit tests only test sets of data and its functionality—it will not catch errors in integration.
          More lines of test code may need to be written to test one line of code—creating a potential time investment</p>

      </article>
      <article className='drop-shadow-2xl p-5 my-5'>
        <h1 className='text-3xl mb-3'>React vs. Angular vs. Vue?</h1>
        <h3 className='font-bold'>Angular vs React</h3>
        <p>If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready. <br />

          React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React. <br />

          React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript</p>
        <br />
        <h3 className='font-bold'>React vs Vue</h3>
        <p>The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either. <br />

          Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage. <br />

          Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts</p>
        <br />

        <h3 className='font-bold'>Angular vs Vue</h3>
        <p>
          In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps. <br />

          A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps. <br />

          It should also be noted that Vue was created by a developer who formerly worked on Angular for Google, so that’s another thing to keep in mind, though that wouldn’t have a huge impact on your decision.</p>
      </article>
    </section>
  );
};

export default Blog;