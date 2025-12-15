import React, { useState, useEffect } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

import { MdDelete } from "react-icons/md";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

export default function CommentList() {
  const [css] = useStyletron();
  
  // 1️⃣ Initialize as empty array
  const [TaskList, setTaskList] = useState([]);

  const handleTaskList = async () => {
   
    try {
      const response = await axios.get("http://127.0.0.1:5000/tasks");

      // 2️⃣ Set state correctly
      setTaskList(response.data);

      // This will log correct API data
      console.log("API data:", response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
   


  };
  const handlelike = async(commentid) => {
    console.log("Like button clicked");
    const response = await axios.post(`http://127.0.0.1:5000/likecomment/${commentid}`,{});
    console.log(response);
          window.location.reload();

  }
  const handledislike = async(commentid) =>{
    console.log("Dislike button clicked");
    const response = await axios.post(`http://127.0.0.1:5000/dislikecomment/${commentid}`,{});
    console.log(response);
          window.location.reload();


}
const handleDelete = async(taskid) => {
  console.log("Delete button clicked");
  const response = await axios.post(`http://127.0.0.1:5000/deletetask/${taskid}`,{});
  console.log(response);
        window.location.reload();
}
  useEffect(() => {
    handleTaskList();
  }, []);

  // 3️⃣ Use useEffect to see updated state
  useEffect(() => {
    console.log("Updated state:", TaskList);
  }, [TaskList]);

  return (
    <ul
      className={css({
        width: "375px",
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      {TaskList.map((task) => (
        <ListItem key={task.id}>
           
         
          
          <ListItemLabel  className={css({
       justifyContent: "space-between",
       alignItems: "center",
        display: "flex",
        justifyItems: "center",
      })} >
        <FlexGrid
      flexGridColumnCount={2}
      flexGridColumnGap="scale4800"
      flexGridRowGap="scale800"
    >
      
        <FlexGridItem >
        <div className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
        gap: "8px",

      })}>
        
            <FaRegUserCircle  />

            <strong>{task.title}:</strong> {task.discription}
            </div>
           
            
             {/* <div className={css({
        display: "flex",
        alignItems: "right",
        gap: "8px",
      })}>
            <button onClick={()=>handlelike(task.id)}>
              
             
            <SlLike />
            </button >
            {comment.likes}
            <button onClick={()=>handledislike(comment.id)}>
            <SlDislike />
            </button >
            {comment.dislikes}
            </div> */}
            </FlexGridItem>
            <FlexGridItem >
<div className={css({
        display: "flex",
        alignItems: "right",
        gap: "8px",
      })}>
        {/* {task.timeStamp} */}
  <button onClick={()=>handleDelete(task.id)}>
    <MdDelete />

  </button>
</div>
            </FlexGridItem>
             </FlexGrid>
          </ListItemLabel>
         
        </ListItem>
      ))}
    </ul>
  );
}
