import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  // Marketing Icons
  Share2, 
  TrendingUp, 
  Palette, 
  FileText, 
  Mail, 
  Target, 
  BarChart3,
  // Software Development Icons
  Globe, 
  Smartphone, 
  Code2, 
  Plug, 
  Layers, 
  Cloud, 
  Server,
  ArrowRight,
  WorkflowIcon
} from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [

  {
    id: 'development',
    name: 'Development Services',
    services: [
      {
        icon: Globe,
        title: 'Web Development',
        description: 'Build stunning, high-performance websites and web applications with custom solutions, WordPress, e-commerce platforms, and more.',
        link: '#web-dev'
      },
      {
        icon: Smartphone,
        title: 'Mobile App Development',
        description: 'Create powerful native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
        link: '#mobile-dev'
      },
      {
        icon: Code2,
        title: 'Custom Software Solutions',
        description: 'Solve complex business challenges with tailored software solutions designed specifically for your unique requirements.',
        link: '#custom-software'
      },
      {
        icon: WorkflowIcon,
        title: 'Workflow Automations',
        description: 'Solve complex business challenges with tailored workflow automation solutions designed specifically for your unique requirements.',
        link: '#workflow-automation'
      },
      {
        icon: Plug,
        title: 'API Integration',
        description: 'Seamlessly connect your systems and applications with robust API development and third-party integration services.',
        link: '#api-integration'
      },
      {
        icon: Layers,
        title: 'UX/UI Design',
        description: 'Craft intuitive, beautiful interfaces that delight users and drive engagement through research-driven design principles.',
        link: '#ux-ui'
      },
      {
        icon: Server,
        title: 'SaaS Product Development',
        description: 'Launch scalable software-as-a-service products with end-to-end development from concept to deployment and beyond.',
        link: '#saas'
      },
      {
        icon: Cloud,
        title: 'Cloud Services & DevOps',
        description: 'Optimize your infrastructure with cloud solutions, CI/CD pipelines, and DevOps practices for maximum efficiency and reliability.',
        link: '#cloud-devops'
      }
    ]
  },
    {
    id: 'marketing',
    name: 'Marketing Services',
    services: [
      {
        icon: Share2,
        title: 'Social Media Marketing',
        description: 'Amplify your brand presence across all social platforms with data-driven strategies that engage audiences and drive conversions.',
        link: '#social-media'
      },
      {
        icon: TrendingUp,
        title: 'SEO & SEM',
        description: 'Dominate search rankings and maximize ROI with comprehensive search engine optimization and strategic paid advertising campaigns.',
        link: '#seo-sem'
      },
      {
        icon: Palette,
        title: 'Branding & Logo Design',
        description: 'Create memorable brand identities that resonate with your audience through stunning visual design and strategic positioning.',
        link: '#branding'
      },
      {
        icon: FileText,
        title: 'Content Creation',
        description: 'Captivate your audience with compelling, high-quality content that tells your story and drives meaningful engagement.',
        link: '#content'
      },
      {
        icon: Mail,
        title: 'Email Marketing',
        description: 'Build lasting customer relationships with personalized email campaigns that convert subscribers into loyal customers.',
        link: '#email-marketing'
      },
      {
        icon: Target,
        title: 'PPC Campaigns',
        description: 'Maximize your advertising budget with targeted pay-per-click campaigns that deliver measurable results and high ROI.',
        link: '#ppc'
      },
      {
        icon: BarChart3,
        title: 'Marketing Strategy',
        description: 'Transform your business with comprehensive marketing strategies tailored to your goals, market, and competitive landscape.',
        link: '#strategy'
      }
    ]
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    } 
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('development');

  const currentCategory = serviceCategories.find(cat => cat.id === activeCategory);

  return (
    <section id="services" className="py-20 lg:py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Dual-Force{" "}
            <span className="text-primary relative">
              Solutions
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <motion.path
                  d="M0,4 Q25,0 50,4 T100,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </svg>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400"
          >
            Where digital marketing strategy meets powerful software engineering
          </motion.p>
        </div>

        {/* Category Tabs - Redesigned */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-white/10">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative px-8 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300
                  ${activeCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {currentCategory?.services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={item}
                className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 dark:border-white/10 overflow-hidden"
              >
                {/* Decorative gradient blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700 ease-out" />
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
                    <service.icon className="w-8 h-8" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}