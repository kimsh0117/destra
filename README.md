# Stack

- React
- Next
- Styled-component
- Typescript
- React-Query
- ContextAPI

# Git

Git Strategy:

- Используею [Squash Merge](https://www.git-tower.com/learn/git/faq/git-squash).

## Getting Started

Run the **local** development server:

```bash
npm run start:local:dev
```

Run the **local** production server:

```bash
npm run build
npm run start:local:prod
```


## Логика авторизация

На `/src/pages/api/auth/[...nextauth].ts`

## PS
- Логин слишком быстро выполняется. Поэтому если хотите увидит лоудер кнопки, нужно настройть throttling на 3G 
