import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Pages";
import Coaching from "./Pages/Coaching";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/coaching" element={<Coaching/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;