import React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
/**
 * ui
 */
import Layout, { MainStyle } from 'src/components/Layout/Layout'
import Container from 'src/components/Layout/Container'
import Card from 'src/components/Card'
import Button, { ButtonSize, ButtonStyle } from 'src/components/Button'
import Icon from 'src/components/Icon'
/**
 * static
 */
import { staticContents, TPages } from 'src/contents'
/**
 * hooks
 */
import { useHeaders } from 'src/hook/useHeaders'
import { usePagination } from 'src/hook/usePagination'
/**
 * api
 */
import { useContentQuery } from 'src/api/content'

const Home: NextPage<{ contents: TPages }> = ({ contents: { seo } }) => {
  const { headers } = useHeaders()
  const {
    state: { limit, page, pages, total },
    setValue,
    ltEnable,
    rtEnable,
    ltDoubleEnable,
    rtDoubleEnable,
  } = usePagination()
  // queries
  const { data: contentsData } = useContentQuery.useGetContent({
    headers,
    options: {
      page: page - 1,
      limit,
    },
  })
  const { data: contentsTotalData } =
    useContentQuery.useGetContentTotal(headers)

  React.useEffect(() => {
    if (contentsTotalData) {
      setValue(prev => ({
        ...prev,
        total: contentsTotalData.data.result.count,
      }))
    }
  }, [contentsTotalData])

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
            {/* title */}
            <StyledMainTitle>Контент</StyledMainTitle>
            {/* Контенты */}
            <StyledMainInner>
              {contentsData.data.result.map(content => (
                <Card
                  key={content._id}
                  title={content.name}
                  category={content.category}
                />
              ))}
            </StyledMainInner>
            {/* Пагинация */}
            <StyledMainPaginationContainer>
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!ltEnable}
                onClick={() => setValue(prev => ({ ...prev, page: 1 }))}
              >
                Первая
              </Button>
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!ltDoubleEnable}
                onClick={() =>
                  setValue(prev => ({ ...prev, page: prev.page - 10 }))
                }
              >
                <Icon name='left-double' width='12' height='12' />
              </Button>
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!ltEnable}
                onClick={() =>
                  setValue(prev => ({ ...prev, page: prev.page - 1 }))
                }
              >
                <Icon name='left' width='8' height='8' />
              </Button>
              {pages.map((page, idx) => (
                <Button
                  key={idx.toString()}
                  buttonStyle={ButtonStyle.OUTLINED}
                  size={ButtonSize.SAME_PADDING}
                  clicked={page.active}
                  onClick={() => setValue(prev => ({ ...prev, page: page.nr }))}
                >
                  {page.ellipsis ? '...' : page.nr}
                </Button>
              ))}
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!rtEnable}
                onClick={() =>
                  setValue(prev => ({ ...prev, page: prev.page + 1 }))
                }
              >
                <Icon name='right' width='8' height='8' />
              </Button>
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!rtDoubleEnable}
                onClick={() =>
                  setValue(prev => ({ ...prev, page: prev.page + 10 }))
                }
              >
                <Icon name='right-double' width='12' height='12' />
              </Button>
              <Button
                buttonStyle={ButtonStyle.OUTLINED}
                size={ButtonSize.SAME_PADDING}
                disabled={!rtEnable}
                onClick={() =>
                  setValue(prev => ({ ...prev, page: ~~(total / limit) }))
                }
              >
                Последняя
              </Button>
            </StyledMainPaginationContainer>
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

const StyledMainPaginationContainer = styled.div`
  border-radius: 5px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`
