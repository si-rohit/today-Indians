'use client'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation';
import React from 'react'
import helpCategories from '../helpCategories';

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const { category } = params;
    const decodeUrlText = (text) => {
            return text
                .replace(/%20/g, ' ')
                .replace(/%21/g, '!')
                .replace(/%22/g, '"')
                .replace(/%23/g, '#')
                .replace(/%24/g, '$')
                .replace(/%25/g, '%')
                .replace(/%26/g, '&')
                .replace(/%27/g, "'")
                .replace(/%28/g, '(')
                .replace(/%29/g, ')')
                .replace(/%2A/g, '*')
                .replace(/%2B/g, '+')
                .replace(/%2C/g, ',')
                .replace(/%2D/g, '-')
                .replace(/%2E/g, '.')
                .replace(/%2F/g, '/')
                .replace(/%3A/g, ':')
                .replace(/%3B/g, ';')
                .replace(/%3C/g, '<')
                .replace(/%3D/g, '=')
                .replace(/%3E/g, '>')
                .replace(/%3F/g, '?')
                .replace(/%40/g, '@')
                .replace(/%5B/g, '[')
                .replace(/%5C/g, '\\')
                .replace(/%5D/g, ']')
                .replace(/%5E/g, '^')
                .replace(/%5F/g, '_')
                .replace(/%60/g, '`')
                .replace(/%7B/g, '{')
                .replace(/%7C/g, '|')
                .replace(/%7D/g, '}')
                .replace(/%7E/g, '~');
    }
    const categoryText = decodeUrlText(category);
    
    const handleOpenCategory = (cat) => {
      console.log(cat);
        router.push(`/help/${categoryText}/${cat}`);
    }

    return (
    <div>
      <h1 className='text-3xl font-semibold border-b pb-2 border-gray-200'>{categoryText}</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {helpCategories.find(cat => cat.title === categoryText).faqs.map((faq, index) => (
          <div key={index} onClick={() => handleOpenCategory(faq.question)} className='flex items-center space-x-4 px-4 py-2 border-gray-200 hover:bg-gray-100 cursor-pointer'>
            <p className='text-xl font-medium'>{index+1}.</p>
            <h2 className='text-xl font-medium'>{faq.question}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page