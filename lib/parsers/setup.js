let Immutable = require('immutable')
const {
  ENVIRONMENT_CONTEXT,
  ENV_BULLET_LEXEME,
  NEWLINE_LEXEME
} = require('../constants')

function isContextStart (tree, lexemeList, lexeme, index) {
  if (index === 0) {
    return true
  }

  let prevLexeme = lexemeList.get(index - 1)

  return prevLexeme.get('type') === NEWLINE_LEXEME &&
    lexeme.get('type') === ENV_BULLET_LEXEME
}

function createContext (tree, lexemeList, lexeme, index) {
  return Immutable.fromJS({
    type: ENVIRONMENT_CONTEXT,
    content: []
  })
}

function appendTree (tree, lexeme) {
  return tree.update(tree.size - 1, context => {
    return context.update('content', content => content.push(lexeme))
  })
}

module.exports = {
  isContextStart,
  createContext,
  appendTree
}
