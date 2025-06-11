'use client'
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import helpCategories from '../../helpCategories';
import { FaChevronLeft } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
      const params = useParams();
      const { question, category } = params;
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
      const questionText = decodeUrlText(question);
      const categoryText = decodeUrlText(category);
  return (
    <div >
      <div className='flex justify-between border-b pb-2 border-gray-200'>
        <h1 className='text-3xl font-semibold '>{questionText}</h1>
        <button className='text-xl max-[426px]:hidden font-semibold flex items-center justify-center cursor-pointer' onClick={() => router.push(`/help/${category}`)}><FaChevronLeft /> Back</button>
      </div>
      
      <div className='py-5'>
        {helpCategories.find((category) => category.title === categoryText).faqs.map((question, index) =>
          <div key={index}>
            {question.question === questionText && <p>{question.answer}</p>}
            
          </div>
        )}
        <p>To reset your password, go to the login page and click on &quot;Forgot Password?&quot; You&apos;ll be prompted to enter your registered email address. Once submitted, you&apos;ll receive a link to create a new password.  
          <br/>
          If you don&apos;t receive the email within a few minutes, check your spam or junk folder. Make sure your email is entered correctly, and if you still have issues, contact our support team for further assistance.</p>
      </div>
    </div>
  )
}

export default Page
