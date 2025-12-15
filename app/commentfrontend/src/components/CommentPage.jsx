
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
    const [discription, setDiscription] = useState("");
     const handleAddTask = async(e) => {
      window.location.reload();
      e.preventDefault();
      const task={
        title:value,
        discription:discription
      }
    const response = await axios.post(`http://127.0.0.1:5000/addtask`, task);
    console.log(task);
    console.log(response);
    }
  return (
  


  <>

    <FlexGrid
      flexGridColumnCount={1}
      flexGridColumnGap="scale100"
      flexGridRowGap="scale100"
    >
      
         
          <FlexGridItem >
            Username: Utsav Koul
            </FlexGridItem>
             
         <FlexGridItem >
         <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Title"
      clearable
      clearOnEscape
    /> </FlexGridItem >
    <FlexGridItem >
         <Input
      value={discription}
      onChange={e => setDiscription(e.target.value)}
      placeholder="Discription"
      clearable
      clearOnEscape
    /> </FlexGridItem >
          <FlexGridItem>
        <Button onClick={(e)=>handleAddTask(e)}>Add Task</Button>
</FlexGridItem>
      
    </FlexGrid>

   




</>
  );
}

export default CommentPage;