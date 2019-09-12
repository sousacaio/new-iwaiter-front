import React from 'react';
import dislike from '../assets/dislike.png';
import { Link } from 'react-router-dom';
import like from '../assets/like.png';
import api from '../services/api';
import './Main.css';

export default function Main({ match }) {

    var valor = window.location.href.split("=");
    if (valor[1] === 'undefined') {         
        window.history.back();
    }
        async function loadUsers() {
            var valor = window.location.href.split("=");
            const response = await api.get('/users/feed', {
                params: {
                    jwt: valor[1]
                }
            });
            console.log(response.data);
            console.table(response.data.data);
            console.warn(response.data.data);
        }

    loadUsers();
    // async function handleLike(id) {
    //     await api.post(`/devs/${id}/likes`, null, {
    //         headers: {
    //             user: match.params.id,
    //         }
    //     });
    //     setUsers(users.filter(user => user.id !== id));
    // }
    // async function handleDislike(id) {
    //     await api.post(`/devs/${id}/dislikes`, null, {
    //         headers: {
    //             user: match.params.id,
    //         }
    //     });
    //     setUsers(users.filter(user => user.id !== id));
    // }

    return (
        <div className="main-container">
            <ul>
                <li >
                    <Link to="/">
                    </Link>
                    <footer>
                        <strong>user nome</strong>
                        <p>user bio</p>
                    </footer>
                    <div className="buttons">
                        <button type="button"
                        //onClick={() => handleDislike(user._id)}
                        >
                            <img src={dislike} alt="like" />
                        </button>
                        <button type="button">
                            <img src={like} alt="like"
                            //onClick={() => handleLike(user._id)}
                            />
                        </button>
                    </div>
                </li>
            </ul>

        </div >
    );
}