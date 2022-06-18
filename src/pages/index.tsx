import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
/**
 * ui
 */
import Layout, { MainStyle } from 'src/components/Layout/Layout'
import Container from 'src/components/Layout/Container'
import Card from 'src/components/Card'
/**
 * static
 */
import { staticContents, TPages } from 'src/contents'
/**
 * hooks
 */
import { useHeaders } from 'src/hook/useHeaders'
/**
 * api
 */
import { useContentQuery } from 'src/api/content'

const Home: NextPage<{ contents: TPages }> = ({ contents: { seo } }) => {
  const { headers } = useHeaders()
  // queries
  const { data: contentsData } = useContentQuery.useGetContent(headers)
  const { data: contentsTotalData } =
    useContentQuery.useGetContentTotal(headers)

  return (
    <Layout mainStyle={MainStyle.MAIN}>
      <Head>
        <title lang='ru'>{seo.title}</title>
        <meta name='description' content={seo.description} />
        <meta property='og:url' content={seo.contentUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={seo.title} />
        <meta property='og:site_name' content='Destra Legal' />
        <meta property='og:description' content={seo.description} />
        <meta property='og:image' content={seo.contentUrl} />
      </Head>

      <Container>
        {contentsData && contentsTotalData && (
          <StyledMain>
            <StyledMainTitle>Контент</StyledMainTitle>
            <StyledMainInner>
              {contentsData.data.result.map(content => (
                <Card
                  key={content._id}
                  title={content.name}
                  category={content.category}
                />
              ))}
            </StyledMainInner>
          </StyledMain>
        )}
      </Container>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  const contents = staticContents['index']

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      contents,
    },
  }
}

const StyledMain = styled.div`
  margin-bottom: 90px;
  @media ${({ theme }) => theme.devices.mobileMdUp} {
    max-width: none;
  }
`

const StyledMainTitle = styled.h1`
  margin-bottom: 58px;
  ${({ theme }) => theme.mixins.H3};
  @media ${({ theme }) => theme.devices.mobileMdUp} {
    ${({ theme }) => theme.mixins.H1};
    margin-bottom: 45px;
  }
  @media ${({ theme }) => theme.devices.noteUp} {
    margin-bottom: 30px;
  }
`

const StyledMainInner = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  gap: 15px;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    gap: 20px;
  }
  @media ${({ theme }) => theme.devices.ipadBigUp} {
    gap: 30px;
  }
`
