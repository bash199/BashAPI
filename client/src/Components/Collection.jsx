import React from "react";
import styled from "@emotion/styled";
const Div = styled.div`
   width: 50%;
   height: 80px;
   padding: 0 10px 0 10px;
   background-color: aliceblue;
`;
const reverseGeneratedName = (name) => {
   const newName = name.substr(name.lastIndexOf("_") + 1);
   return newName;
};

const Collection = ({collection}) => {
   const name = reverseGeneratedName(collection.name);
   return (
      <Div>
         <div>{name}</div>
         <div>Documents: {collection.documentCount}</div>
         <div>
            <button>Data</button>
            <button>Edit</button>
            <button>Delete</button>
         </div>
      </Div>
   );
};

export default Collection;
