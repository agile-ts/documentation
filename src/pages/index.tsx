import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styled from "styled-components";
import {useWindowSize} from "../hooks/useWindowSize";
import {featuresData} from "./data/featuresData";
import {animated, config, useChain, useSpring, useTransition} from "react-spring";
import {includesData} from "./data/includesData";

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    const windowSize = useWindowSize();

    const [open, setOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (open) {
            setShowContent(true)
        } else {
            setTimeout(() => {
                setShowContent(false);
            }, 800)

        }

    }, [open]);

    const springRef = useRef()
    const {size, opacity, ...rest} = useSpring({
        ref: springRef,
        config: config.default,
        from: {size: 100, background: '#3F3D56'},
        to: {size: open ? 600 : 100, background: "#3F3D56"}
    })

    const transRef = useRef()
    const transitions = useTransition(open ? includesData : [], item => item.name, {
        ref: transRef,
        unique: true,
        trail: 400 / includesData.length,
        from: {opacity: 0, transform: 'scale(0)'},
        enter: {opacity: 1, transform: 'scale(1)'},
        leave: {opacity: 0, transform: 'scale(0)'}
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])


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
        <Layout title={`AgileTs`}
                description="Agile is a global state and logic framework for reactive Typescript & Javascript applications. Supporting frameworks like React and React Native.">

            {windowSize.width > 1300 ?
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
                {featuresData && featuresData.length > 0 && (
                    <FeaturesContainer>
                        <div className="container">
                            <div className="row">
                                {featuresData.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </FeaturesContainer>
                )}

                <IncludesContainer>
                    <Includes showContent={showContent} style={{...rest, width: size, height: size}}
                              onClick={() => setOpen(open => !open)}>
                        {
                            showContent ?
                                transitions.map(({item, key, props}) => (
                                    <Item key={key} style={{...props, background: "white"}}>
                                        {item &&
                                        <h3 style={{color: "#3F3D56"}}>{item.name}</h3>}
                                    </Item>
                                ))
                                :
                                <img src={"img/logo.svg"} alt={"Header Background"}/>
                        }

                    </Includes>
                </IncludesContainer>

            </main>
        </Layout>
    );
}

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

const IncludesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
`;

const Includes = styled(animated.div)<{ showContent: boolean }>`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: ${props => props.showContent ? 25 : 0}px;
  padding: ${props => props.showContent ? 25 : 0}px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
  margin-bottom: 100px;
`;

const Item = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  will-change: transform, opacity;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export default Home;
