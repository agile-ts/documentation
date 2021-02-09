// File got generated with 'yarn run swizzle @docusaurus/theme-classic Footer --danger'
// To add toast into a component that is used on each site

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styled from "styled-components";
import GithubButton from "../../components/buttons/GithubButton";

interface FooterLinkProps {
    href?: string
    label: string
    to?: string
}

const FooterLink = ({to, href, label, ...props}: FooterLinkProps) => {
    const linkHref = useBaseUrl(href ?? "", {forcePrependBaseUrl: undefined})
    const linkTo = useBaseUrl(to ?? "")

    return (
        <FooterLinkText
            {...(href != null
                ? {
                    href: linkHref,
                    rel: "noopener noreferrer",
                    target: "_blank",
                }
                : {href: linkTo})}
            {...props}
        >
            {label}
        </FooterLinkText>
    )
}

function Footer() {
    const {siteConfig} = useDocusaurusContext()
    const {
        copyright,
        links = [],
        logo = {}
    } = siteConfig.themeConfig.footer;
    const hasFooter = !!siteConfig.themeConfig.footer;

    if (!hasFooter) {
        return null;
    }

    return (
        <FooterContainer className={clsx('footer')}>
            <FooterInner>
                <ContentContainer>
                    <FooterRight>
                        <FooterLogoContainer>
                            <FooterImage
                                alt="AgileTs Logo"
                                height={35}
                                width={35}
                                src="/img/logo.svg"
                                title={siteConfig.tagline}
                            />
                            <FooterTitle>
                                AgileTs
                            </FooterTitle>
                        </FooterLogoContainer>

                        <FooterTagline>
                            {siteConfig.tagline}
                        </FooterTagline>
                        <FooterGithubButton to={siteConfig.themeConfig.githubUrl}/>
                    </FooterRight>
                    <FooterLeft>
                        {links.map((linkItem, i) => (
                            <FooterLinkItems key={i}>
                                <FooterLinkItem>
                                    {linkItem.title != null && (
                                        <FooterLinkItemTitle>
                                            {linkItem.title}
                                        </FooterLinkItemTitle>
                                    )}

                                    {linkItem.items?.map((item) => (
                                        <FooterLinkItemLinkContainer key={item.href ?? item.to}>
                                            <FooterLink {...item} />
                                        </FooterLinkItemLinkContainer>
                                    ))}
                                </FooterLinkItem>
                            </FooterLinkItems>
                        ))}
                    </FooterLeft>
                </ContentContainer>
                <FooterBottom>
                    <FooterCopyrightText>
                        {siteConfig.customFields.copyright}
                    </FooterCopyrightText>
                </FooterBottom>
            </FooterInner>
        </FooterContainer>
    );
}

const FooterContainer = styled("footer")`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--ifm-background-color);
`;

const FooterInner = styled.div`
  // background-color: red;

  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentContainer = styled.div`
  // background-color: #3b8ba5;

  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 4.5rem 1rem;
`;

const FooterRight = styled.div`
  // background-color: blue;

  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto;
  grid-gap: 25px;
  margin-right: 2rem;
`;

const FooterLeft = styled.div`
  // background-color: green;

  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
  grid-gap: 100px;
`;

const FooterLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

const FooterImage = styled.img`
  margin-right: 10px;
`;

const FooterTitle = styled.div`
  font-weight: var(--ifm-font-weight-bold);
`;

const FooterTagline = styled.p`
  max-width: 250px;
  margin-bottom: 1rem;
  font-size: 16px;
  color: var(--ifm-color-primary-lightest);
  font-weight: var(--ifm-font-weight-semibold);
`;

const FooterGithubButton = styled(GithubButton)`
  justify-self: start;
  font-size: 12px;
`;

const FooterLinkItems = styled.div`
  // background-color: darkgoldenrod;

  margin-bottom: 0.6rem;
  flex: 1;
  color: var(--palette-white);
  font-size: var(--font-size-normal);
`;

const FooterLinkItemTitle = styled.li`
  margin-bottom: 1.25rem;
  font-weight: var(--ifm-font-weight-bold);
  font-size: var(--font-size-large);
  list-style: none;
`;

const FooterLinkItem = styled.ul`
  padding: 0;
`;

const FooterLinkText = styled.a`
  color: var(--ifm-navbar-link-color);
  
  :hover {
    color: var(--ifm-navbar-link-hover-color)
  }
`;

const FooterLinkItemLinkContainer = styled.ul`
  padding: 0;
  margin-bottom: 10px;
`;

const FooterBottom = styled.div`
  display: flex;
  height: 4.75rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--ifm-navbar-link-color);
`;

const FooterCopyrightText = styled.pre`
  display: flex;
  max-width: var(--ifm-container-width);
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  background-color: var(--ifm-background-color);
`;

export default Footer;