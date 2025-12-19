import React from 'react';
import SignUpLink from './SignUpLink';
import LoginForm from './LoginForm';
import Divider from './Divider';

const LoginCard = () => {
    return (
        <div>
            <div className="card p-8 md:p-10">
                {/* <!-- Login Form --> */}
               <LoginForm/>

                {/* <!-- Divider --> */}
                <Divider/>

                {/* <!-- Sign Up Link --> */}
                <SignUpLink/>
            </div>
        </div>
    );
};

export default LoginCard;