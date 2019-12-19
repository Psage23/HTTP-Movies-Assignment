import React, {useState, useEffect} from 'react'
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

    const [previewState, setPreviewState] = useState(false);

    const id = props.match.params.id;

const handleChange = e => {
    setMovieList({ ...movieList, [e.target.name]: e.target.value });
};

const handlePreview = e => {
    e.preventDefault();
    setMovieList({ ...movieList, stars: movieList.stars.split(", ") });
    setPreviewState(true);
};

const handleSubmit = e => {
    e.preventDefault();
    if (previewState) {
    axios
        .put(`http://localhost:5000/api/movies/${id}`, movieList)
        .then(res => {
        props.history.push("/");
        })
        .catch(err => {
        console.log("Error: ", err);
        });
    }
};

useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        setMovieList({ ...res.data, stars: res.data.stars.join(", ") });
    })
    .catch(err => {
        console.log("Error: ", err);
    });
}, [id]);

return (
    <div className="updateMovie">
    <form onSubmit={previewState ? handleSubmit : handlePreview}>
        <h1>
        Title:{" "}
        {previewState ? (
            movieList.title
        ) : (
            <input
            type="text"
            name="title"
            value={movieList.title}
            placeholder="Title"
            onChange={handleChange}
            />
        )}
        </h1>
        <p>
        Director:{" "}
        {previewState ? (
            movieList.director
        ) : (
            <input
            type="text"
            name="director"
            value={movieList.director}
            placeholder="Director"
            onChange={handleChange}
            />
        )}
        </p>
        <p>
        Metascore:{" "}
        {previewState ? (
            movieList.metascore
        ) : (
            <input
            type="text"
            name="metascore"
            value={movieList.metascore}
            placeholder="Metascore"
            onChange={handleChange}
            />
        )}
        </p>
        <p>
        Stars:{" "}
        {previewState ? (
            movieList.stars
        ) : (
            <input
            type="text"
            name="stars"
            value={movieList.stars}
            placeholder="Stars"
            onChange={handleChange}
            />
        )}
        </p>
        <button type="submit">
        {previewState ? "Commit Changes" : "Preview Changes"}
        </button>
    </form>
    </div>
);
};

export default UpdateMovie;