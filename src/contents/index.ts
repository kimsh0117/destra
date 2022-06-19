export type Pages = 'index'

export type SEO = {
  title: string
  description: string
  contentUrl: string
}
export type TPages = {
  seo: SEO
}
export type TStaticContents = {
  [page in Pages]: TPages
}

export const staticContents: TStaticContents = {
  index: {
    seo: {
      title: 'Юридический сервис destra | Destra',
      description:
        'Destra ➡ пошаговые инструкции по решению юридических задач, юридический онлайн-сервис с подробными инструкциями по наиболее популярным проблемам, требующим услуг юриста',
      contentUrl: 'https://destralegal.ru/',
    },
  },
}
