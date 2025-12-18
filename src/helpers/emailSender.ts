const emailSender = async (to: string, html: string, subject: string) => {
    console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`);
    // In a real implementation, you would use nodemailer here
    // console.log(html); 
};

export default emailSender;
