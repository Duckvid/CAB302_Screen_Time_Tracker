function createTakeTheSurvey({ subject, link } = {}) {
  return {
    subject: subject || 'Entremap - Keep Your Results Updated!',
    html: `
      <div>
      <h2 style="font-size: 21px; color: #19b394">
          Keep Your Results Updated!
      </h2>
      <p style="font-size: 17px; color: rgb(144, 144, 144)">
          Curious to see how you've grown? Keeping your results up to date will
          give you a more accurate understanding and analysis of your mindset.
          Taking our survey periodically can help with that.
      </p>
      <a
      href="${link || process.env.SurveyLink}"
      target="_blank"
      style="color: #fff; text-decoration: none;border:none;outline:none;"
      >
      <button style="width: 200px;background: #19b394;color: #fff;font-size: 16px;height: 50px;outline: none;border: none;cursor: pointer;border-radius: 4px;">
          Take The Survey
      </button>
      </a>
      </div>
    `,
  };
}

module.exports = { createTakeTheSurvey };
