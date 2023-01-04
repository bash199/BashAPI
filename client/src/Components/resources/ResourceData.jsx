import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
import {Btn, FormBox, Overlay} from "./NewResource";

const ButtonBox = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: end;
`;

const TextBox = styled.div`
   width: 100%;
   height: 90%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: center;
`;

const TextArea = styled.textarea`
   width: 100%;
   min-width: 40%;
   max-height: 90%;

`;

const ResourceData = ({setData, collection}) => {
   const [recivedData, setReciveData] = useState(null);
   const [token] = useState(localStorage.getItem("BashApitoken"));
   const collecName = reverseGeneratedName(collection.name);

   useEffect(() => {
      const getData = async () => {
         try {
            const {data} = await Api.get(`/doc/${token}/${collecName}`);
            // console.log(data);
            setReciveData(data);
         } catch (err) {
            console.log(err);
         }
      };
      getData();
      // eslint-disable-next-line
   }, []);

   return (
      <div>
         <Overlay>
            <FormBox>
               <ButtonBox>
                  <Btn onClick={() => setData((prev) => !prev)}>X</Btn>
               </ButtonBox>

               <p>
                  data for <b>{collecName}</b> resource.
               </p>
               <TextBox>
                  <TextArea
                     readOnly={true}
                     value={
                        recivedData
                           ? JSON.stringify(recivedData, null, 2)
                           : "Loading Data..."
                     }
                  ></TextArea>
               </TextBox>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default ResourceData;
