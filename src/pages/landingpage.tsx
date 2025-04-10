import React, { useState, useEffect } from 'react';
 // Import the BlogPostCard component
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}



const BlogHomepage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  console.log(featuredPosts)
  const navigate = useNavigate()
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setFeaturedPosts([
        {
          id: 1,
          title: 'Getting Started with React',
          excerpt: 'Learn the basics of React and start building your first application.',
          author: 'Jane Doe',
          date: 'March 25, 2025',
          category: 'Development',
          image: '/api/placeholder/600/400'
        },
        {
          id: 2,
          title: 'The Future of Web Development',
          excerpt: 'Exploring upcoming trends and technologies in the web development world.',
          author: 'John Smith',
          date: 'March 22, 2025',
          category: 'Technology',
          image: '/api/placeholder/600/400'
        },
        {
          id: 3,
          title: 'Best Practices for Blog Writing',
          excerpt: 'Tips and tricks to create engaging content for your audience.',
          author: 'Emily Jones',
          date: 'March 20, 2025',
          category: 'Writing',
          image: '/api/placeholder/600/400'
        }
      ]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Features data
  const features: Feature[] = [
    {
      icon: "📝",
      title: "Easy Content Creation",
      description: "Intuitive editor with markdown support to help you create beautiful content effortlessly."
    },
    {
      icon: "🎨",
      title: "Customizable Design",
      description: "Make your blog unique with customizable themes and layouts that match your style."
    },

    {
      icon: "💬",
      title: "Community Engagement",
      description: "Foster discussions with an advanced commenting system and social media integration."
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Responsive design ensures your blog looks great on any device your readers use."
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold text-zinc-600 transform transition-transform duration-500 ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
              vacuum
            </div>
            
            
            <button onClick={() => navigate('/signin')}  className={`bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              Sign In
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Share Your Story With The World
            </h1>
            <p className={`text-xl text-gray-600 max-w-3xl mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create, publish, and grow with our modern blogging platform designed for today's writers and content creators.
            </p>
            
          </div>
        </div>
      </header>
      
      {/* Featured Posts */}
    
      
      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center">
      <div className={`md:w-1/2 mb-10 md:mb-0 md:pr-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About vacuum</h2>
        <p className="text-gray-600 mb-4">
          vacuum was founded in 2025 with a simple mission: to give writers and creators a powerful platform to share their ideas with the world.
        </p>
        <p className="text-gray-600 mb-4">
          Built by Sanjay Sahu using modern technologies including Vite, Cloudflare Workers, Hono, Prisma, and Tailwind CSS, our platform combines speed, reliability, and beautiful design.
        </p>
        <p className="text-gray-600 mb-6">
          We believe that everyone has a unique perspective and story worth telling. Our tech stack ensures a seamless experience for creating, publishing, and growing your audience.
        </p>
     
      </div>
      
      <div className={`md:w-1/2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHZhY3V1bXxlbnwwfHx8fDE2ODQ5NzE5NTg&ixlib=rb-4.0.3&q=80&w=1080" 
            alt="About " 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-gray-800 mb-12 text-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Why Choose vacuum
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:border-zinc-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    
          <div className={`border-t border-gray-800  p-8 text-sm text-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            © 2025 vacuum. All rights reserved.
          </div>
        </div>
    
  );
};

export default BlogHomepage;