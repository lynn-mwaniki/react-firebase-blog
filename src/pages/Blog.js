import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { Button, Card,Container} from 'react-bootstrap';

const Blog = ({isAuth}) => {
  const {id} = useParams();
  const [post, setPost] = useState([])
  let navigate = useNavigate();

 const singlePost = doc(db, "blogs", id)

  const singleBlog =async() =>{
   const displayPost= await getDoc(singlePost)
   console.log(displayPost.data())
    setPost(displayPost.data())
  }

  const deleteBlog = async(id)=>{
       await deleteDoc(singlePost);
       navigate("/")
    }
  useEffect(()=>{
singleBlog();
  },[])
  return (
        <div >
      <Container className='p-4'>
            <Card >
            <Card.Img
             className='img-fluid rounded-start' />
            <Card.Body >
              <Card.Title className='text-center'>
              <h5>{post.title}</h5><br/>
               <p> by: <b>{post.author}</b></p>
              </Card.Title>
              {/* <p style={{fontSize:'small'}}>{new Date().toLocaleDateString()}</p> */}
              
             <Button variant="success" style={{float:"left"}}
             onClick={()=>navigate("/")}> back</Button>
             {isAuth && 
             <Button variant="danger" style={{float:"right"}}
              onClick={()=>deleteBlog(post.id)}> delete</Button>}
              
              <br/>
              
              <hr/>
              <Card.Text>
              <div>
                {post.content}
                </div> 
               
              </Card.Text>
            </Card.Body>
          </Card>
            
     </Container>
    </div>
  )
}

export default Blog