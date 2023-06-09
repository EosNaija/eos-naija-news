import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
  const query = gql`
    query GetAllPosts() {
      postsConnection(orderBy: createdAt_DESC, first: 9000) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            read_duration
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};
export const getPagePosts = async (skip) => {
  const query = gql`
    query GetPagePosts($skip: Int!) {
      postsConnection(orderBy: createdAt_DESC, skip: $skip, first: 10) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            read_duration
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { skip });

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(
      orderBy: createdAt_DESC, first: 3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    fragment postFields on Post {
      title
      featuredImage {
        url
      }
      createdAt
      slug
      categories {
        name
        slug
      }
    }

    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        ...postFields
      }
      post(where: { slug: $slug }) {
        ...postFields
        content
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        content
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getCategoryPosts = async (slug) => {
  const query = gql`
    query getCategoryPosts($slug: String!) {
      category(where: { slug: $slug }) {
        posts(orderBy: createdAt_DESC, first: 9000) {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          read_duration
          featuredImage {
            url
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.category;
};
