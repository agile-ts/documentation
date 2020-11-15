import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {animated, config, useChain, useSpring, useTransition} from "react-spring";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import {includesData} from "../../../data/includesData";
import {useWindowSize} from "../../../hooks/useWindowSize";


const IncludesView: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        if (open) {
            setShowContent(true)
        } else {
            setTimeout(() => {
                setShowContent(false);
            }, 800)

        }

    }, [open]);

    const springRef = useRef();
    const {size, opacity, ...rest} = useSpring({
        ref: springRef,
        config: config.default,
        from: {size: 100, background: '#3F3D56'},
        to: {size: open ? 600 : 100, background: "#3F3D56"}
    });

    const transRef = useRef()
    const transitions = useTransition(open ? includesData : [], item => item.name, {
        ref: transRef,
        unique: true,
        trail: 400 / includesData.length,
        from: {opacity: 0, transform: 'scale(0)'},
        enter: {opacity: 1, transform: 'scale(1)'},
        leave: {opacity: 0, transform: 'scale(0)'}
    });

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6]);

    return (
        <Container>
            <Main showContent={showContent} style={{...rest, width: size, height: size}}
                  onClick={() => windowSize.width > 900 && setOpen(open => !open)}>
                {
                    showContent ?
                        transitions.map(({item, key, props}) => (
                          <Link to={useBaseUrl(item.route)}>
                              <Item key={key} style={{...props}} >
                                  {item &&
                                  <h3 style={{color: "#3F3D56"}}>{item.name}</h3>}
                              </Item>
                          </Link>
                        ))
                        :
                        <img src={"img/logo.svg"} alt={"Header Background"}/>
                }
            </Main>
        </Container>
    )
}

export default IncludesView;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const Main = styled(animated.div)<{ showContent: boolean }>`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: ${props => props.showContent ? 25 : 0}px;
  padding: ${props => props.showContent ? 25 : 0}px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
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
  background-color: white;
  
  &:hover {
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.5);
  }
`;
