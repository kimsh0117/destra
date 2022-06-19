const fs = require('fs')

const interfaceFilePath = './src/components/Icon/icons.ts'
const iconPath = './public/assets/icons'
const iconFiles = fs.readdirSync(iconPath)

const enumHead = `export const IconPack = {\n`
const enumTail = `}\n`
let enumString = ``

iconFiles.forEach(file => {
  const filename = file.split('.')[0]
  const property = filename.toUpperCase().split('-').join('_')
  enumString += `  '${filename}': ${property},\n`
})

const typeHead = `export type IconPackType = `
let typeString = ``

iconFiles.forEach((file, idx) => {
  const filename = file.split('.')[0]

  if (iconFiles.length !== idx + 1) {
    typeString += `'${filename}' |`
  }

  if (iconFiles.length === idx + 1) {
    typeString += `'${filename}'`
  }
})

let importString = ``

iconFiles.forEach(file => {
  const filename = file.split('.')[0]
  const property = filename.toUpperCase().split('-').join('_')
  importString += `import ${property} from '../../../public/assets/icons/${file}'\n`
})

fs.writeFileSync(
  interfaceFilePath,
  `${importString}\n${enumHead}${enumString}${enumTail}\n${typeHead}${typeString}`,
  'utf8',
)
