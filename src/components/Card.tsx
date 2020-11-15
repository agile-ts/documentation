import React, {useCallback} from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export interface Props {
    src: string,
    width?: number | string,
    height?: number | string
}

const Card: React.FC<Props> = (props) => {
    const {src, width, height} = props;

    const [spring, setSpring] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40  },
    }));

    const calculateRotation = useCallback((x: number, y: number, imageWidth: number, imageHeight: number) => [
        -(y - imageHeight / 2) / 100,
        (x - imageWidth / 2) / 100,
        1.01,
    ], []);

    return (
        <Container width={width} height={height}>
            <AnimatedCard src={src}
                onMouseMove={({ clientX: x, clientY: y }) =>
                    setSpring({
                        xys: calculateRotation(x, y, width, height),
                    })
                }
                onMouseLeave={() =>
                    setSpring({
                        xys: [0, 0, 1],
                    })
                }
                style={{
                    transform: spring.xys.interpolate(
                        // @ts-ignore (Kind of wired normally the object property should be xys.. but somehow they split it up)
                        (x, y, s) =>
                            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
                    ),
                }}
            />
        </Container>
    );
};

export default Card;

const Container = styled.div<{width: number, height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  
`;

const AnimatedCard = styled(animated.img)`
  border-radius: 5px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  height: 100%;
  width: 100%;

  &:hover {
    box-shadow: 0 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
`;
