import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Redirect, useLocation} from 'react-router-dom';

function Edit() {

    const [redirect, setRedirect] = useState(false);
    let location = useLocation();

    const [course, setCourse] = useState(
        {
            "id": location.state.id,
            "title": location.state.title,
            "imagePath": location.state.imagePath,
            "price": {
                "normal": location.state.price.normal,
                "early_bird": location.state.price.early_bird
            },
            "dates": {
                "start_date": location.state.dates.start_date,
                "end_date": location.state.dates.end_date
            },
            "duration": location.state.duration,
            "open": location.state.open,
            "instructors": location.state.instructors,
            "description": location.state.description
            }
    );


    const handleChange = (event) => {
        setCourse({...course, [event.target.id]: event.target.value})
    };

    const handleChangeOpen = (event) => {
        setCourse({...course, 
          [event.target.id]: event.target.checked})
    };

    const handleChangeInstructors = (event) => {
        const options = course.instructors;
         if (event.target.checked){
              options.push(event.target.value)
         }
         else {
           let index = options.indexOf(event.target.value);
           options.splice(index, 1);
         }
         setCourse({...course,
           [event.target.id]: options })
   };


    const handleChangeDates = (event) => {
            const dates = course.dates;
            const dates_id = "dates";
            dates[event.target.id] = event.target.value;
            setCourse({...course, 
            [dates_id]: dates})
    };

    const handleChangePrice = (event) => {
            const price = course.price;
            const price_id = "price";
            price[event.target.id] = parseInt(event.target.value);
            setCourse({...course, 
            [price_id]: price})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/courses/` + location.state.id, course) 
        .then(res => {
            console.log(res);
            console.log(res.data);
            setRedirect(true);
        });
    };




    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} className='p-5 mb-4' style={{backgroundColor: '#f1f1f1'}}>
    
             <h3>Edit Course: {location.state.title}</h3>
             <br />
              <Form.Group onChange={handleChange} controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control placeholder={location.state.title}/>
              </Form.Group>    
    
              <Form.Group onChange={handleChange} controlId="duration">
                <Form.Label>Duration:</Form.Label>
                <Form.Control placeholder={location.state.duration}/>
              </Form.Group>  
    
              <Form.Group onChange={handleChange} controlId="imagePath">
                <Form.Label>Image path:</Form.Label>
                <Form.Control placeholder={location.state.imagePath}/>
              </Form.Group>  
    
              <Form.Group  controlId="open" >
                 <Form.Check type="checkbox" label="Bookable" onChange={handleChangeOpen} checked={course.open} />
              </Form.Group>
    
              <hr/>
    
              <h3>Instructors</h3>
    
              <Form.Group controlId="instructors" >
                 <Form.Check type="checkbox" label="John Tsevdos" name="01" value="01" checked= {course.instructors.includes("01")} onChange={handleChangeInstructors} />
                 <Form.Check type="checkbox" label="Yannis Nikolakopoulos" name="02" value="02" checked={course.instructors.includes("02")} onChange={handleChangeInstructors} />
              </Form.Group>
             
              <hr/>
    
              <Form.Group onChange={handleChange} controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control placeholder={location.state.description} as="textarea" rows="2"/>
              </Form.Group>  
    
              <hr/>
    
              <h3>Dates</h3>
    
              <Form.Group onChange={handleChangeDates} controlId="start_date">
                <Form.Label>Start date:</Form.Label>
                <Form.Control placeholder={location.state.dates.start_date}/>
              </Form.Group>  
    
              <Form.Group onChange={handleChangeDates} controlId="end_date">
                <Form.Label>End date:</Form.Label>
                <Form.Control placeholder={location.state.dates.end_date}/>
              </Form.Group> 
    
              <hr/>
    
              <Form.Group onChange={handleChangePrice} controlId="early_bird">
                <Form.Label>Early Bird:</Form.Label>
                <Form.Control placeholder={location.state.price.early_bird}/>
              </Form.Group>  
    
              <Form.Group onChange={handleChangePrice} controlId="normal">
                <Form.Label>Normal Price:</Form.Label>
                <Form.Control placeholder={location.state.price.normal}/>
              </Form.Group> 
    
              <hr/>
    
              <Form.Group>
                 <Button type="submit" className="btn btn-primary float-right"> Update </Button>
              </Form.Group>
              
    
            
            </Form>
        </React.Fragment>
      );
};

export default Edit;