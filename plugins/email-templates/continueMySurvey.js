function createContinueMySurvey({ subject, link } = {}) {
  return {
    subject: subject || `Entremap - Your survey isn't finished yet!`,
    html: `
        <div>
        <h2 style="font-size: 21px; color: #19b394">
            Your survey isn't finished yet!
        </h2>
        <p style="font-size: 17px; color: rgb(144, 144, 144)">
        Our records show that you've left your survey unfinished...
            In order to be able to view your results and get the latest insight on your entrepreneurial mindset, you'll need to finish your survey. Click the button below to finish it off!
        </p>
        <a
        href="${link || process.env.SurveyLink}"
        target="_blank"
        style="color: #fff; text-decoration: none;border:none;outline:none;"
        >
        <button style="width: 200px;background: #19b394;color: #fff;font-size: 16px;height: 50px;outline: none;border: none;cursor: pointer;border-radius: 4px;">
           Continue my survey
        </button>
        </a>
        </div>
    `,
  };
}

module.exports = { createContinueMySurvey };
