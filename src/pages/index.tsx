import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import products from "../products.json"

const IndexPage = ({ data }) => {
  // console.log(data.allImageSharp.nodes)
  const images: Array<IGatsbyImageData | undefined> = []
  data.allFile.edges.forEach(({ node }) => {
    images.push(getImage(node))
  })
  const imagesName: String[] = []
  data.allFile.edges.forEach(({ node }) => {
    imagesName.push(node.name)
  })

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Snipcart Store</h1>
      <p>
        <a
          href="#"
          className="snipcart-checkout snipcart-summaray"
          style={{ textDecoration: "none" }}
        >
          <strong>Cart:</strong>{" "}
          <span className="snipcart-total-price">$0.00</span>
        </a>
      </p>
      {products.map(product => {
        const imageIndex = imagesName.indexOf(product.image)
        const image = images[imageIndex]
        return (
          <div key={product.id} className="">
            <h3>{product.title}</h3>
            <GatsbyImage image={image!} alt={`Preview of ${product.title}`} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>
              <button
                className="snipcart-add-item"
                data-item-id={product.id}
                data-item-image={image}
                data-item-name={product.title}
                data-item-url="/"
                data-item-price={product.price}
              >
                Add to Cart
              </button>
            </p>
          </div>
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const data = graphql`
  query MyQuery {
    allFile(filter: { relativeDirectory: { eq: "products" } }) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 200)
          }
          name
        }
      }
    }
  }
`
