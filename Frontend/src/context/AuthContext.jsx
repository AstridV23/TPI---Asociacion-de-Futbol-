export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
    

    return (
        <AuthContext.Provider value={{state: state, }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;