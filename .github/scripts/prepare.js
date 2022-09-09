const parseIssueBody = require('./parse-issue-body.js')

module.exports = async ({github, context, options}) => {
  const { whoToGreet, mutliLineValues } = parseIssueBody({context})
  let commentBody
  
  if (whoToGreet) {
    commentBody = `👋 Thank you for opening this issue.
  
    The following **data** has been parsed from your issue body:
  
    \`\`\`${mutliLineValues}\`\`\`
  
    The **Who to Greet** is set to be: **\`${whoToGreet}\`**
      
    ## Greet
  
    Add a comment to this issue with one of the following command in order to send greetings.
    
    \`\`\`
    /send-greetings
    \`\`\`
    `
  } else {
    commentBody = '😢 The issue body could not be parsed. Please open a new issue using an issue template.'
  }
  
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody.replace(/  +/g, '')
  })
}
