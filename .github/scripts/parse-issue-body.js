module.exports = ({context, core}) => {
    const issueBody = context.payload.issue.body;

    const parsedWhoToGreet = issueBody.match(/### Hello!\s+(?<whoToGreet>[^\s]+)\s/);
    const parsedMutliLine = issueBody.match(/### Large area for text\s+```csv(?<multiLine>[^`]+)```\s/);

    if (core) {
      if (parsedWhoToGreet) {
        core.setOutput('who-to-greet', parsedWhoToGreet.groups.whoToGreet);
      }
       if (parsedMutliLine) {
        core.setOutput('mutliline-values', parsedMutliLine.groups.multiLine.trim());
      }
    }
    let result = {
      whoToGreet: parsedWhoToGreet.groups.whoToGreet,
      mutliLineValues: parsedMutliLine.groups.multiLine
      
    };
    return result;
  }
