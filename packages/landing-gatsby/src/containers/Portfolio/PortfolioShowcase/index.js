import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import {
  PortfolioShowcaseWrapper,
  PortfolioShowcaseItem,
  PortfolioLink,
  BuiltWith,
} from './portfolioShowcase.style';

const PortfolioShowcase = ({
  sectionWrapper,
  secTitleWrapper,
  secTitle,
  secDescription,
  portfolioImage,
  portfolioDetails,
  titleStyle,
  detailsStyle,
}) => {
  const Data = useStaticQuery(graphql`
    query {
      portfolioJson {
        PORTFOLIO_SHOWCASE {
          title
          description
          link
          view
          love
          feedback
          featuredIn
          featuredLink
          image {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Box {...sectionWrapper} as="section" id="portfolio_section">
      <Container noGutter mobileGutter width="1200px">
        <Box {...secTitleWrapper}>
          <Heading {...secTitle} content="Making Ideas Come to Life !" />
          <Text
            {...secDescription}
            content="Specializing in React, React Native, cloud-enabled and cross-platform application development."
          />
        </Box>

        <PortfolioShowcaseWrapper>

          {Data.portfolioJson.PORTFOLIO_SHOWCASE.map((portfolioItem, index) => (
            <div key={`PortfolioShowcaseItem-${index}`}>
              <PortfolioShowcaseItem>
                <Box {...portfolioImage}>
                  <Image
                    fluid={
                      (portfolioItem.image !== null) | undefined
                        ? portfolioItem.image.childImageSharp.fluid
                        : {}
                    }
                    alt={`PortfolioImage-${index + 1}`}
                  />
                </Box>
                <Box {...portfolioDetails}>
                  <PortfolioLink>
                    <a href={portfolioItem.link || '#'}>
                      VISIT LIVE SITE
                    </a>
                  </PortfolioLink>
                  <Heading
                    content={portfolioItem.title}
                    {...titleStyle}
                  />
                  <Text
                    content={portfolioItem.description}
                    {...detailsStyle}
                  />
                  {portfolioItem.buildWith ? (
                    <BuiltWith>
                      {portfolioItem.buildWith.map((item, index) => (
                        <span key={`buildWith-item-${index}`}>
                          {item.content}
                        </span>
                      ))}
                    </BuiltWith>
                  ) : (
                      ''
                    )}
                </Box>
              </PortfolioShowcaseItem>
            </div>
          ))}
        </PortfolioShowcaseWrapper >
      </Container >
    </Box >
  );
};

PortfolioShowcase.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secTitle: PropTypes.object,
  secDescription: PropTypes.object,
  portfolioImage: PropTypes.object,
  portfolioDetails: PropTypes.object,
  titleStyle: PropTypes.object,
  detailsStyle: PropTypes.object,
};

PortfolioShowcase.defaultProps = {
  sectionWrapper: {
    pt: ['60px', '80px', '100px', '110px', '150px'],
    pb: ['60px', '80px', '100px', '110px', '150px'],
  },
  secTitleWrapper: {
    width: ['100%', '100%', '60%', '50%', '50%'],
    mb: ['50px', '65px'],
  },
  secTitle: {
    fontSize: ['22px', '26px', '26px', '30px', '30px'],
    fontWeight: '600',
    color: '#302b4e',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '20px'],
  },
  secDescription: {
    fontSize: ['15px', '16px'],
    fontWeight: '400',
    color: '#43414e',
    lineHeight: '1.5',
    mb: '0',
  },
  portfolioImage: {
    width: [1, 1, 1 / 2],
  },
  portfolioDetails: {
    width: [1, 1, 1 / 2],
    p: ['30px 0 0 0', '40px 0 0 0', '0 0 0 30px', '0 50px', '0 50px'],
  },
  titleStyle: {
    fontSize: ['22px', '22px', '26px', '40px', '40px'],
    fontWeight: '600',
    color: '#302b4e',
    mb: '17px',
  },
  detailsStyle: {
    fontSize: ['15px', '15px', '15px', '16px', '16px'],
    color: '#43414e',
    lineHeight: '1.5',
    mb: '0',
  },
};

export default PortfolioShowcase;
