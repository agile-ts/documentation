import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';
import styled from "styled-components";

export type Props = JSX.IntrinsicElements['button'] & { to: string };

const Button: React.FC<Props> = (props) => {
    const {to, children} = props;

    return (
        <Link to={to}>
            <Main
                {...props}
                className={classNames(
                    'button button--lg button--primary'
                )}
            >
                {children}
            </Main>
        </Link>
    );
}

export default Button;

const Main = styled.button`
  color: white;
  
  &:hover {
  color: white;
  }
`;

