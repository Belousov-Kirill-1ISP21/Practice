import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import {Practice1} from './pages/Practice1';
import {Practice2} from './pages/Practice2';
import {Practice3} from './pages/Practice3';
import {Practice4} from './pages/Practice4';
import {Practice5} from './pages/Practice5';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<Practice1/>}/>
            <Route path="/Practice2" element={<Practice2/>} />
            <Route path="/Practice3" element={<Practice3/>} />
            <Route path="/Practice4" element={<Practice4/>} />
            <Route path="/Practice5" element={<Practice5/>} />
        </RouterRoutes>
    );
};

export default Routes;