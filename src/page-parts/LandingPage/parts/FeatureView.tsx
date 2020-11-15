import {featuresData} from "../../../data/featuresData";
import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import useBaseUrl from '@docusaurus/useBaseUrl';


const FeatureView: React.FC = () => {

    const Feature = ({imageUrl, title, description}) => {
        const imgUrl = useBaseUrl(imageUrl);
        return (
            <FeatureContainer className={clsx('col col--4')}>
                {imgUrl && (
                    <FeatureImage src={imgUrl} alt={title}/>
                )}
                <TextContainer>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </TextContainer>
            </FeatureContainer>
        );
    }

    return(
        featuresData && featuresData.length > 0 && (
            <FeaturesContainer>
                <div className="container">
                    <div className="row">
                        {featuresData.map((props, idx) => (
                            <Feature key={idx} {...props}/>
                        ))}
                    </div>
                </div>
            </FeaturesContainer>
        )
    )
}

export default FeatureView;

const FeaturesContainer = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const TextContainer = styled.div`
  width: 80%;
  text-align: center;
`;

const FeatureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureImage = styled.img<{width?: number, height?: number}>`
  width: ${props => props.width || 250}px;
  height: ${props => props.height || 150}px;
  margin-bottom: 20px;
`;
