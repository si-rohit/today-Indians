import { MessageSquareHeart,Wrench ,ShieldCheck,Megaphone,Headset ,Settings,CircleDollarSign,Newspaper  } from 'lucide-react';
const helpCategories = [
    {
      title: "Account & Login",
      description: "Manage your login, personal info, and security settings.",
      icon: <Settings />,
      faqs: [
        {
          question: "How do I reset my password?",
          answer: `To reset your password, go to the login page and click on "Forgot Password?" You’ll be prompted to enter your registered email address. Once submitted, you’ll receive a link to create a new password.  
          
          If you don’t receive the email within a few minutes, check your spam or junk folder. Make sure your email is entered correctly, and if you still have issues, contact our support team for further assistance.`
        },
        {
          question: "Can I change my email address?",
          answer: `Yes, you can update your email by visiting your account settings and clicking on the "Email" section. Enter your new email and confirm it with your password.  
          
          A verification link will be sent to the new address. Once confirmed, your email will be updated in our system.`
        },
        {
          question: "How do I delete my account?",
          answer: `To delete your account, go to the "Privacy & Security" section in your account settings and choose "Delete Account." This action is irreversible.  
          
          Deleting your account will remove all saved articles, subscriptions, and personal data associated with your profile.`
        },
        {
          question: "Why can't I log in to my account?",
          answer: `If you're having trouble logging in, ensure your email and password are entered correctly. Try resetting your password if you're unsure.  
          
          Additionally, check if your account has been deactivated due to inactivity or policy violations. If issues persist, contact our support.`
        },
        {
          question: "Can I link my account to Google or Facebook?",
          answer: `Yes, you can link your account to Google or Facebook for easier login. Go to your profile settings and select "Social Login Options."  
          
          Once linked, you can use those platforms to sign in quickly without needing to remember an additional password.`
        }
      ]
    },
    {
      title: "Subscription & Billing",
      description: "Plans, payment methods, and billing history.",
      icon: <CircleDollarSign  />,
      faqs: [
        {
          question: "How can I subscribe to a premium plan?",
          answer: `To subscribe, navigate to the "Subscriptions" tab in your account settings and choose the plan that suits you best.  
          
          You’ll need to enter your billing information and confirm the payment. Once completed, your access will be upgraded instantly.`
        },
        {
          question: "What payment methods are accepted?",
          answer: `We accept major credit/debit cards, PayPal, UPI, and some regional payment options.  
          
          All transactions are secured with industry-standard encryption to protect your information.`
        },
        {
          question: "Can I pause my subscription?",
          answer: `Yes, you can pause your subscription under "Billing Settings." This is useful if you’re taking a break but want to return later.  
          
          During the pause period, your account will revert to free access and resume automatically on the selected date unless canceled.`
        },
        {
          question: "Where can I view my billing history?",
          answer: `Your full billing history is available in the "Billing" section. Each transaction will include the date, plan name, and payment amount.  
          
          You can also download invoices for accounting purposes or future reference.`
        },
        {
          question: "How do I cancel my subscription?",
          answer: `Visit the "Subscriptions" section, click on "Manage," and select "Cancel Subscription." Your access will continue until the current billing cycle ends.  
          
          If you cancel mid-cycle, you won’t be charged again but will retain premium access until the end date.`
        }
      ]
    },
    {
      title: "Article & Content Access",
      description: "How to find, save, and read news articles.",
      icon:<Newspaper  />,
      faqs: [
        {
          question: "How can I save articles for later reading?",
          answer: `Click the bookmark icon next to any article title. This will save it to your "Saved Articles" section accessible from your dashboard.  
          
          You can organize saved content into custom folders and even read them offline using our mobile app.`
        },
        {
          question: "Can I access older news articles?",
          answer: `Yes, we maintain an archive of past articles. Use the search bar with filters like date range or category to find older content.  
          
          Some archived articles may only be available to premium users.`
        },
        {
          question: "Why are some articles locked?",
          answer: `Locked articles are premium content meant for subscribed users. These pieces often contain exclusive insights, reports, or expert commentary.  
          
          Subscribe to gain full access and support quality journalism.`
        },
        {
          question: "How do I change article font size or theme?",
          answer: `Click the "Aa" icon in the article view to access reader preferences. You can increase font size, switch to dark mode, or change font style.  
          
          These settings are saved across sessions, ensuring a consistent reading experience.`
        }
      ]
    },
    {
      title: "Notifications & Alerts",
      description: "Customize your alerts and notification settings.",
      icon: <Wrench />,
      faqs: [
        {
          question: "How do I enable breaking news alerts?",
          answer: `Go to "Notification Settings" in your profile and toggle on "Breaking News." You can customize it to specific topics or categories.  
          
          Push notifications will be sent to your mobile or desktop, depending on your selected devices.`
        },
        {
          question: "Can I stop email notifications?",
          answer: `Yes, you can unsubscribe from emails by going to "Email Preferences." You’ll see options for newsletters, alerts, and announcements.  
          
          You can also use the unsubscribe link in any email we send.`
        }
      ]
    },
    {
      title: "Contribute & Feedback",
      description: "Submit a story or share your feedback.",
      icon: <MessageSquareHeart/>,
      faqs: [
        {
          question: "How can I submit a news tip or story?",
          answer: `You can use the "Submit a Story" button found in the footer or in the "Contribute" section. Include the story details, sources, and your contact info.  
          
          Our editorial team will review your submission and contact you for verification if it aligns with our guidelines.`
        },
        {
          question: "Where can I send feedback or suggestions?",
          answer: `Use the "Feedback" form found in your account dropdown menu. You can rate your experience and submit ideas or report issues.  
          
          Your input helps us improve the platform. We review all feedback weekly.`
        }
      ]
    },
    {
      title: "Technical Support",
      description: "Fix errors, bugs, or access issues.",
      icon:<Wrench /> ,
      faqs: [
        {
          question: "Why is the website not loading properly?",
          answer: `This may be due to slow internet, browser issues, or server downtime. Try refreshing the page or switching browsers.  
          
          If the issue persists, clear your cache or contact our tech support with a screenshot of the problem.`
        },
        {
          question: "How do I report a bug or error?",
          answer: `Go to "Help" and select "Report a Bug." Provide a description of the issue, the page link, and steps to reproduce it.  
          
          Our team actively monitors bug reports and aims to fix critical issues within 24 hours.`
        }
      ]
    },
    {
      title: "Privacy & Security",
      description: "Learn about data privacy and account deletion.",
      icon: <ShieldCheck  />,
      faqs: [
        {
          question: "How is my data protected?",
          answer: `We use advanced encryption and industry-grade security protocols to keep your data safe.  
          
          We never sell your personal information and strictly comply with GDPR and other privacy laws.`
        },
        {
          question: "Can I permanently delete my account and data?",
          answer: `Yes. Head to the "Privacy Settings" page and choose "Request Account Deletion." This will begin a process to erase all your data.  
          
          You’ll receive a confirmation email. Once approved, your profile and associated data will be deleted within 7 days.`
        }
      ]
    },
    {
      title: "Advertising & Partnerships",
      description: "Advertise with us or request collaborations.",
      icon: <Megaphone  />,
      faqs: [
        {
          question: "How do I advertise on your platform?",
          answer: `You can visit the "Advertise With Us" section and fill out the form with your brand info, ad budget, and campaign goals.  
          
          Our team will review and get back to you with options based on your needs.`
        },
        {
          question: "Do you accept guest posts or sponsored content?",
          answer: `Yes, we accept well-written, relevant guest posts. Submit your proposal through the "Partnerships" section.  
          
          Our editorial team ensures all content meets our quality standards before publication.`
        }
      ]
    },
    {
      title: "Contact Us",
      description: "Reach out to our support team anytime.",
      icon: <Headset  />,
      faqs: [
        {
          question: "How can I reach customer support?",
          answer: `Click on the "Contact Us" tab in the footer or Help Center. You can reach us via live chat, email, or phone during working hours.  
          
          We strive to respond to all inquiries within 24–48 hours.`
        },
        {
          question: "Do you offer support in regional languages?",
          answer: `Yes, we offer support in several local languages. When contacting us, choose your preferred language from the dropdown menu.  
          
          This helps us assign the right team member to assist you better.`
        }
      ]
    },
  ];
export default helpCategories;