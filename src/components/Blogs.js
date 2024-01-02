import React, {useEffect, useState} from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Blogs = ({isAuth}) => {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState();

  const fetchPost = async () => {
       
        await getDocs(collection(db, "blogs"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setBlogs(newData);                
                console.log(blogs, newData);
            })
       
    }
const deleteBlog = async(id)=>{
      const postDoc = doc(db, "blogs", id)
       await deleteDoc(postDoc);
    }
    
useEffect(()=>{
    fetchPost();
},[])

  return (
    <div>

<Container className="mt-5">
  <h1 className="text-center mt-5 text-decoration-underline">Blogs</h1>
  <Row className='my-3'>
  {
  blogs?.map((blog)=>{
  return(
   <Col lg={4} md={6} sm={12} key ={blog.id}>
              <Card  className='mb-5 shadow-sm'style={{ width: '30rem', height:'25rem' }} >
                <Card.Img variant="top" src={blog.image} />
                <Card.Body>
                  <Card.Title as="h3" className="text-center">
                    {blog.title}

                  {
                    isAuth && 
                    <Button onClick={()=>deleteBlog(blog.id)} style={{float:"right"}} variant="danger">Delete</Button>
                  }
                  </Card.Title>
                  <Card.Text style={{overflow: "hidden"}}>{blog.summary}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>author: <b>{blog.author}</b></small>
                  <Button className='btn float-end'
                  onClick={()=> {navigate(`/blog/${blog.id}`)}}>
                    Read More</Button>
                </Card.Footer>
              </Card>
            </Col>
  )
  
  })
  }
   
  </Row>
  </Container>
    </div>
  )
}

export default Blogs