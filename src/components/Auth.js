import {auth,provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie';
import '../style/Auth.css';

const cookies = new Cookies();
export const Auth = (props) =>{
    const {setIsAuth} = props;
    const SignInWithGoogle = async() =>{
        try{
            
        const result = await signInWithPopup(auth,provider);
        cookies.set('auth-token',result.user.refreshToken)
        setIsAuth(true);
        }catch(err){
            console.error(err);
        }
    }
    return (
    <div className="auth">
        <p>Sign in with google to continue</p>
        <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>)
}