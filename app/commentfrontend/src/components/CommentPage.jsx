
import react, {useState} from 'react';

import { Input } from "baseui/input";
    import * as React from "react";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import axios from 'axios';
import image from '..//components/image.jpg';
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";


const CommentPage = () => {
    const [value, setValue] = useState("");
     const handleComment = async(e) => {
      window.location.reload();
      e.preventDefault();
    const response = await axios.post(`http://127.0.0.1:5000/addcomment`,{
        id:1,
        text: value,
        username: "Utsav",

    })
    console.log(response);
    }
  return (
  


  <>

  
      
   

    <FlexGrid
      flexGridColumnCount={1}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale2400"
    >
      
         
          <FlexGridItem >
            Username: Utsav Koul
            </FlexGridItem>
             <FlexGridItem >

  <AspectRatioBox>
        <AspectRatioBoxBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          overrides={{
            Block: {
              style: {
                borderLeftStyle: "solid",
                borderRightStyle: "solid",
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderLeftWidth: "2px",
                borderTopWidth: "2px",
                borderRightWidth: "2px",
                borderBottomWidth: "2px",
                borderLeftColor: `grey`,
                borderTopColor: `grey`,
                borderRightColor: `grey`,
                borderBottomColor: `grey`,
              },
            },
          }}
       as="img" src={image}/>
      
      </AspectRatioBox>
             </FlexGridItem>
         
         <FlexGridItem >
         <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Comment"
      clearable
      clearOnEscape
    /> </FlexGridItem >
          <FlexGridItem>
        <Button onClick={(e)=>handleComment(e)}>Comment</Button>
</FlexGridItem>
      
    </FlexGrid>

   




</>
  );
}

export default CommentPage;