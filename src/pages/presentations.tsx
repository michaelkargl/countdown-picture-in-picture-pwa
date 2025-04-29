import * as React from "react"
import { ReactElement } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }): ReactElement => (
  <Layout>
    <h1>Presentations</h1>
    <span>These are all my little presentations:</span>
    <ul>
      {data.allMarkdownRemark.edges.map(({ node }, index) => {
        const {conferenceName,description} = node.frontmatter;
        return (
          <li>
            {index} {conferenceName}
            <ul>
              <li>{description}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  </Layout>
)

export const presentationQuery = graphql`
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
          conferenceName
          description
        }
      }
    }
  }
}
`;