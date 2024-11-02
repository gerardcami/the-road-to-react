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
  const initialStories = [
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

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "SET_STORIES":
        return action.payload;
      case "REMOVE_STORY":
        return state.filter(
          (story) => action.payload.objectID !== story.objectID
        );
      default:
        return state;
    }
  };

  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "SET_STORIES",
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  /* Callback handler */
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

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

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}

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
const List = ({ list, onRemoveItem }) => (
  <ul>
    {/* Here the objectID is excluded from the list that is passed */}
    {/* {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))} */}

    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

/* Spread and rest operators example */
/* const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
); */

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
