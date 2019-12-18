import React, {useState} from 'react'
import axios from 'axios'

//create a component with a form to update the chosen movie
//the form should make a PUT request to the server when submitted
//When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

const UpdateMovie = props => {
    const [movieList, setMovieList] = useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

const id = props.match.params.id;

const handleChange = e => {
    setMovieList({...movieList, [e.target.name]: e.target.value});
}

const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movieList)
    .then(res => {
        props.history.push('/')
    })
    .catch(err => console.log(err));
}

    return (
        <div>
            <h1>Update Form: </h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='Metascore'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;