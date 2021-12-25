import { React, useState} from 'react';
import { Card, Image, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';
import { IMAGE_ONERROR } from '../environment';
import { DELETE_USER } from '../routes';
import UserForm from './UserForm';

//Usage of Bootstrap Style
const UserDetails =  ({ user, deleteCallback, editCallback, randomizeCallback }) => {

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  }

  const handleSubmit = (name) => {
    DELETE_USER(name);
    deleteCallback();
  }

  const customCallback = () => {
    setIsEdit(false);
    editCallback();
  }

  const userCardBody = (<>
  <Card.Body>
    <Image className="mb-3" src={user ? user.picture : null} onError={IMAGE_ONERROR} roundedCircle fluid alt="User profile"/>
    <Card.Title>
      {user ? user.name : null}
    </Card.Title>
    <Card.Text>
      Age: {user ? user.age : null}
    </Card.Text>
    <Card.Text>
      Hobbies: {user ? user.hobbies : null}
    </Card.Text>
    <Card.Text>
      Department: {user ? user.department : null}
    </Card.Text>
    <Col> 
      <Button style={{marginRight: 8}} variant="primary" type="delete" onClick={(e) => handleSubmit(user.name)}>
          Delete
      </Button>
      <Button variant="primary" type="edit" onClick={(e) => handleEdit()}>
          Edit
      </Button>
    </Col>
    <Button style={{marginTop: 8}} variant="primary" type="randomize" onClick={(e) => randomizeCallback()}>
      Random
    </Button>
  </Card.Body>
  </>);

  const nullUserCardBody = (<>
  <Card.Body>
    <Card.Text>
      Select or randomize a user.
    </Card.Text>
    <Button variant="primary" type="randomize" onClick={(e) => randomizeCallback()}>
      Random
    </Button>
  </Card.Body>
  </>);

  return isEdit
    ? <UserForm user={user} isCreate={false} editCallback={customCallback}/>
    : (
        <Card className="GeneralBox"> 
          {user ? userCardBody : nullUserCardBody }
        </Card>
      );
}

export default UserDetails;