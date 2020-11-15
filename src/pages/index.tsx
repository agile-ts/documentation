import React from 'react';
import Layout from '@theme/Layout';

import LandingPage from "../page-parts/LandingPage";

function Home() {
    return (
        <Layout title={`AgileTs`}
                description="Agile is a global state and logic framework for reactive Typescript & Javascript applications. Supporting frameworks like React and React Native.">
            <LandingPage/>
        </Layout>
    );
}

export default Home;
