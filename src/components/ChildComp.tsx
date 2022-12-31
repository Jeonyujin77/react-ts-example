import React, { Dispatch, SetStateAction } from "react";

interface Body {
  id: number;
  title: string;
}

interface Body2 extends Body {
  body: string;
}

interface Body3 extends Body2 {
  comment: string;
}

// 부모 Props에서 받아오는 타입을 interface로 지정해줌
interface Props {
  id: number;
  title: string;
  body: string;
  onEvent: (title: string) => void;
  setItem: Dispatch<SetStateAction<number>>;
  //   id: number; // id는 number 타입으로 받을 것.
  //   title: string; // title은 string 타입으로
  //   description: string; // description도 string 타입으로
}
const ChildComp: React.FC<Props> = ({ id, title, body, onEvent, setItem }) => {
  return (
    <div>
      <span onClick={() => setItem(id)}>{id}</span>
      <p onClick={() => onEvent(title)}>{title}</p>
      <span>{body}</span>
    </div>
  );
};

export default ChildComp;
