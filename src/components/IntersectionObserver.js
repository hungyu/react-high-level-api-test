// 100個images怎麼處理
// chrome 80: lazy
// 		intersectionObserver (true of false if in view port)
// 		progressive image design
// 


import React, { useEffect, useRef, useState, useLayoutEffect, createRef } from "react";

const useIntersectionObserver = (componentRef) => {
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowed(true);
        } else {
          setShowed(false);
        }
      },
      {
        rootMargin: "0px 0px 200px 0px"
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [componentRef]);

  return showed;
};

const list = ["123"];

export default function App() {
  const [contentList, setContentList] = useState(list);
  const loadmoreRef = useRef(null);
  const isShowed = useIntersectionObserver(loadmoreRef);
  console.log(isShowed);
  useEffect(() => {
    if (isShowed) {
      setTimeout(() => {
        setContentList([...contentList, list]);
      }, 100);
    }
  }, [isShowed, contentList]);

  return (
    <div>
      <ul>
        {contentList.map((l) => {
          return <li>{l}</li>;
        })}
      </ul>
      <div ref={loadmoreRef}></div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
