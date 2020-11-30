// import React, { useEffect, useState } from 'react';

// import Logo from '../.././images/logo_kahoot.png';

// import { Link } from 'react-router-dom';

// import {useSelector, useDispatch} from 'react-redux';
// import {
//     handlePin,
//     handleNickname
// } from '../../actions/list';
// import io from 'socket.io-client';
// import axios from 'axios';


// function Landing() {


//     const [pinNumber, setPinNumber] = useState(0);
//     const [name, setName] = useState("");
//     const [toggle, setToggle] = useState(false);

//     const [author, setAuthor] =useState('test-author');
//     const [content, setContent] =useState('test-content');

//     useEffect(() => {
//         const socket = io('http://127.0.0.1:6001');
//         socket.on('chat:message', data => {
//             console(data);
//         })
//         axios.post('http://127.0.0.1:8000/send-message', {
//             author,
//             content
//         }, {
//             headers: {
//                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//             }
//         })

//         // axios.get('http://127.0.0.1:8000/api/auth/topic', {
//         //     headers: {
//         //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDY3ZGY3ODdhOWYzZTQ2YzljNDNlNmIwNTc4YTQ5MGY0NzU0ODMyNjdmZWI4M2M3NWU5NTAxODg1MGVkMzgwNTZkYzMwMWI5Yjg1MzgxN2YiLCJpYXQiOjE2MDY1NjY5MDMsIm5iZiI6MTYwNjU2NjkwMywiZXhwIjoxNjM4MTAyOTAyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.CnUpoUAVD1zZ2XfLDu3Ff7ClBg-PRSToGrjz0f9wA1Uri73MJ9IZkMjWN2PPNMQZBsenKWo3DV6_ENAZPIMfvqwBJkGDyLsY8tWu3-QxRNPnEgCw1HwprHo7NdKEylrXwgUWWgSxBMAKMheytvRlF8omJXNOAqJolCnvJfIxfysSlFsQXyjGDwhERnyCIyVsEskwJVGu05CGrkfMsEy-g3CMagqSCb6abm-qfDCHwt2chLxCmqCmT1zmnLPY0IyKd6J4nKOpJ9OJPd6Sna8fCPUmsffzD1Cepq_5GepMKe6I0HLLsM0SbE0AGdQ8pq5xFp4ypFDvMMWH0VhvwM9KCKOmW0QdLC9_mOVFHdgKWUm-3l_pjIJoOjtflX722zP7JuOkmduYKrzTA3jEUUlwnJN_1JF7Po3smyh42aPrB5vO0uWyLVbVcaroLKu9EVmOIy8c3-Ezw8ILNbOxh-NeMYFXo_aaxbMEyohmO4blZ3aTxRp-JqMNr5aHPTFjhgMkJ3Cx8jeULS5zsorFAU6W9lLU771zeKU68nj4XytvfOVUXcfizY2X2xfxpddaZOF0MwvTjlp4ija-yFuE9UGMuudRSxC9HN2oP2JjlXZq2JePHiZ1DAIxNW9jRzyUS0pjnP0GIe-lRxQIQyELU28R8qg70D_DyqJmgmBTFHHJtBU'
//         //     }
//         // }).then((res) => {
//         //     console.log(res.data)
//         // })
//     },[]);

//     // const test = useSelector((state) => state.playGame.selectedPin);
//     // console.log(test);

//     const dispatch = useDispatch()

//     const handleInput = (e) => {
//         setPinNumber(e.target.value);
//     }

//     const handleToggle = () => {
//         //dispatch pin
//         dispatch(handlePin(pinNumber))
//         setToggle(true);
//     }

//     const handleNicknameInput = (e) => {
//         setName(e.target.value);
//     }

//     const handleGo = () => {
//         // dispatch nickname
//         dispatch(handleNickname(name));
//     }

//     return (
//         <div>
//             {
//                 toggle === false
//                     ?
//                     <div className="animation-color play">
//                         <div className="play-logo">
//                             <img src={Logo} width="300px" height="100px" />
//                         </div>
//                         <form className="play-form">
//                             <input type="text" placeholder="Game PIN" className="play-input" onChange={(e) => handleInput(e)}></input>
//                             <button type="submit" className="play-submit" onClick={handleToggle()}>Enter</button>
//                         </form>
//                     </div>
//                     :
//                     <div className="animation-color play">
//                         <div className="play-logo">
//                             <img src={Logo} width="300px" height="100px" />
//                         </div>
//                         <form className="play-form">
//                             <input type="text" placeholder="Your Name" className="play-input" onChange={(e) => handleNicknameInput(e)}></input>
//                             <Link to="/player/lobby">
//                                 <button type="submit" className="play-submit" onClick={handleGo()}>Ok, Go!</button>
//                             </Link>
//                         </form>
//                     </div>
//             }
//         </div>
//     );
// }

// export default Landing;