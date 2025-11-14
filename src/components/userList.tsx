import * as React from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    borthdayPlace: string;
    province: string;
    sex: string;
    phoneNumber: number;
    role: string;
}


interface State {
    users: User[];
}

export default class UserList extends React.Component<Record<string, never>, State> {
    state: State = {
        users: []
    };
    
componentDidMount() {
    axios.get<User[]>('http://localhost:3001/api/users')
        .then(response => {
            const users = response.data;
            this.setState({ users});
        });
}

render() {
    return (
        <div>
            <ul>
                {this.state.users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        {user.firstName} {user.lastName} {user.role}
                    </li>
                ))}
            </ul>
        </div>
    )
}

















}