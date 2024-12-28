import { GlobalContext } from '@/context/Provider';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import googlelogo from "@/assets/icons/googlelogo.svg"
const CustomGoogleLoginButton: React.FC = () => {
    const { loginWithSocial } = useContext(GlobalContext)
    const signIn = useGoogleLogin({
        onSuccess: (response: any) => {
            console.log('Google login successful', response);
            if (response?.access_token) {
                loginWithSocial("GOOGLE", response?.access_token, "access_token")
            } else {
                loginWithSocial("GOOGLE", response?.credential, "credential")
            }
        },
        onError: (error) => {
            console.error('Google login failed', error);
        }
    });

    return (
        <>
            <button
                type='button'
                style={{
                    background: "linear-gradient(90.39deg, #AE6BFF 0%, #EF87DF 100%)",
                    color: '#000',
                    width: "100%",
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    height: 43,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => signIn()}
            >
                <div className='d-flex align-items-center justify-content-center'><img
                    src={googlelogo.src}// Google logo
                    className='google-icon '
                    alt="Google logo"
                    style={{ width: '20px', height: '144px', marginRight: '16px' }}
                    loading="lazy"
                />
                    <span className='text-white fw-semibold fs-6 text-center'>Continue with Google</span></div>

            </button>
        </>
    );
};
export default CustomGoogleLoginButton;