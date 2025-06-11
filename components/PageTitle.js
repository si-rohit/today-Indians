'use client';

import { usePathname, useRouter } from 'next/navigation';

const getTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard - The Today Indians';
    case '/dashboard/analytics':
      return 'Analytics - The Today Indians';
    case '/dashboard/messages':
      return 'Messages - The Today Indians';
    case '/dashboard/profile':
      return 'Profile - The Today Indians';
    case '/dashboard/videos':
      return 'Videos - The Today Indians';
    case '/dashboard/articles':
      return 'Articles - The Today Indians';
    case '/dashboard/articles/form':
      return 'Create Article - The Today Indians';
    case '/dashboard/stories':
      return 'Stories - The Today Indians';
    case '/dashboard/highlights':
      return 'Highlights - The Today Indians';
    case '/dashboard/pages':
      return 'Pages - The Today Indians';
    case '/dashboard/researcher':
      return 'Researchers - The Today Indians';
    case '/dashboard/fundraisers':
      return 'Fundraisers - The Today Indians';  
    case '/dashboard/copyright':
      return 'Copyright Articles - The Today Indians';
    case '/dashboard/advertising':
      return 'Advertising - The Today Indians';
    case '/dashboard/feedbacks':
      return 'Feedback - The Today Indians';
    case '/dashboard/drive':
      return 'Drive - The Today Indians';
    case '/dashboard/wallet':
      return 'Wallet - The Today Indians';
    case '/dashboard/partners':
      return 'Partners - The Today Indians';
    case '/dashboard/sponsors':
      return 'Sponsors - The Today Indians';
    case '/dashboard/payout':
      return 'Payout - The Today Indians';
    case '/dashboard/shop':
      return 'Shop - The Today Indians';
    case '/dashboard/library':
      return 'Library - The Today Indians'; 
    case '/dashboard/billing':
      return 'Billing - The Today Indians';
    case '/dashboard/settings':
      return 'Settings - The Today Indians';
    case '/dashboard/notification':
      return 'Notification - The Today Indians';
    case '/profile':
      return 'Profile - The Today Indians';
    case '/videos':
      return 'Videos - The Today Indians';
    case '/article':
      return 'Articles - The Today Indians';
    
    case '/copyright':
      return 'Copyright Articles - The Today Indians';
    case '/help':
      return 'Help Center - The Today Indians';
    case '/contact':
      return 'contact us - The Today Indians';
    case '/career':
      return 'career - The Today Indians';
    case '/auth':
      return 'Login - The Today Indians';
    case '/auth/register':
      return 'Register - The Today Indians';
    case '/auth/forgot-password':
      return 'Forgot Password - The Today Indians';

    default:
      return 'The Today Indians';
  }
};

const PageTitle = () => {
  const pathname = usePathname();
  const title = getTitle(pathname);
  if (typeof document !== 'undefined') {
    document.title = title;
  }
  return (
    <>
    </>
  );
};

export default PageTitle;
