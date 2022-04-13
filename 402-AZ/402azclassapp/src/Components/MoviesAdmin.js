import React,{useEffect,useState} from "react";

function MoviesAdmin(){
     //this is use to set output messages.
    const [renderMessages, setRenderMessages] = useState({});
    //this is use to show or hide the form section if user has admin privilege or not.
    const [hidden, setHidden] = useState(false);
    const [btnClass, setButtonClass] = useState("button is-large is-primary is-link");
    const [btnClassRemove, setButtonClassRemove] = useState("button is-large is-primary is-danger");

    var dynamicUrl = "";

  
    //request options to delete movie
    const deleteRequestOptions = { 
      method: 'DELETE',
      headers:{'Content-Type':' application/json'}
    }
  
     // network operation to delete movie.
    const deletemovie = () => {
      try{
        setButtonClassRemove("button is-large is-loading is-danger");
          fetch(dynamicUrl,deleteRequestOptions)
          .then ((res) => {
            res.json();
            
          })
          .then((data) => {
            console.log(data); 
            setRenderMessages({ name: "output2", message: "SUCCESSFULLY DELETED" });
            setButtonClassRemove("button is-large is-primary is-danger");
          })
      
  
    }catch(err){
        console.log(err);
    }
    }
  
    //remove movie
    const removeThisMovie  = () => {
      const gId = undomovies["id"].trim();
      if (gId.length < 1)
      setRenderMessages({ name: "output2", message: msgs.id }); 
    
      else{
        // perform network operation.
        dynamicUrl = "https://d8zczkov06.execute-api.us-east-1.amazonaws.com/movies/"+gId;
        deletemovie();
        
      }  

     
    }

    
    const [movies,setmovies]=useState({
      id: "",
      moviesImgUrl: "",
      moviesLink: "",
      moviesTitle: "",
      moviesGenre: "",
      moviesDescription: "",
      moviesReleaseDate: "",
      moviesCast: ""
    });

    const [undomovies,setundomovies]=useState({
      id: ""
    });
    
    // defined response or output messages
    const msgs = {
      notAdmin: "Sorry you do not have an Administrative Privilege. You can\'t add a movie.",
      general: "Something is wrong. Please try again.",
      title: "Please add a movie title.",
      id: "Please add a movie ID.",
      moviesImgUrl: "Please add a movie image.",
      moviesLink:"Please add a movie link.",
      moviesGenre: "Please add a movie genre.",
      moviesDescription: "Please add a movie description.",
      moviesReleaseDate: "Please add a movie date.",
      moviesCast: "Please add a movie cast.",
      empty: "Please fill the form to continue."
    };

    //JSX code to render message (error, alert, response) to users
    const renderMessage = (name) =>
    name === renderMessages.name && (
      <div className="render">{renderMessages.message}</div>
    );


     const baseUrl="https://d8zczkov06.execute-api.us-east-1.amazonaws.com/movies";

     const requestOptions = { 
          method: 'PUT',
          headers:{'Content-Type':' application/json'},
          body: JSON.stringify(movies)
        }
   
        const putmovie=() => {
          //change button to loading
          setButtonClass("button is-large is-loading is-link");
            try{
              // network operation.
                fetch(baseUrl,requestOptions)
                .then ((res) => res.json())
                .then((data) => {
                  console.log(data);  
                  setRenderMessages({ name: "output", message: "SUCCESS" });
                  setButtonClass("button is-large is-primary is-link");
                });

        }catch(err){
            console.log(err);
            setRenderMessages({ name: "output", message: msgs.general }); 
        }
      }
    
      const checkb4Putmovie=() => {
        try{

          //setHidden(!hidden);
          //setRenderMessages({ name: "output", message: msgs.notAdmin});

           //check and remind the user of any field left unfilled.
          if (movies["id"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.id }); 
          else if (movies["moviesImgUrl"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesImgUrl });   
          else if (movies["moviesLink"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesLink });    
          else if (movies["moviesTitle"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.title }); 
          else if (movies["moviesGenre"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesGenre });
          else if (movies["moviesDescription"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesDescription });  
          else if (movies["moviesReleaseDate"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesReleaseDate }); 
          else if (movies["moviesCast"].trim().length < 1)
          setRenderMessages({ name: "output", message: msgs.moviesCast });  
          else{
            // perform network operation.
            putmovie();
            
          }  
    }catch(err){
        console.log(err);
        setRenderMessages({ name: "output", message: msgs.general }); 
    }
  }

        return(
            <>
                <section className="section">
                  <h1 className="title">Add Movies</h1>
                  <h2 className="subtitle"><strong>{renderMessage("output")}</strong></h2>
                </section>
        <div className='container' hidden = {hidden}>
            <input className="input" type="text" placeholder="Movie ID" onChange={e => setmovies({...movies, id: e.target.value})} />
            <input className="input" type="text" placeholder="Movie Image"onChange={ e=> setmovies({...movies,moviesImgUrl: e.target.value})} />
            <input className="input" type="text" placeholder="Movie Link"onChange={ e=> setmovies({...movies,moviesLink: e.target.value})} />
            <input className="input" type="text" placeholder=" Movies Title"onChange={e => setmovies({...movies,moviesTitle: e.target.value})} />
            <input className="input" type="text" placeholder="Movies Genre"onChange={e => setmovies({...movies,moviesGenre: e.target.value})}/>
            <input className="input" type="text" placeholder="Movies Description"onChange={ e => setmovies({...movies,moviesDescription: e.target.value})}/>
            <input className="input" type="text" placeholder="Movies Release Date"onChange={e => setmovies({...movies,moviesReleaseDate: e.target.value})} />
            <input className="input" type="text" placeholder="Movies Cast"onChange={e => setmovies({...movies,moviesCast: e.target.value})}/>
           <button className={btnClass} onClick={checkb4Putmovie}><strong>Add Movie</strong></button>

        </div>
        <section className="section">
                  <h1 className="title">Delete Movies</h1>
                  <h2 className="subtitle"><strong>{renderMessage("output2")}</strong></h2>
                </section>
        <div className='container' hidden = {hidden}>
            <input className="input" type="text" placeholder="Movie ID" onChange={e => setundomovies({...undomovies, id: e.target.value})} />
           <button className={btnClassRemove} onClick={removeThisMovie}><strong>Delete Movie</strong></button>

        </div>
        </>
          )
        }
 export default MoviesAdmin