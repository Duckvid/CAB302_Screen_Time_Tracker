function createContactEmail({ fullName, email, phoneNumber, subject, message } = {}) {
    const html = `
      <div>
        <h3>New message or question from the Entremap Contact Us page</h3>
        <p>From: ${fullName}</p>
        <h3>Contact Info:</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phoneNumber}</p>
        <br/>
        <h3>Subject: </h3>
        <p>${subject}</p>
        <h3>Message: </h3>
        <p>${message}</p>
      </div>
    `;
    return { html };
}

module.exports = { createContactEmail };