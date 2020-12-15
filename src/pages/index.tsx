import React from 'react';
import Layout from '@theme/Layout';

import LandingPage from "../page-parts/LandingPage";

function Home() {
    return (
        <Layout title={`Home`}
                description="AgileTs is a global State and Logic Framework for reactive Typescript & Javascript Applications. Supporting frameworks like React, React Native..">
            <LandingPage/>
        </Layout>
    );
}

export default Home;
