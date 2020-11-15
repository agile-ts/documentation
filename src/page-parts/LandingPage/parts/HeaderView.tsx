import React from "react";
import clsx from "clsx";
import styled from "styled-components";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import {useWindowSize} from "../../../hooks/useWindowSize";
import Button from "../../../components/Button";

const HeaderView: React.FC = () => {
    const windowSize = useWindowSize();
    const context = useDocusaurusContext();
    const siteConfig = context.siteConfig;

    const HeaderContent = () => {
        return (
            <Container className={"container"}>
                <Title>{siteConfig.title}</Title>
                <SubTitle>{siteConfig.tagline}</SubTitle>
                <Button to={useBaseUrl('docs/')}>Get Started</Button>
                <GithubButton
                    src="https://ghbtns.com/github-btn.html?user=agile-ts&amp;repo=agile&amp;type=star&amp;count=true&amp;size=large"
                    width={160}
                    height={30}
                    title="GitHub Stars"
                />
            </Container>
        );
    }

    return (
        windowSize.width > 1300 ?
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
    );
}

export default HeaderView;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
`;

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

const GithubButton = styled.iframe`
    border: none;
    overflow: hidden;
    margin-top: 10px;
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