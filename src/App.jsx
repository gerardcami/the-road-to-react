import * as React from "react";
import "./App.css";

// Global variable will not be reloaded when the component is re-rendered

/* const greeting = 'Hello'
const title = 'React' */

/* const welcome = {
  greeting: 'Hey',
  title: 'React',
} */

/* function getTitle(title){
  return title;
} */

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  return (
    <div>
      <h1>
        {/* {welcome.greeting} {welcome.title} */}
        {/* Hello {getTitle('React')} */}
        My Hacker Stories
      </h1>

      <Search />

      <hr />

      <List list={stories} />

      {/* Use the index of the element as the key. Only use it as last resort */}
      {/* <ul>
        {list.map(function (item, index) {
          return <li key={index}>{item.title}</li>;
        })}
      </ul> */}
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  /* Event handler example in JSX */
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBlur = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      {/* Add the event handler as an attribute to the element in JSX with onChange */}
      <input
        id="search"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

/* Arrow function example */
const List = (props) => (
  <ul>
    {props.list.map((item) => {
      return <Item item={item} />;
    })}
  </ul>
);

const Item = (props) => (
  <li key={props.item.objectID}>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;
