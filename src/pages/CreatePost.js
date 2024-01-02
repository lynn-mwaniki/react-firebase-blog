import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap';

const CreatePost = ({isAuth}) => {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()


  useEffect(()=>{
      if(!isAuth){
        navigate('/login')
      }
  }, [])
  const addBlog = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "blogs"), {
              title: title, 
              summary : summary,
              content :content, 
              author : auth.currentUser.email ,
            });
            navigate('/')
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
  return (
    <div>
       <Container className='p-2'>
        <Row className='vh-100 d-flex justify-content-center '>
          <Col md={8} lg={6} xs={12}>
      <h3>New Blog</h3>
      <form onSubmit={addBlog} className='d-flex flex-column'>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title"
        onChange={(e)=> setTitle(e.target.value)}/><br/>
        <label htmlFor="summary">summary: </label>
        <textarea className='textArea' name="summary" id="summary" 
        onChange={(e)=> setSummary(e.target.value)}
        ></textarea><br/>
        <label htmlFor="content">Content: </label>
        <textarea className='textArea'name="content" id="content" 
        onChange={(e)=> setContent(e.target.value)}
        ></textarea><br/>
        <Button type="submit" style={{width:"5rem"}}>Submit</Button>

      </form>
      </Col>

        </Row>
            
     </Container>
    </div>
  )
}

export default CreatePost