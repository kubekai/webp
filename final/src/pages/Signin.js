import React from 'react';
import{Menu,Form,Container,Message}from 'semantic-ui-react';
import firebase from '../utils/firebase';
import {useNavigate}from 'react-router-dom';
import 'firebase/compat/auth';

function Signin(){
    const [activeItem,setActiveItem]=React.useState("register");
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const nagitive = useNavigate();
    const [errorMessage,setErrorMessage]=React.useState('');
    function onSubmit(){
        if(activeItem === 'register'){
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                nagitive('/');
            })
            .catch((error)=>{
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setErrorMessage("信箱已存在")
                        break;
                
                    default:
                        break;
                }
            });
        }else if(activeItem ==='signin'){
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                nagitive('/');
            })
            .catch((error)=>{
                switch (error.code) {
                    case 'auth/wrong-password':
                        setErrorMessage("密碼錯誤")
                        break;
                
                    default:
                        break;
                }
            });
        }
    }
    return (
        <Container>
        <Menu widths="2">
            <Menu.Item 
            active={activeItem ==='register'} 
            onClick={() => {
                setErrorMessage('');
                setActiveItem('reister');

            }}
            >
                註冊
            </Menu.Item>
            <Menu.Item 
            active={activeItem ==='signin'} 
            onClick={() => {
            setErrorMessage('');
            setActiveItem('signin');
            
            }}>
                登入
            </Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
            <Form.Input 
            label="信箱"
             value={email} 
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="請輸入信箱"
             />
            <Form.Input 
            label="密碼"
             value={password} 
             onChange={(e)=>setPassword(e.target.value)}
             placeholder="請輸入密碼"
             type="password"
             />
            {errorMessage &&<Message>{errorMessage}</Message>}
            <Form.Button>
                {activeItem ==='register'&&'註冊'}
                {activeItem ==='signin'&&'登入'}
            </Form.Button>
        </Form>
        </Container>
    )
}

export default Signin;