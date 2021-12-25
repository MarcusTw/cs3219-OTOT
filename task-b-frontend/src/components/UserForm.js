import { React, useState } from 'react';
import { Button, Form, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'
import { IMAGE_ONERROR } from '../environment';
import { POST_USER, PUT_USER } from '../routes';

const UserForm =  ({user, isCreate, editCallback}) => {

    const [newName, setName] = useState(user ? user.name : "");
    const [newAge, setAge] = useState(user ? user.age : null);
    const [newHobbies, setHobbies] = useState(user ? user.hobbies : "");
    const [newDepartment, setDepartment] = useState(user ? user.department : "");
    const [url, setUrl] = useState(user ? user.picture : "");

    const handlePost = (e) => {
        e.preventDefault();
        if (newName === "" || newAge === null || url === "" || newHobbies === "" || newDepartment === "") {
            console.log("Error");
        }
        const newUser = {
            name: newName,
            age: newAge,
            picture: url,
            hobbies: newHobbies,
            department: newDepartment,
        };

        setName(""); setAge(null); setHobbies(""); setDepartment(""); setUrl("");

        POST_USER(newUser);
    }

    const handlePut = (e) => {
        e.preventDefault();
        if (newAge === null || url === "" || newHobbies === "" || newDepartment === "") {
            console.log("Error");
        }
        const editedUser = {
            name: newName,
            age: newAge,
            picture: url,
            hobbies: newHobbies,
            department: newDepartment,
        };

        setName(""); setAge(null); setHobbies(""); setDepartment(""); setUrl("");

        PUT_USER(editedUser);
        editCallback(editedUser.name);
    }

    return (
        <Form className="GeneralBox" onSubmit={e => isCreate ? handlePost(e) : handlePut(e)}>
            <Form.Label> 
                {isCreate ? "Create new user" : "Edit user"}
            </Form.Label>
            <Image className="mb-3" src={url} roundedCircle fluid onError={ IMAGE_ONERROR } />
            <Form.Group className="mb-3" controlId="userName">
                <Form.Control value={newName} type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userAge">
                <Form.Control value={newAge === -1 ? null : newAge} type="number" placeholder="Age" onChange={e => setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userHobbies" >
                <Form.Control value={newHobbies} type="text" placeholder="Hobbies" onChange={e => setHobbies(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userDepartment" >
                <Form.Control value={newDepartment} type="text" placeholder="Department" onChange={e => setDepartment(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPicture">
                <Form.Control value={url} type="text" placeholder="Url of profile picture" onChange={e => setUrl(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default UserForm;