// const nodemailer = require('nodemailer');

// // Configure the email transport using the default SMTP transport and a GMail account.
// // For other email services, you'll need to adjust the transport configuration.
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'your-email@gmail.com',
//         pass: 'your-email-password'
//     }
// });

// // Helper function to send email
// const sendEmail = (to, subject, body) => {
//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: to,
//         subject: subject,
//         html: body
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//     });
// };

// // Templates
// const templates = {
//     newArrivals: (userName, books) => `
//     <h1>Discover Our Latest Arrivals!</h1>
//     <p>Hello ${userName},</p>
//     <p>We are excited to inform you about the latest additions to our library collection! This week's new arrivals include a variety of genres and authors to suit all tastes. Don't miss out on these fresh reads:</p>
//     <ul>
//       ${books.map(book => <li><strong>${book.title}</strong> by ${book.author}</li>).join('')}
//     </ul>
//     <p>Visit our library or check out our online catalog to reserve your copy today!</p>
//     <p>Happy Reading,</p>
//     <p>[Library Name]</p>
//   `,

//     trendingBooks: (userName, books) => `
//     <h1>Check Out This Week's Trending Books!</h1>
//     <p>Hello ${userName},</p>
//     <p>Curious about what everyone is reading this week? Here are the top trending books that our members are enjoying:</p>
//     <ul>
//       ${books.map(book => <li><strong>${book.title}</strong> by ${book.author}</li>).join('')}
//     </ul>
//     <p>Make sure to get your hands on these popular titles before they fly off the shelves!</p>
//     <p>Best,</p>
//     <p>[Library Name]</p>
//   `,

//     successfulIssue: (userName, book, issueDate, dueDate) => `
//     <h1>Your Book Issue was Successful!</h1>
//     <p>Dear ${userName},</p>
//     <p>We are pleased to inform you that the book you requested has been successfully issued to your account. Here are the details:</p>
//     <ul>
//       <li><strong>Title:</strong> ${book.title}</li>
//       <li><strong>Author:</strong> ${book.author}</li>
//       <li><strong>Issue Date:</strong> ${issueDate}</li>
//       <li><strong>Due Date:</strong> ${dueDate}</li>
//     </ul>
//     <p>Enjoy your reading, and don't forget to return the book by the due date to avoid any late fees.</p>
//     <p>Happy Reading,</p>
//     <p>[Library Name]</p>
//   `,

//     successfulReturn: (userName, book, returnDate) => `
//     <h1>Thank You for Returning Your Book!</h1>
//     <p>Dear ${userName},</p>
//     <p>We have successfully received the book you returned. Here are the details of the transaction:</p>
//     <ul>
//       <li><strong>Title:</strong> ${book.title}</li>
//       <li><strong>Author:</strong> ${book.author}</li>
//       <li><strong>Return Date:</strong> ${returnDate}</li>
//     </ul>
//     <p>Thank you for using our library services. We hope you enjoyed the book. Feel free to browse our collection for more great reads!</p>
//     <p>Best Regards,</p>
//     <p>[Library Name]</p>
//   `,

//     overdueNotice: (userName, book, dueDate) => `
//     <h1>Reminder: Book Return Overdue</h1>
//     <p>Dear ${userName},</p>
//     <p>Our records indicate that the following book has not been returned by the due date:</p>
//     <ul>
//       <li><strong>Title:</strong> ${book.title}</li>
//       <li><strong>Author:</strong> ${book.author}</li>
//       <li><strong>Due Date:</strong> ${dueDate}</li>
//     </ul>
//     <p>Please return the book at your earliest convenience to avoid any additional late fees. If you have already returned the book, please disregard this message.</p>
//     <p>Thank you for your attention to this matter.</p>
//     <p>Sincerely,</p>
//     <p>[Library Name]</p>
//   `
// };

// // Example usage
// const userName = 'John Doe';
// const userEmail = 'user-email@example.com';

// // Send Weekly New Arrivals
// const newArrivalsBooks = [
//     { title: 'New Book 1', author: 'Author 1' },
//     { title: 'New Book 2', author: 'Author 2' }
// ];
// sendEmail(userEmail, 'Discover Our Latest Arrivals!', templates.newArrivals(userName, newArrivalsBooks));

// // Send Weekly Trending Books
// const trendingBooks = [
//     { title: 'Trending Book 1', author: 'Author 1' },
//     { title: 'Trending Book 2', author: 'Author 2' }
// ];
// sendEmail(userEmail, 'Check Out This Week\'s Trending Books!', templates.trendingBooks(userName, trendingBooks));

// // Send Successful Issue Notification
// const issuedBook = { title: 'Issued Book', author: 'Author' };
// sendEmail(userEmail, 'Your Book Issue was Successful!', templates.successfulIssue(userName, issuedBook, '2024-07-14', '2024-07-28'));

// // Send Successful Return Notification
// const returnedBook = { title: 'Returned Book', author: 'Author' };
// sendEmail(userEmail, 'Thank You for Returning Your Book!', templates.successfulReturn(userName, returnedBook, '2024-07-14'));

// // Send Overdue Notice
// const overdueBook = { title: 'Overdue Book', author: 'Author' };
// sendEmail(userEmail, 'Reminder: Book Return Overdue', templates.overdueNotice(userName, overdueBook, '2024-07-01'));