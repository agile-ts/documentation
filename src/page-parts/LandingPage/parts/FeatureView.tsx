import {featuresData} from "../../../data/featuresData";
import React from "react";
import styled from "styled-components";
import useBaseUrl from '@docusaurus/useBaseUrl';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const FeatureView: React.FC = () => {

    const Feature = ({imageUrl, title, description}) => {
        const imgUrl = useBaseUrl(imageUrl);
        return (
            <FeatureContainer className="col">
                {imgUrl && (
                    <FeatureImage src={imgUrl} alt={title} effect={"blur"}/>
                )}
                <h3>{title}</h3>
                <p>{description}</p>
            </FeatureContainer>
        );
    }

    return (
        featuresData && featuresData.length > 0 && (
            <FeaturesContainer className="container text--center">
                <div className="row">
                    {featuresData.map((props, idx) => (
                        <Feature key={idx} {...props}/>
                    ))}
                </div>
            </FeaturesContainer>

        )
    )
}

export default FeatureView;

const FeatureImage = styled(LazyLoadImage)<{ width?: number, height?: number }>`
  width: ${props => props.width || 250}px;
  height: ${props => props.height || 150}px;
  margin-bottom: 20px;
`;

const FeatureContainer = styled.div`
  margin: 50px 50px 0 50px;
`;

const FeaturesContainer = styled.div`
  margin-bottom: 5px;
  margin-top: 20px;
`;