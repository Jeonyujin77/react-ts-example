import React, { useState, useCallback, useEffect } from "react";
import ChildComp from "./components/ChildComp";
// import { List } from "./api/sample";

export interface Fake {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// interface Comment {
//   id: number;
// }

// interface Fake2 {
//   body: string;
//   comments: Comment[];
// }

function App() {
  const [List, setList] = useState<Fake[]>([]);
  // const [item, setItem] = useState(0) // 단순 number 일때
  // const [numList, setNumList] = useState<number[]>([]) // number 배열 일때
  const [item, setItem] = useState(0);
  const [sample, setSample] = useState("");
  const [inputText, setInputText] = useState("");
  const handleApiCall = async () => {
    try {
      const fakeApi = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "GET",
        }
      );
      const data = await fakeApi.json();
      setList(data);
    } catch (e) {
      throw new Error();
    }
  };

  // Click Event Param
  const handleClickEvent = (title: string) => {
    setSample(title);
    console.log("=> title", title);
  };

  // input Change Event Type
  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    [inputText]
  );

  // form submit Event Type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  useEffect(() => {
    handleApiCall();
  }, []);
  return (
    <div>
      <h1>{item}</h1>
      Hello World
      {List.map((item) => (
        <ChildComp
          id={item.userId}
          title={item.title}
          body={item.body}
          onEvent={handleClickEvent}
          setItem={setItem}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleChangeText}
          name="text"
        />
      </form>
    </div>
  );
}

export default App;
