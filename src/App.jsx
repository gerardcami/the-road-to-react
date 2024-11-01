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

/* Custom hook declaration */
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useStorageState("search", "Reat");

  /* Using useState and useEffect hooks to manage state and side effects in React */
  /* const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") || ""
  );

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]); */

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
      <InputWithLabel
        id={"search"}
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>

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
const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  /* Imperative focus */
  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  /* Props destructuring example */
  /* const { searchTerm, onSearch } = props; */

  /* React fragment instead of div as a wrapper */
  /* You can also use React.Fragment(this is the abbreviated syntax) */
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* Add the event handler as an attribute to the element in JSX with onChange */}
      {/* Call the callback handler when the value of the input changes */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};

/* Arrow function example */
/* Spread and rest operators example */
const List = ({ list }) => (
  <ul>
    {/* Here the objectID is excluded from the list that is passed */}
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>
);

/* Spread and rest operators example */
const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

/* Nested destructuring example */
/* const Item = ({ 
  item: { 
    title, 
    url, 
    author, 
    num_comments, 
    points 
  } 
}) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
); */

export default App;
