import React from 'react';
import {Route, Routes} from "react-router-dom";
import Coaching from "../Pages/Coaching";
import Main from "../Pages/Main";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/coaching" element={<Coaching/>}/>
            </Routes>
        </>
    );
};

export default AppRoutes;