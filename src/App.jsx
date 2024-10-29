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

  const [searchTerm, setSearchTerm] = React.useState("");

  /* Callback handler */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /* Filter function */
  /* Could also be an arrow function */
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>
        {/* {welcome.greeting} {welcome.title} */}
        {/* Hello {getTitle('React')} */}
        My Hacker Stories
      </h1>

      {/* Pass the callback handler as a prop to the Search child component */}
      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      {/* We can also add de searchTerm here directly instead of passing it as a prop to the Search child component */}
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>

      <hr />

      <List list={searchedStories} />

      {/* Use the index of the element as the key. Only use it as last resort */}
      {/* <ul>
        {list.map(function (item, index) {
          return <li key={index}>{item.title}</li>;
        })}
      </ul> */}
    </div>
  );
};

/* We can also destructure the props in the component signature */
/* This can help us avoiding using the block body */
const Search = ({ onSearch, searchTerm }) => (
  /* Props destructuring example */
  /* const { searchTerm, onSearch } = props; */

  <div>
    <label htmlFor="search">Search: </label>
    {/* Add the event handler as an attribute to the element in JSX with onChange */}
    {/* Call the callback handler when the value of the input changes */}
    <input id="search" type="text" value={searchTerm} onChange={onSearch} />

    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
);

/* Arrow function example */
const List = ({ list }) => (
  <ul>
    {list.map((item) => {
      return <Item key={item.objectID} item={item} />;
    })}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;
