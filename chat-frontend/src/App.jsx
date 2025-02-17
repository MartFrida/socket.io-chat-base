/* eslint-disable no-unused-vars */
// import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";
import { useState, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import io from 'socket.io-client';

// function App() {
//   const [nickname, setNickname] = useState('');
//   const [message, setMessage] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (nickname) {
//       const ws = io.connect('http://localhost:5000')
//       setSocket(ws)
//       ws.on("chat-message", data => {
//         const { nickname, message } = JSON.parse(data)
//         setMessage(prevMessages => {
//           const newMessage = {
//             id: nanoid(),
//             type: 'User',
//             nickname,
//             message
//           }
//           return [...prevMessages, newMessage]
//         })
//       })
//     }
//   }, [nickname])

//   const addNickname = useCallback(({ nickname }) => setNickname(nickname), [])
//   const addMessage = useCallback(({ message }) => {
//     setMessage(prevMessages => {
//       const newMessage = {
//         id: nanoid(),
//         type: 'you',
//         nickname,
//         message,
//       }
//       return [...prevMessages, newMessage]
//     })
//     const serverData = JSON.stringify({ nickname, message })
//     socket.emit('chat-message', serverData)

//   }, [nickname, socket])

//   return (
//     <div className="App">

//       {!nickname && <SigninChatForm onSubmit={addNickname} />}
//       {nickname && <ChatForm onSubmit={addMessage} />}
//       {nickname && <Chat items={message} />}
//     </div>
//   )
// }

// export default App;

function App() {
  const [nickname, setNickname] = useState('')
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (nickname) {
      const ws = io.connect("http://localhost:5000")
      setSocket(ws)
      ws.on('chat-message', data => {
        const { nickname, message } = JSON.parse(data)
        setMessages(prevMessages => {
          const newMessage = {
            id: nanoid(),
            type: "user",
            nickname,
            message,
          }
          return [...prevMessages, newMessage]
        })
      })
    }
  }, [nickname])

  const addNickname = useCallback(({ nickname }) => setNickname(nickname), [])

  const addMessage = useCallback(({ message }) => {
    setMessages(prevMessages => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        nickname,
        message,
      }
      return [...prevMessages, newMessage]
    })
    const serverData = JSON.stringify({ nickname, message })
    socket.emit('chat-message', serverData)
  }, [nickname, socket])


  return (
    <div>
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;