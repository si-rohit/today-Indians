/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['static01.nyt.com','i.ytimg.com','thetodayindians.s3.ap-south-1.amazonaws.com','i.ibb.co','5341.general.pointer.8080-server.net','via.placeholder.com',"randomuser.me" ,'wp.alithemes.com','today-indians-ce255fzm6-svayam-workplaces-projects.vercel.app','encrypted-tbn0.gstatic.com','www.livemint.com','images.unsplash.com'],
      },
    env: {
        AWS_ACCESS_KEY_ID:'AKIA3FLDXC5SFFAJYMOI',
        AWS_SECRET_ACCESS_KEY:'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',
        AWS_REGION:'ap-south-1',
        AWS_BUCKET_NAME:'thetodayindians',
        MONGODB_URI:'mongodb+srv://rohitdhillon983:FvW8ClWxzeAIdC9e@cluster0.rcgna2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    }
};

export default nextConfig;
