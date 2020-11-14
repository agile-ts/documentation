import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styled from "styled-components";
import {useWindowSize} from "../hooks/useWindowSize";

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    const size = useWindowSize();

    const Feature = ({imageUrl, title, description}) => {
        const imgUrl = useBaseUrl(imageUrl);
        return (
            <FeatureContainer className={clsx('col col--4')}>
                {imgUrl && (
                        <FeatureImage src={imgUrl} alt={title}/>
                )}
                <h3>{title}</h3>
                <p>{description}</p>
            </FeatureContainer>
        );
    }

    const HeaderContent = () => {
        return (
            <div className={"container"} style={{textAlign: "center"}}>
                <Title>{siteConfig.title}</Title>
                <SubTitle>{siteConfig.tagline}</SubTitle>
                <Link
                    className={clsx(
                        'button button--outline button--secondary button--lg'
                    )}
                    to={useBaseUrl('docs/')}>
                    Get Started
                </Link>
            </div>
        );
    }

    return (
        <Layout title={`Hello from ${siteConfig.title}`}
                description="Description will go into a meta tag in <head />">

            {size.width > 1300 ?
                <header>
                    <Image src={"img/header_background.svg"} alt={"Header Background"}/>
                    <ImageContent>
                        <HeaderContent/>
                    </ImageContent>
                </header>
                :
                <header style={{backgroundColor: "#3F3D56"}} className={clsx('hero hero--primary')}>
                    <HeaderContent/>
                </header>
            }

            <main>
                {features && features.length > 0 && (
                    <FeaturesContainer>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </FeaturesContainer>
                )}
            </main>
        </Layout>
    );
}

const features = [
    {
        title: 'Easy to Use',
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                TODO
            </>
        ),
    },
    {
        title: 'Focus on What Matters',
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                TODO
            </>
        ),
    },
    {
        title: 'Improve your Code',
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                TODO
            </>
        ),
    }
];

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageContent = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 300px;

  text-align: center;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.p`
  font-weight: normal;
  font-size: 20px;
  color: #ffffff;
`;

const Title = styled.h1`
  color: #ffffff;
  font-weight: bold;
  font-size: 50px;
`;

const FeaturesContainer = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const FeatureContainer = styled.div`
   text-align: center;
`;

const FeatureImage = styled.img`
  width: 200px;
  height: 200px;
`;

export default Home;
