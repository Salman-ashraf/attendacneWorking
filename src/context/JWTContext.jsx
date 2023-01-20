import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party

import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from '../reducers/actions';
import accountReducer from '../reducers/accountReducer';
import axios from '../api/axios';


// constant
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    loading:true,
    user: null,
    

};

const verifyToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    // console.log('==============decoded token==================');
    // console.log(decoded);
    // console.log('=============================================');
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const getaccessToken= ()=>{
    const accessToken = window.localStorage.getItem('accessToken');
    return accessToken?accessToken:null;
}

const setSession = (accessToken) => {
    if (accessToken) {
     //   console.log('accestoken find')    
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['x-access-token'] = accessToken;
    } else {
       // console.log('accestoken Not find')
        localStorage.removeItem('accessToken');
        localStorage.clear();
         window.location.replace();
        delete axios.defaults.headers.common['x-access-token'] ;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                if (accessToken && verifyToken(accessToken)) {
                    setSession(accessToken);
                   // console.log('accestoken find in useefftect')
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            loading:false,
                            user: {
                                id: 7,
                                email:'eamil@gmail.com',
                                role:1234
                            }
                        }
                    });
                    // const response = await axios.get('/users/profile');
                    // const user = response.data;
                    // dispatch({
                    //     type: LOGIN,
                    //     payload: {
                    //         isLoggedIn: true,
                    //         user: { ...user, name: `${user.firstName} ${user.lastName}` }
                    //     }
                    // });
                } else {
                   // console.log('accestoken Not find in useefftect')
                    setSession(null);
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);


    // eslint-disable-next-line consistent-return
    const login = async (email, password) => {
        try {
        
            const res = await axios.post('http://localhost:3000/auth/login', { email, password });
             console.log(res.data);
             if(true)
            setSession(res.data.accessToken);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                
                    user: {
                        id: 7,
                        email,
                        role:1234
                    }
                }
            });
            
        } catch (err) {
            console.log('error occured')
            return err.message;
          
        }
    };

    // const register = async (email, password, firstName, lastName) => {
    //     // todo: this flow need to be recode as it not verified
    //     const id = chance.bb_pin();
    //     const response = await axios.post('/api/account/register', {
    //         id,
    //         email,
    //         password,
    //         firstName,
    //         lastName
    //     });
    //     let users = response.data;

    //     if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    //         const localUsers = window.localStorage.getItem('users');
    //         users = [
    //             ...JSON.parse(localUsers),
    //             {
    //                 id,
    //                 email,
    //                 password,
    //                 name: `${firstName} ${lastName}`
    //             }
    //         ];
    //     }

    //     window.localStorage.setItem('users', JSON.stringify(users));
    // };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
        window.location.replace('/login');
    };



    return (
        <JWTContext.Provider value={{ ...state, login, logout,getaccessToken }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
