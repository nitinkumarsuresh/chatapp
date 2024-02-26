import React,{useEffect, useState} from 'react';
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import {auth, db} from '../firebase-config'
import '../style/Chat.css'
export const Chat = (props)=>{
    const {room} = props;
    const messageRef = collection(db,'messges')
    const [newMessage,setNewMessage] = useState('');
    const [messages,setMessages] = useState([]);
    
    useEffect(() => {
        const queryMessages = query(messageRef, where('room','==',room),orderBy("createdAt"));
        const unSuscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id: doc.id})
            })
            setMessages(messages);
            console.log(messages)
        });

        return ()=>unSuscribe();
        
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (newMessage === '') return;
    
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    }
    
    return <div className="chat-app">
        <div className='header'>
            <h1>Welcome to Room{room.toUpperCase()}</h1>
        </div>
        <div className='messages'>
        {messages.map((message) => (
        <div className='message' key={message.id}>
            <span className='user'>{message.user}: </span>{message.text}

        </div>))}
            
            
        </div>
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input 
            className='new-message-input' 
            placeholder='Type your message'
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}
            />
            <br/>
            <button type='submit' className='send-button'>Send</button>

        </form>
    </div>
}