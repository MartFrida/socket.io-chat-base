import { useState } from "react";

// import styles from "./chat-form.module.css";

// eslint-disable-next-line react/prop-types
const ChatForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        message: ""
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...state });
        setState({
            message: ""
        })
    }

    const { message } = state;

    return (
        <form onSubmit={handleSubmit}>
            <input value={message} name="message" onChange={handleChange} placeholder="Insert your message" />
            <button>Send</button>
        </form>
    )
}

export default ChatForm;